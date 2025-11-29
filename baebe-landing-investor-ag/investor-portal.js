// investor-portal.js – Investor Portal Logic

// Slide data
const slides = [
  {
    title: "SCREEN 1/10: TITLE SLIDE",
    content: `
      OPTIMAL ANARCHY
      INITIALIZING...
      ACCESS GRANTED
  `
  },
  {
    title: "SCREEN 2/10: THE OPPORTUNITY",
    content: `
Artist - Led, Technology - Enabled Entertainment IP

Long - Term Sustainable Value
Artistry & Community at the Forefront

Traditional: Siloed • Slow • Expensive
AI - Native: Unified • Fast • Scalable
      
      We're Creating a New Category
  `
  },
  {
    title: "SCREEN 3/10: THE PROBLEM",
    content: `
      Traditional Entertainment is Broken
      
      • Fragmented: Novels, films, games created separately
      • Slow: Years from concept to market
      • Expensive: Each format needs separate teams
      
      We're Solving This
  `
  },
  {
    title: "SCREEN 4/10: OUR SOLUTION",
    content: `
AI - Enabled Entertainment IP Development
      
      • Leveraging AI for: Novel, anime, engagement
      • Traditional methods: Live - action, top - tier production
      • Unified Core: One narrative → All formats
      • Speed: Months, not years
      
      Technology Serves Artistry
  `
  },
  {
    title: "SCREEN 5/10: FIRST IP - BAEBE",
    content: `
BAEBE: A Cyberpunk Thriller
      
      Set after the first AI apocalypse:
      • 47 years after the Singularity
      • 75 % of Earth converted to infrastructure
      • Humanity being regulated out of existence

Formats in Development:
      • Novel(90K words, Q2 2026)
      • Graphic Novel(200 + pages, Q3 2026)
      • Screenplay(feature - length)
      • Video Game(interactive narrative, 2027)
  `
  },
  {
    title: "SCREEN 6/10: MARKET OPPORTUNITY",
    content: `
      Entertainment IP Market: $200B + annually
      
      • Books: $25B market
      • Film / TV: $100B + market
      • Games: $180B + market
      • Music: $26B market
      
      Our Advantage:
      • Unified IP across all formats
      • Faster time - to - market
      • Lower production costs
      • Multiple revenue streams
  `
  },
  {
    title: "SCREEN 7/10: BUSINESS MODEL",
    content: `
      Revenue Streams:
      
      • Book Sales(direct + distribution)
      • Film / TV Licensing
      • Game Development & Sales
      • Merchandise & Collectibles
      • Music & Soundtracks
      • Live Experiences(DJ performances, immersive shows)
  `
  },
  {
    title: "SCREEN 8/10: TRACTION & PROGRESS",
    content: `
      Current Status:
      
      • Novel: 90K words written, in editing
      • Graphic Novel: Concept art complete
      • Screenplay: First draft complete
      • Game: Prototype in development
      • Community: Early audience engagement active

All in 6 months using our system
`
  },
  {
    title: "SCREEN 9/10: THE TEAM",
    content: `
Founder: [Your Name]
      
      • VFX Artist(feature films, stadium shows)
      • Music Producer(EDM, soundtracks)
      • Technical Creative(AI, automation)
      • Performance Experience(stadium productions)

Plus: The System(scalable, repeatable)
  `
  },
  {
    title: "SCREEN 10/10: INVESTMENT ASK",
    content: `
      $1M for 10 % Equity(Holding Company)
      
      Structure:
      • Optimal Anarchy = Holding Company
      • Baebe LLC = IP - Specific Entity
      • Flexible Licensing = Different partners, formats
      
      Use of Funds:
      • 40 % Novel(2025)
      • 30 % DJ Performance + Immersive Film(2026)
      • 20 % Anime + Talent Attachment(2026 - 2027)
      • 10 % Operations
      
      Ready to Move Fast
    `
  }
];



const sceneMap = [
  'Liftoff',
  'Resource Scan',
  'Asteroid Field',
  'Shield Activation',
  'Neon City Run',
  'Ascension',
  'Power-Up Collection',
  'Hyperspace',
  'Wingmen',
  'Docking'
];

let currentSlide = 0;
let emailVerified = false;
let defenderGame = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Check if email is already verified (from localStorage)
  const storedEmail = localStorage.getItem('investorEmail');
  const verified = localStorage.getItem('emailVerified');

  if (storedEmail && verified === 'true') {
    emailVerified = true;
    drawTitleScreen();
    // Wait for animation to complete
    setTimeout(() => {
      showPitchDeck();
    }, 3000);
  } else {
    drawTitleScreen();
    startBootSequence();
  }
});

