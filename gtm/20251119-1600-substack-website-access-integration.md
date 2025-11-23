# BAEBE: Substack → Website Access Integration Guide

**Version:** v.20251119-1600  
**Last Updated:** 2025-11-19  
**Purpose:** Practical solutions for connecting Substack subscriptions to website chapter access

---

## THE PROBLEM

**User subscribes on Substack → How do they access chapters on your website?**

You need a way to:
1. Verify if someone is a Substack subscriber
2. Grant them appropriate access level on your website
3. Keep it simple for solo creator (minimal dev work)
4. Make it seamless for users (no friction)

---

## SOLUTION OPTIONS (Ranked by Ease)

### ✅ OPTION 1: Email Verification (EASIEST - Start Here)

**How It Works:**
- User enters email on website
- Website checks Substack API to verify subscription status
- If subscribed → Grant access automatically
- If not → Show upgrade prompt

**Pros:**
- ✅ No manual codes needed
- ✅ Automatic verification
- ✅ Works immediately
- ✅ User-friendly (just enter email)

**Cons:**
- ⚠️ Requires Substack API key
- ⚠️ Requires basic API endpoint (can use serverless function)

**Implementation:**

#### Step 1: Get Substack API Key
1. Go to Substack → Settings → API
2. Generate API key
3. Store securely (environment variable)

#### Step 2: Create Verification Endpoint

**Option A: Serverless Function (Vercel/Netlify)**

```typescript
// api/verify-substack.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email required' })
  }

  try {
    // Substack API endpoint
    const substackUrl = `https://api.substack.com/v1/publications/${process.env.SUBSTACK_PUBLICATION_ID}/subscribers`
    
    const response = await fetch(substackUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.SUBSTACK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    
    // Check if email is in subscribers list
    const subscriber = data.subscribers?.find(
      (sub: any) => sub.email.toLowerCase() === email.toLowerCase()
    )

    if (subscriber) {
      // Determine access level based on subscription tier
      let accessLevel = 1 // Free tier
      
      if (subscriber.subscription_status === 'active') {
        accessLevel = 2 // Paid subscriber
      }
      
      if (subscriber.tier === 'founding_member') {
        accessLevel = 3 // Founding member
      }

      return res.status(200).json({
        verified: true,
        accessLevel,
        tier: subscriber.tier || 'free',
        subscriptionStatus: subscriber.subscription_status,
      })
    }

    return res.status(200).json({
      verified: false,
      message: 'Email not found in subscribers',
    })
  } catch (error) {
    console.error('Substack verification error:', error)
    return res.status(500).json({ error: 'Verification failed' })
  }
}
```

**Option B: Client-Side Check (Simpler, Less Secure)**

```typescript
// lib/substackVerification.ts
export async function verifySubstackEmail(email: string) {
  try {
    const response = await fetch('/api/verify-substack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Verification error:', error)
    return { verified: false, error: 'Verification failed' }
  }
}
```

#### Step 3: Update Website Access Check

```typescript
// app/chapters/[chapter]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { verifySubstackEmail } from '@/lib/substackVerification'

export default function ChapterPage({ params }: { params: { chapter: string } }) {
  const [accessGranted, setAccessGranted] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Get email from localStorage or prompt
    const email = localStorage.getItem('userEmail')
    
    if (!email) {
      // Prompt for email
      const userEmail = prompt('Enter your Substack email to access chapters:')
      if (userEmail) {
        localStorage.setItem('userEmail', userEmail)
        checkAccess(userEmail)
      } else {
        setChecking(false)
      }
    } else {
      checkAccess(email)
    }
  }, [])

  async function checkAccess(email: string) {
    const result = await verifySubstackEmail(email)
    
    if (result.verified) {
      // Store access level
      localStorage.setItem('accessLevel', result.accessLevel.toString())
      localStorage.setItem('subscriptionTier', result.tier)
      setAccessGranted(true)
    } else {
      // Show upgrade prompt
      setAccessGranted(false)
    }
    setChecking(false)
  }

  if (checking) {
    return <div>Verifying access...</div>
  }

  if (!accessGranted) {
    return (
      <div>
        <h2>Access Required</h2>
        <p>Subscribe to BAEBE on Substack to read this chapter.</p>
        <a href="https://[yourname].substack.com/subscribe" target="_blank">
          Subscribe Now
        </a>
      </div>
    )
  }

  return (
    <div>
      {/* Chapter content */}
    </div>
  )
}
```

**Time to Implement:** 2-3 hours  
**Maintenance:** Minimal (just keep API key updated)

---

### ✅ OPTION 2: Access Codes (MANUAL BUT WORKS IMMEDIATELY)

**How It Works:**
- When someone subscribes on Substack, you manually send them an access code
- They enter code on website → Get access
- You can automate code generation with Zapier/Make.com

**Pros:**
- ✅ Works immediately (no API setup needed)
- ✅ Simple for users (just enter code)
- ✅ Can automate with Zapier/Make.com
- ✅ No technical setup required

**Cons:**
- ⚠️ Requires manual step (or automation setup)
- ⚠️ Codes can be shared (less secure)
- ⚠️ Need to track codes

**Implementation:**

#### Step 1: Generate Codes for Subscribers

**Manual Method:**
1. When someone subscribes, generate code: `SUB-[random]`
2. Email them the code via Substack welcome email
3. They enter code on website

**Automated Method (Zapier/Make.com):**
1. Trigger: New Substack subscriber
2. Action: Generate unique code
3. Action: Send email with code
4. Action: Store code in database/spreadsheet

#### Step 2: Update Access Code System

```typescript
// lib/accessTiers.ts (update existing)
export interface SubstackAccessCode {
  code: string
  email: string
  tier: 'free' | 'paid' | 'founding'
  accessLevel: number
  createdAt: Date
  expiresAt?: Date
}

