// Access Tier Definitions
export interface AccessTier {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  accessLevel: number
  color: string
}

export const accessTiers: AccessTier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: 99,
    description: 'Basic access to pitch documentation and company overview',
    features: [
      'Full pitch document access',
      'Company overview and business model',
      'Market opportunity analysis',
      'Basic investment information',
    ],
    accessLevel: 1,
    color: 'hacker-green',
  },
  {
    id: 'insider',
    name: 'Insider',
    price: 499,
    description: 'Deep dive into technology, IP development, and execution details',
    features: [
      'Everything in Explorer tier',
      'Detailed technology stack documentation',
      'IP development pipeline details',
      'First IP preview (novel chapters)',
      'Execution timeline and roadmap',
      'Competitive analysis',
    ],
    accessLevel: 2,
    color: 'blue',
  },
  {
    id: 'partner',
    name: 'Partner',
    price: 1999,
    description: 'Full access including financials, IP review, and direct founder access',
    features: [
      'Everything in Insider tier',
      'Financial projections and unit economics',
      'Full first IP review (complete novel access)',
      'Term sheet templates',
      'Direct email access to founders',
      'Priority call scheduling',
      'Early adopter investor benefits',
    ],
    accessLevel: 3,
    color: 'purple',
  },
  {
    id: 'strategic',
    name: 'Strategic',
    price: 9999,
    description: 'Maximum access with co-development opportunities and advisory roles',
    features: [
      'Everything in Partner tier',
      'Co-development opportunities',
      'Advisory role consideration',
      'Platform beta access',
      'Custom partnership proposals',
      'Board observer opportunities',
      'Exclusive investor events',
    ],
    accessLevel: 4,
    color: 'gold',
  },
]

export function generateAccessCode(tierId: string): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${tierId.toUpperCase()}-${timestamp}-${random}`.toUpperCase()
}

export function validateAccessCode(code: string): { valid: boolean; tier?: AccessTier } {
  const parts = code.split('-')
  if (parts.length < 3) return { valid: false }
  
  const tierId = parts[0].toLowerCase()
  const tier = accessTiers.find(t => t.id === tierId)
  
  if (!tier) return { valid: false }
  
  // In production, validate against database
  return { valid: true, tier }
}









