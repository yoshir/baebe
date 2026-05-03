import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { marked } from 'marked';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import 'dotenv/config';
import bookConfig from './book.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NOVEL_ROOT = join(__dirname, '..');

const PORT = Number(process.env.PORT) || 3000;
const PASSWORD = process.env.READER_PASSWORD;
const SESSION_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(48).toString('hex');
const READER_LABEL = process.env.READER_LABEL || '';
const IS_PROD = process.env.NODE_ENV === 'production';

if (!PASSWORD) {
  console.error('FATAL: READER_PASSWORD env var is required.');
  process.exit(1);
}
if (IS_PROD && !process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET env var is required in production.');
  process.exit(1);
}

// ---------- Pre-render chapters at startup ----------
marked.setOptions({ mangle: false, headerIds: false });

const chapters = new Map();
const manifest = { ...bookConfig, parts: [] };

for (const part of bookConfig.parts) {
  const partOut = { title: part.title, chapters: [] };
  for (const ch of part.chapters) {
    const filePath = join(NOVEL_ROOT, ch.file);
    let html;
    try {
      const md = readFileSync(filePath, 'utf-8');
      html = marked.parse(md);
    } catch (err) {
      console.warn(`Skipping ${ch.file}: ${err.message}`);
      continue;
    }
    chapters.set(ch.slug, {
      slug: ch.slug,
      title: ch.title,
      partTitle: part.title,
      html,
    });
    partOut.chapters.push({ slug: ch.slug, title: ch.title });
  }
  if (partOut.chapters.length) manifest.parts.push(partOut);
}
console.log(`Loaded ${chapters.size} chapters across ${manifest.parts.length} parts.`);

// ---------- Express setup ----------
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '4kb' }));
app.use(express.json({ limit: '4kb' }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'data:'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
    crossOriginEmbedderPolicy: false,
    strictTransportSecurity: IS_PROD
      ? { maxAge: 63072000, includeSubDomains: true, preload: true }
      : false,
  })
);

app.use((req, res, next) => {
  res.set('X-Frame-Options', 'DENY');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Permissions-Policy', 'clipboard-write=(), clipboard-read=()');
  next();
});

app.use(
  session({
    name: 'baebe.sid',
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: IS_PROD,
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
    },
  })
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120, // ~2/s sustained — generous for normal reading, blocks scrapers
  standardHeaders: true,
  legacyHeaders: false,
});

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function requireAuth(req, res, next) {
  if (req.session?.authed) return next();
  return res.redirect('/login');
}

function requireAuthJson(req, res, next) {
  if (req.session?.authed) return next();
  return res.status(401).json({ error: 'unauthorized' });
}

// ---------- Public static (CSS/JS for the login + reader shell) ----------
app.use(
  '/static',
  express.static(join(__dirname, 'public'), {
    etag: true,
    lastModified: true,
    maxAge: 0,
    setHeaders: (res) => res.set('X-Content-Type-Options', 'nosniff'),
  })
);

// ---------- Routes ----------
app.get('/login', (req, res) => {
  if (req.session?.authed) return res.redirect('/');
  res.set('Cache-Control', 'no-store');
  res.sendFile(join(__dirname, 'public', 'login.html'));
});

app.post('/login', loginLimiter, (req, res) => {
  const { password } = req.body || {};
  if (typeof password === 'string' && safeEqual(password, PASSWORD)) {
    req.session.regenerate((err) => {
      if (err) return res.redirect('/login?error=server');
      req.session.authed = true;
      req.session.sid = crypto.randomBytes(6).toString('hex');
      req.session.openedAt = Date.now();
      res.redirect('/');
    });
    return;
  }
  res.redirect('/login?error=1');
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('baebe.sid');
    res.redirect('/login');
  });
});

app.get('/', requireAuth, (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/manifest.webmanifest', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.sendFile(join(__dirname, 'public', 'manifest.webmanifest'));
});

app.use('/api', apiLimiter, requireAuthJson, (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('/api/manifest', (req, res) => {
  res.json({
    title: manifest.title,
    author: manifest.author,
    copyright: manifest.copyright,
    sid: req.session.sid,
    label: READER_LABEL,
    parts: manifest.parts,
  });
});

app.get('/api/chapter/:slug', (req, res) => {
  const ch = chapters.get(req.params.slug);
  if (!ch) return res.status(404).json({ error: 'not found' });
  const watermark = `${req.session.sid}·${Date.now().toString(36)}`;
  res.json({
    slug: ch.slug,
    title: ch.title,
    partTitle: ch.partTitle,
    html: ch.html,
    watermark,
  });
});

app.use((req, res) => {
  if (req.accepts('html')) return res.redirect('/');
  res.status(404).json({ error: 'not found' });
});

app.listen(PORT, () => {
  console.log(`BAEBE viewer listening on http://localhost:${PORT}`);
});