// Add to existing validateAccessCode function
export function validateSubstackCode(code: string): { 
  valid: boolean
  tier?: AccessTier
  email?: string
} {
  // Check against database/spreadsheet
  // For now, simple pattern match
  if (code.startsWith('SUB-')) {
    // In production: Check database
    // For demo: Return valid
    return {
      valid: true,
      tier: accessTiers.find(t => t.id === 'insider'), // Adjust based on subscription
      email: undefined, // Get from database
    }
  }
  
  return { valid: false }
}
```

#### Step 3: Create Code Entry Page

```typescript
// app/enter-substack-code/page.tsx
'use client'

import { useState } from 'react'
import { validateSubstackCode } from '@/lib/accessTiers'

export default function EnterSubstackCodePage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [validating, setValidating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setValidating(true)

    const result = validateSubstackCode(code.trim())

    setTimeout(() => {
      if (result.valid && result.tier) {
        localStorage.setItem('substackCode', code.trim())
        localStorage.setItem('accessTier', result.tier.id)
        localStorage.setItem('accessLevel', result.tier.accessLevel.toString())
        window.location.href = '/chapters'
      } else {
        setError('Invalid code. Check your Substack welcome email.')
        setValidating(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1>Enter Substack Access Code</h1>
        <p>Check your Substack welcome email for your access code.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="SUB-XXXX-XXXX"
            className="w-full p-3 border border-hacker-green bg-black text-hacker-green"
          />
          <button type="submit" disabled={validating}>
            {validating ? 'Verifying...' : 'Verify Code'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="mt-4 text-sm">
          Don't have a code? <a href="https://[yourname].substack.com/subscribe">Subscribe on Substack</a>
        </p>
      </div>
    </div>
  )
}
```

**Time to Implement:** 1 hour (manual) or 2-3 hours (automated)  
**Maintenance:** Low (just send codes) or None (if automated)

---

### ✅ OPTION 3: Zapier/Make.com Integration (NO-CODE AUTOMATION)

**How It Works:**
- Zapier/Make.com watches for new Substack subscribers
- Automatically generates access code
- Sends code via email
- Stores code in database/spreadsheet
- Website checks database for valid codes

**Pros:**
- ✅ No coding required
- ✅ Fully automated
- ✅ Works with existing systems
- ✅ Can integrate with multiple platforms

**Cons:**
- ⚠️ Requires Zapier/Make.com subscription ($20-50/month)
- ⚠️ Need to set up workflows
- ⚠️ Still need code entry on website

**Implementation:**

#### Zapier Workflow:

**Trigger:** New Substack Subscriber
1. **Action:** Generate Unique Code
   - Use Zapier Formatter → Random String
   - Format: `SUB-{random8chars}`

2. **Action:** Store in Google Sheets/Airtable
   - Email
   - Code
   - Subscription Tier
   - Date Created
   - Access Level

3. **Action:** Send Email (via Substack or Gmail)
   - Subject: "Your BAEBE Website Access Code"
   - Body: "Your access code: SUB-XXXX-XXXX\nEnter at: baebe.com/enter-code"

#### Make.com Workflow (Similar):

**Trigger:** Webhook from Substack (or check API)
1. **Action:** Generate Code
2. **Action:** Add to Database
3. **Action:** Send Email

#### Website Integration:

```typescript
// api/verify-code.ts
import { GoogleSheets } from '@/lib/googleSheets' // Or Airtable

export default async function handler(req, res) {
  const { code } = req.body
  
  // Check Google Sheets/Airtable for code
  const subscriber = await GoogleSheets.findByCode(code)
  
  if (subscriber) {
    return res.json({
      valid: true,
      accessLevel: subscriber.accessLevel,
      tier: subscriber.tier,
    })
  }
  
  return res.json({ valid: false })
}
```

**Time to Implement:** 2-3 hours (setup workflows)  
**Maintenance:** Minimal (monitor workflows)

---

### ✅ OPTION 4: Substack Webhooks (MOST AUTOMATED)

**How It Works:**
- Substack sends webhook when someone subscribes
- Your server receives webhook
- Automatically creates account/grants access
- User gets seamless experience

**Pros:**
- ✅ Fully automated
- ✅ No codes needed
- ✅ Best user experience
- ✅ Real-time updates

**Cons:**
- ⚠️ Requires server setup
- ⚠️ More complex implementation
- ⚠️ Need to handle webhook security

**Implementation:**

#### Step 1: Set Up Webhook Endpoint

```typescript
// api/webhooks/substack.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify webhook signature (Substack provides this)
  const signature = req.headers['x-substack-signature']
  const payload = JSON.stringify(req.body)
  
  // Verify signature (Substack webhook security)
  const expectedSignature = crypto
    .createHmac('sha256', process.env.SUBSTACK_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex')

  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const event = req.body

  // Handle different event types
  switch (event.type) {
    case 'subscription.created':
      await handleNewSubscription(event.data)
      break
    case 'subscription.updated':
      await handleSubscriptionUpdate(event.data)
      break
    case 'subscription.cancelled':
      await handleSubscriptionCancellation(event.data)
      break
  }

  res.status(200).json({ received: true })
}

async function handleNewSubscription(data: any) {
  const { email, tier, subscription_status } = data

  // Determine access level
  let accessLevel = 1
  if (subscription_status === 'active') {
    accessLevel = tier === 'founding_member' ? 3 : 2
  }

  // Create user account or update access
  // Store in database:
  // - email
  // - accessLevel
  // - tier
  // - subscriptionId
  // - createdAt

  // Optional: Send welcome email with website link
}

async function handleSubscriptionUpdate(data: any) {
  // Update access level if tier changed
}

async function handleSubscriptionCancellation(data: any) {
  // Revoke access or downgrade to free
}
```

#### Step 2: Configure Substack Webhook

1. Go to Substack → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/substack`
3. Select events: `subscription.created`, `subscription.updated`, `subscription.cancelled`
4. Save webhook secret

#### Step 3: Update Website Access Check

```typescript
// lib/checkAccess.ts
export async function checkSubstackAccess(email: string) {
  // Check database for user
  const user = await db.users.findByEmail(email)
  
  if (user && user.subscriptionStatus === 'active') {
    return {
      hasAccess: true,
      accessLevel: user.accessLevel,
      tier: user.tier,
    }
  }
  
  return { hasAccess: false }
}
```

**Time to Implement:** 4-6 hours  
**Maintenance:** Low (monitor webhooks)

---

## RECOMMENDED APPROACH: HYBRID

**Start Simple, Scale Up:**

### Phase 1: Access Codes (Week 1)
- ✅ Implement code system (1 hour)
- ✅ Manually send codes to new subscribers
- ✅ Get feedback from users

### Phase 2: Email Verification (Week 2-3)
- ✅ Add Substack API verification
- ✅ Keep codes as backup
- ✅ Users can use either method

### Phase 3: Automation (Month 2)
- ✅ Set up Zapier/Make.com
- ✅ Automate code generation
- ✅ Or implement webhooks

---

## QUICK START: 30-MINUTE SOLUTION

**For immediate implementation:**

1. **Create simple code generator:**
```typescript
// lib/generateCode.ts
export function generateSubstackCode(): string {
  const random = Math.random().toString(36).substring(2, 10).toUpperCase()
  return `SUB-${random}`
}
```

2. **Add to Substack welcome email:**
```
Welcome to BAEBE!

Your website access code: SUB-XXXX-XXXX
Enter at: baebe.com/enter-code
```

3. **Update existing `/enter-code` page:**
- Add check for codes starting with "SUB-"
- Grant appropriate access level

4. **Done!** Users can now access website with codes.

---

## SECURITY CONSIDERATIONS

1. **Rate Limiting:** Limit verification attempts
2. **Code Expiration:** Set expiry dates (30-90 days)
3. **One-Time Use:** Invalidate codes after first use (optional)
4. **Email Verification:** Require email match for codes
5. **HTTPS Only:** Always use secure connections

---

## MONITORING & MAINTENANCE

**Weekly:**
- Check for failed verifications
- Monitor code usage
- Review subscriber growth

**Monthly:**
- Audit access logs
- Update API keys if needed
- Review security settings

---

## COST BREAKDOWN

| Solution | Setup Time | Monthly Cost | Maintenance |
|----------|------------|--------------|-------------|
| Email Verification | 2-3 hours | $0 (if using free tier) | Low |
| Access Codes (Manual) | 1 hour | $0 | Medium (send codes) |
| Access Codes (Automated) | 2-3 hours | $20-50 (Zapier/Make) | Low |
| Webhooks | 4-6 hours | $0 (server costs) | Low |

---

## NEXT STEPS

1. **Choose your approach** (recommend starting with codes)
2. **Implement basic version** (30 minutes - 2 hours)
3. **Test with real subscribers**
4. **Iterate based on feedback**
5. **Scale up to automation** (when you have time)

---

**Questions?** Start with Option 2 (Access Codes) - it's the fastest path to working solution.