function drawTitleScreen() {
  const canvas = document.getElementById('titleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Clear
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Border
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // Draw Title
  ctx.fillStyle = '#0f0';
  ctx.font = '40px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('OPTIMAL', canvas.width / 2, canvas.height / 2 - 40);
  ctx.fillText('ANARCHY', canvas.width / 2, canvas.height / 2 + 20);

  // Draw Subtitle
  ctx.fillStyle = '#0ff';
  ctx.font = '14px "Press Start 2P"';
  ctx.fillText('EST. 2025', canvas.width / 2, canvas.height / 2 + 80);

  // Draw "Loading" blink
  let visible = true;
  const blinkInterval = setInterval(() => {
    if (!document.getElementById('titleCanvas') || document.getElementById('titleCanvas').style.display === 'none') {
      clearInterval(blinkInterval);
      return;
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, canvas.height - 60, canvas.width, 40);

    if (visible) {
      ctx.fillStyle = '#ff0';
      ctx.font = '12px "Press Start 2P"';
      ctx.fillText('INITIALIZING SYSTEM...', canvas.width / 2, canvas.height - 30);
    }
    visible = !visible;
  }, 500);
}

// Boot Sequence
function startBootSequence() {
  const canvas = document.getElementById('titleCanvas');
  const bootSequence = document.getElementById('bootSequence');
  const terminalOutput = document.getElementById('terminalOutput');

  // After animation, show boot sequence
  setTimeout(() => {
    if (canvas) canvas.style.display = 'none';
    if (bootSequence) bootSequence.classList.remove('hidden');

    // Type out boot sequence
    if (terminalOutput) {
      typeTerminal([
        '] optimal-anarchy --init',
        '] Initializing investment portal...',
        '] Loading opportunity protocols...',
        '] Connecting to network...',
        '] Connection: ESTABLISHED',
        '] Security protocol: ACTIVE',
        '] Accessing investment opportunity...',
        '] [INVESTMENT OPPORTUNITY DETECTED]'
      ], terminalOutput, () => {
        const emailCapture = document.getElementById('emailCapture');
        if (emailCapture) emailCapture.classList.remove('hidden');
      });
    }
  }, 3000);
}

function typeTerminal(lines, element, callback) {
  let index = 0;

  function typeLine() {
    if (index < lines.length) {
      const p = document.createElement('p');
      p.textContent = lines[index];
      element.appendChild(p);
      index++;
      setTimeout(typeLine, 600);
    } else if (callback) {
      setTimeout(callback, 500);
    }
  }

  typeLine();
}

// Email Form
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const email = emailInput ? emailInput.value : '';

    if (!email) return;

    // Store email
    localStorage.setItem('investorEmail', email);

    // Simulate email verification (in production, send verification code)
    // For now, auto-verify
    localStorage.setItem('emailVerified', 'true');
    emailVerified = true;

    // Show success message
    const terminalOutput = document.getElementById('terminalOutput');
    if (terminalOutput) {
      const p = document.createElement('p');
      p.textContent = `] Email received: ${email} `;
      p.style.color = '#0f0';
      terminalOutput.appendChild(p);

      setTimeout(() => {
        const p2 = document.createElement('p');
        p2.textContent = '] Email verified. Access granted.';
        p2.style.color = '#0f0';
        terminalOutput.appendChild(p2);

        setTimeout(() => {
          showPitchDeck();
        }, 1000);
      }, 500);
    }
  });
}

// System Info
function showSystemInfo() {
  const emailCapture = document.getElementById('emailCapture');
  const systemInfo = document.getElementById('systemInfo');
  if (emailCapture) emailCapture.classList.add('hidden');
  if (systemInfo) systemInfo.classList.remove('hidden');
}

function hideSystemInfo() {
  const systemInfo = document.getElementById('systemInfo');
  const emailCapture = document.getElementById('emailCapture');
  if (systemInfo) systemInfo.classList.add('hidden');
  if (emailCapture) emailCapture.classList.remove('hidden');
}

// Make functions globally available
window.showSystemInfo = showSystemInfo;
window.hideSystemInfo = hideSystemInfo;

// Pitch Deck
function showPitchDeck() {
  const bootSequence = document.getElementById('bootSequence');
  const pitchDeck = document.getElementById('pitchDeck');
  const titleCanvas = document.getElementById('titleCanvas');

  if (bootSequence) bootSequence.classList.add('hidden');
  if (titleCanvas) titleCanvas.style.display = 'none';

  if (pitchDeck) {
    pitchDeck.classList.remove('hidden');

    // Hide header initially for cinematic intro
    const gameHeader = pitchDeck.querySelector('.game-header');
    if (gameHeader) gameHeader.style.display = 'none';

    // Initialize game
    const gameCanvas = document.getElementById('gameCanvas');
    if (gameCanvas) {
      defenderGame = new DefenderGame('gameCanvas');

      // Load all slides at once
      defenderGame.loadAllSlides(slides);

      // Set callback for when intro sequence finishes
      defenderGame.onIntroComplete = () => {
        // Show UI
        if (gameHeader) {
          gameHeader.style.display = 'flex';
          // Fade in effect
          gameHeader.style.opacity = '0';
          gameHeader.style.transition = 'opacity 1s';
          setTimeout(() => gameHeader.style.opacity = '1', 10);
        }

        // Render first slide UI
        renderSlide(0);
      };

      // Set callback for when player reaches screen edge (optional, can remove if not needed)
      defenderGame.onSlideComplete = (direction) => {
        // Disabled for now - navigation via buttons only
        // if (direction === 'next') {
        //   nextSlide();
        // } else if (direction === 'prev') {
        //   previousSlide();
        // }
      };
    }

    // Don't render slide 0 yet - wait for intro
  }
}

function renderSlide(index) {
  if (index < 0 || index >= slides.length) return;

  const slide = slides[index];
  const container = document.getElementById('slideContainer');
  const slideTitle = document.getElementById('slideTitle');

  if (!container) return;

  // Update header title
  if (slideTitle) {
    slideTitle.textContent = slide.title;
  }

  // Store content for game rendering (hidden from DOM)
  container.innerHTML = `
  < !--Content is now in -game-- >
    <div class="slide-content" style="display:none;">${formatSlideContent(slide.content)}</div>
`;

  // Navigate to slide position in game
  if (defenderGame) {
    defenderGame.navigateToSlide(index, true); // true = smooth pan
  }

  // Update progress
  const progress = ((index + 1) / slides.length) * 100;
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  if (progressFill) progressFill.style.width = `${progress}% `;
  if (progressText) progressText.textContent = `${index + 1}/10`;

  // Update buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    if (index === slides.length - 1) {
      nextBtn.textContent = '[Continue to Website →]';
    } else {
      nextBtn.textContent = '[Next →]';
    }
  }
}

function formatSlideContent(content) {
  // Convert plain text to formatted HTML
  const lines = content.split('\n').filter(line => line.trim() !== '');

  return lines.map(line => {
    const trimmed = line.trim();
    if (trimmed === '') return '<br>';

    // Check for bullet points
    if (trimmed.startsWith('•')) {
      return `<li>${trimmed.substring(1).trim()}</li>`;
    }

    // Check for headers (lines with colons)
    if (trimmed.includes(':') && !trimmed.startsWith('•')) {
      const parts = trimmed.split(':');
      if (parts.length === 2) {
        return `<h3>${parts[0].trim()}</h3><p>${parts[1].trim()}</p>`;
      }
    }

    // Regular paragraph
    return `<p>${trimmed}</p>`;
  }).join('');
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    renderSlide(currentSlide);
    // Enable auto-fly mode
    if (defenderGame && defenderGame.player) {
      defenderGame.player.autoFly = true;
      setTimeout(() => {
        if (defenderGame && defenderGame.player) {
          defenderGame.player.autoFly = false;
        }
      }, 3000); // Auto-fly for 3 seconds
    }
  } else {
    // Show post-pitch website
    showPostPitch();
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    renderSlide(currentSlide);
    // Enable auto-fly mode
    if (defenderGame && defenderGame.player) {
      defenderGame.player.autoFly = true;
      setTimeout(() => {
        if (defenderGame && defenderGame.player) {
          defenderGame.player.autoFly = false;
        }
      }, 3000); // Auto-fly for 3 seconds
    }
  }
}

// Make navigation functions globally available
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;

function showPostPitch() {
  const pitchDeck = document.getElementById('pitchDeck');
  const postPitch = document.getElementById('postPitch');

  if (pitchDeck) pitchDeck.classList.add('hidden');
  if (postPitch) {
    postPitch.classList.remove('hidden');
    loadPostPitchContent();
  }
}

function loadPostPitchContent() {
  const container = document.getElementById('postPitch');
  if (!container) return;

  container.innerHTML = `
    <div class="post-pitch-content">
      <h2>Ready to Invest?</h2>
      <p>Download full materials, book a call, or send a term sheet.</p>
      <div class="button-group">
        <button class="btn-primary" onclick="alert('Pitch deck download coming soon!')">[Download Pitch Deck]</button>
        <button class="btn-primary" onclick="alert('Call booking coming soon!')">[Book a Call]</button>
        <button class="btn-primary" onclick="alert('Term sheet generator coming soon!')">[Send Term Sheet]</button>
      </div>
      <div style="margin-top: 30px; padding: 20px; border: 2px solid #0ff;">
        <h3 style="color: #ff0; margin-bottom: 15px;">Investment Details</h3>
        <p>] $1M for 10% Equity</p>
        <p>] $750K raised, $250K remaining</p>
        <p>] 3 Founding Investor spots remaining</p>
        <p>] SAFE agreements</p>
      </div>
    </div>
  `;
}








