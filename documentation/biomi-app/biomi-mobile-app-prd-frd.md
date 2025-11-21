# BIOMI MOBILE APP: PRODUCT REQUIREMENTS DOCUMENT (PRD) & FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)

**Version:** v.20251117-1500  
**Date:** November 17, 2025  
**Document Type:** Product Requirements & Functional Requirements  
**Product:** Biomi Mobile Application (iOS & Android)

---

## DOCUMENT OVERVIEW

This document combines the Product Requirements Document (PRD) and Functional Requirements Document (FRD) for the Biomi mobile application. The PRD defines what the product should do and why, while the FRD specifies how the product will function technically.

---

# PART I: PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. PRODUCT VISION & OBJECTIVES

### 1.1 Vision Statement
**Biomi mobile app delivers personalized, science-based frequency medicine therapy through smartphones, making advanced wellness accessible to everyone, anytime, anywhere.**

### 1.2 Product Objectives
1. **Accessibility**: Make frequency medicine available to mass market ($9.99/month)
2. **Personalization**: AI-driven frequency optimization based on real-time biometrics
3. **Scientific Rigor**: Based on 50+ years of peer-reviewed research
4. **Multi-Modal Integration**: Combine PEMF, photobiomodulation, binaural beats, and heart coherence
5. **Daily Integration**: Fit seamlessly into users' daily routines

### 1.3 Success Metrics
- **User Acquisition**: 500,000 subscribers by Year 3
- **Retention**: 80%+ monthly active users
- **Engagement**: Average 4+ sessions per week per user
- **Satisfaction**: 4.5+ star rating, 90%+ would recommend
- **Health Outcomes**: Measurable improvements in HRV, stress reduction, sleep quality

---

## 2. TARGET USERS & USE CASES

### 2.1 Primary User Personas

**Persona 1: The Biohacker**
- Age: 25-45
- Tech-savvy, health optimization focused
- Uses multiple wellness apps and devices
- Values scientific validation
- **Goals**: Performance optimization, recovery, longevity

**Persona 2: The Stress Manager**
- Age: 30-55
- High-stress lifestyle (work, family)
- Seeks accessible stress relief
- Values convenience and simplicity
- **Goals**: Stress reduction, better sleep, emotional balance

**Persona 3: The Chronic Condition Manager**
- Age: 35-65
- Manages chronic pain, anxiety, or sleep issues
- Tried various solutions with limited success
- Values non-invasive, drug-free approaches
- **Goals**: Pain relief, symptom management, quality of life improvement

**Persona 4: The Wellness Enthusiast**
- Age: 25-50
- Actively practices meditation, yoga, wellness
- Values holistic approaches
- Seeks to deepen existing practices
- **Goals**: Enhanced meditation, spiritual growth, mind-body connection

### 2.2 Key Use Cases

**Use Case 1: Morning Energy Boost**
- User wakes up feeling tired
- Opens app, selects "Energy & Focus" session
- 15-minute session with Beta/Gamma entrainment
- Feels energized and focused for the day

**Use Case 2: Midday Stress Relief**
- User feels stressed during workday
- Quick 10-minute "Stress Relief" session
- Heart coherence training + Alpha/Theta frequencies
- Returns to work feeling calm and centered

**Use Case 3: Evening Recovery**
- User finishes workout or long day
- 30-minute "Recovery" session
- PEMF + photobiomodulation + Delta frequencies
- Body recovers faster, better sleep quality

**Use Case 4: Sleep Optimization**
- User has trouble falling asleep
- "Sleep Protocol" before bed
- Delta entrainment + heart coherence
- Falls asleep faster, deeper sleep

**Use Case 5: Chronic Pain Management**
- User experiences chronic pain
- Daily "Pain Relief" sessions
- Specific frequencies for pain modulation
- Reduced pain levels, improved function

---

## 3. PRODUCT FEATURES & REQUIREMENTS

### 3.1 Core Features (MVP)

#### 3.1.1 Frequency Generation
**Requirement**: Generate therapeutic frequencies through smartphone hardware
- **PEMF**: Via speaker vibration (0.5 Hz - 50 MHz range)
- **Binaural Beats**: Stereo audio processing (Delta, Theta, Alpha, Beta, Gamma)
- **Photobiomodulation**: LED flash (660nm red, 850nm NIR)
- **Heart Coherence**: Frequency entrainment based on HRV

**Acceptance Criteria**:
- Frequencies accurate within ±0.1 Hz
- Smooth transitions between frequencies
- No audio glitches or interruptions
- LED flash intensity calibrated for therapeutic wavelengths

#### 3.1.2 Heart Rate Variability Monitoring
**Requirement**: Real-time HRV measurement via smartphone camera
- Use photoplethysmography (PPG) technology
- Measure HRV during sessions
- Calculate coherence scores
- Provide real-time feedback

**Acceptance Criteria**:
- HRV measurement accuracy: ±5% vs. chest strap
- Real-time updates every 5 seconds
- Works in various lighting conditions
- Clear user instructions for finger placement

#### 3.1.3 Session Library
**Requirement**: Pre-built session protocols for common goals
- **Energy & Focus**: Beta/Gamma frequencies
- **Stress Relief**: Alpha/Theta + heart coherence
- **Recovery**: PEMF + Delta frequencies
- **Sleep**: Deep Delta entrainment
- **Pain Relief**: Specific pain-modulation frequencies
- **Meditation**: Theta frequencies + guided meditation

**Acceptance Criteria**:
- Minimum 10 pre-built sessions at launch
- Clear descriptions of each session
- Estimated duration displayed
- Expected outcomes explained

#### 3.1.4 Basic Personalization
**Requirement**: Goal-based protocol selection
- User selects primary goal during onboarding
- App recommends appropriate sessions
- Basic tracking of session completion
- Simple progress indicators

**Acceptance Criteria**:
- Onboarding flow completed in <5 minutes
- Recommendations relevant to user goals
- Progress visible and motivating
- Easy to change goals

#### 3.1.5 Session Analytics
**Requirement**: Track and display session results
- Session completion tracking
- Coherence score display
- Basic progress over time
- Session history

**Acceptance Criteria**:
- All sessions tracked accurately
- Visual progress indicators
- Historical data accessible
- Export capability (future)

### 3.2 Advanced Features (Post-MVP)

#### 3.2.1 AI Personalization Engine
**Requirement**: Machine learning-based frequency optimization
- Analyze user biometrics, goals, session effectiveness
- Adapt frequencies in real-time during sessions
- Learn user preferences over time
- Generate personalized protocols

**Acceptance Criteria**:
- Recommendations improve over time (measured by user satisfaction)
- Real-time frequency adjustments based on HRV
- Personalized protocols show measurable improvements
- User can override AI recommendations

#### 3.2.2 Advanced Biometric Integration
**Requirement**: Connect with external devices
- Apple Watch integration
- Fitbit integration
- Bluetooth HRV monitors
- Health app integration (Apple Health, Google Fit)

**Acceptance Criteria**:
- Seamless device pairing
- Data syncs automatically
- Multiple devices supported
- Privacy-compliant data handling

#### 3.2.3 Photobiomodulation Protocols
**Requirement**: Full LED flash therapy protocols
- Calibrated light intensity
- Pulsing patterns
- Duration control
- Safety warnings (eye protection)

**Acceptance Criteria**:
- Light intensity within therapeutic range
- Smooth pulsing patterns
- Clear safety instructions
- Works with various phone models

#### 3.2.4 Social Features
**Requirement**: Community and sharing capabilities
- Share protocols with friends
- Community challenges
- Success stories
- Expert practitioner protocols

**Acceptance Criteria**:
- Easy sharing functionality
- Privacy controls
- Community engagement metrics
- Moderation tools

#### 3.2.5 Professional Tools
**Requirement**: Tools for wellness practitioners
- Client management
- Protocol builder
- Progress tracking for clients
- White-label options

**Acceptance Criteria**:
- HIPAA-compliant (if handling health data)
- Easy client management
- Flexible protocol creation
- Professional reporting

---

## 4. USER EXPERIENCE REQUIREMENTS

### 4.1 Onboarding Flow
**Requirement**: Simple, engaging introduction to Biomi
1. Welcome screen with value proposition
2. Health assessment questionnaire (5-10 questions)
3. Baseline HRV measurement
4. First session recommendation
5. Tutorial on app usage

**Acceptance Criteria**:
- Complete onboarding in <5 minutes
- Clear value communication
- Engaging, not overwhelming
- First session success (user completes it)

### 4.2 Session Experience
**Requirement**: Intuitive, calming session interface
- Large, clear session controls
- Real-time HRV visualization
- Coherence score display
- Gentle guidance (voice or text)
- Easy pause/resume

**Acceptance Criteria**:
- Interface doesn't distract from session
- Clear visual feedback
- Smooth, calming aesthetic
- Accessible (works for various abilities)

### 4.3 Progress Tracking
**Requirement**: Motivating progress visualization
- Weekly progress reports
- Coherence improvement graphs
- Streak tracking
- Achievement badges
- Goal progress indicators

**Acceptance Criteria**:
- Progress clearly visible
- Motivating, not overwhelming
- Accurate data representation
- Shareable progress (optional)

---

## 5. TECHNICAL REQUIREMENTS

### 5.1 Platform Support
- **iOS**: Version 14.0 and above
- **Android**: Version 10.0 and above
- **Tablets**: iPad and Android tablets supported
- **Wearables**: Apple Watch, Wear OS (future)

### 5.2 Performance Requirements
- **App Launch**: <3 seconds
- **Session Start**: <2 seconds
- **HRV Measurement**: Real-time (5-second updates)
- **Battery Impact**: <10% per 30-minute session
- **Storage**: <100MB app size

### 5.3 Offline Capability
- Core frequency generation works offline
- Pre-downloaded sessions available offline
- AI personalization requires internet
- Data syncs when online

### 5.4 Privacy & Security
- **Data Encryption**: All user data encrypted
- **HIPAA Compliance**: If handling health data
- **Privacy Policy**: Clear, transparent
- **User Control**: Users control data sharing
- **GDPR Compliance**: For international users

---

## 6. BUSINESS REQUIREMENTS

### 6.1 Subscription Model
- **Basic Tier**: $9.99/month
- **Premium Tier**: $19.99/month
- **Professional Tier**: $49.99/month
- Free trial: 7 days

### 6.2 Monetization Features
- In-app subscription management
- One-time purchases (premium protocols, accessories)
- Family sharing options
- Annual subscription discounts

### 6.3 Analytics Requirements
- User engagement metrics
- Session completion rates
- Subscription conversion rates
- Health outcome measurements (anonymized)

---

# PART II: FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)

## 7. FUNCTIONAL SPECIFICATIONS

### 7.1 Frequency Generation Module

#### 7.1.1 PEMF Generation
**Function**: Generate pulsed electromagnetic fields via speaker
- **Input**: Frequency (Hz), intensity, duration
- **Output**: Audio signal to speaker
- **Frequency Range**: 0.5 Hz - 50 MHz
- **Precision**: ±0.1 Hz
- **Algorithm**: Sine wave generation with pulse modulation

**Technical Specifications**:
```
Frequency: 0.5 Hz - 50 MHz
Sample Rate: 192 kHz (for high-frequency support)
Bit Depth: 24-bit
Output: Stereo audio
Calibration: Device-specific speaker response compensation
```

#### 7.1.2 Binaural Beats Generation
**Function**: Generate brainwave entrainment frequencies
- **Input**: Target brainwave state (Delta, Theta, Alpha, Beta, Gamma)
- **Output**: Stereo audio with frequency differential
- **Frequency Ranges**:
  - Delta: 0.5-4 Hz
  - Theta: 4-8 Hz
  - Alpha: 8-14 Hz
  - Beta: 14-30 Hz
  - Gamma: 30-100 Hz

**Technical Specifications**:
```
Base Frequency: 200-500 Hz (carrier)
Frequency Differential: Target brainwave frequency
Stereo Separation: Full (left/right channels)
Audio Format: AAC, 44.1 kHz, 16-bit minimum
```

#### 7.1.3 Photobiomodulation Control
**Function**: Control LED flash for light therapy
- **Input**: Wavelength (660nm or 850nm), intensity, pulsing pattern
- **Output**: LED flash control signals
- **Wavelengths**: 660nm (red), 850nm (NIR)
- **Intensity**: Calibrated to therapeutic levels (100mW/cm² equivalent)
- **Pulsing**: Continuous, pulsed, or strobe patterns

**Technical Specifications**:
```
LED Control: Camera flash API
Wavelength Calibration: Device-specific
Intensity Measurement: Via camera sensor
Safety: Automatic shutoff, eye protection warnings
```

#### 7.1.4 Heart Coherence Entrainment
**Function**: Generate frequencies that entrain heart rhythm
- **Input**: Current HRV, target coherence state
- **Output**: Frequency pattern synchronized with heart rhythm
- **Frequency Range**: 0.1-0.4 Hz (heart rate variability range)
- **Adaptation**: Real-time adjustment based on HRV feedback

**Technical Specifications**:
```
Entrainment Frequency: 0.1-0.4 Hz
Update Rate: Every 5 seconds (based on HRV measurement)
Synchronization: Phase-locked to heart rhythm
Adaptation Algorithm: Adaptive frequency following
```

### 7.2 Biometric Monitoring Module

#### 7.2.1 HRV Measurement (Camera-Based)
**Function**: Measure heart rate variability using smartphone camera
- **Input**: Camera video feed (finger on camera)
- **Output**: Heart rate, HRV metrics, coherence score
- **Method**: Photoplethysmography (PPG)
- **Update Rate**: Every 5 seconds
- **Accuracy**: ±5% vs. chest strap reference

**Technical Specifications**:
```
Measurement Duration: 60 seconds minimum for baseline
Update Frequency: 5 seconds during session
Signal Processing: FFT analysis, noise filtering
Coherence Calculation: HeartMath algorithm
Data Storage: Local + cloud sync
```

#### 7.2.2 Coherence Score Calculation
**Function**: Calculate psychophysiological coherence
- **Input**: HRV data, heart rate intervals
- **Output**: Coherence score (0-100)
- **Algorithm**: HeartMath coherence algorithm
- **Visualization**: Real-time graph, session average

**Technical Specifications**:
```
Coherence Range: 0-100
Update Rate: Real-time (every 5 seconds)
Visualization: Sine wave pattern, color-coded
Storage: Per-session coherence history
```

### 7.3 AI Personalization Engine

#### 7.3.1 User Profiling
**Function**: Build comprehensive user profile
- **Input**: Health assessment, session history, biometrics, goals
- **Output**: User profile with preferences and patterns
- **Data Points**:
  - Demographics (age, gender, health conditions)
  - Goals (stress relief, sleep, performance, pain)
  - Session history (completion, effectiveness)
  - Biometric patterns (HRV baseline, coherence trends)
  - Time-of-day preferences
  - Stress level patterns

**Technical Specifications**:
```
Profile Storage: Encrypted cloud database
Update Frequency: After each session
Privacy: User-controlled data sharing
GDPR Compliance: Right to deletion, data portability
```

#### 7.3.2 Frequency Optimization Algorithm
**Function**: Determine optimal frequencies for user
- **Input**: User profile, current biometrics, session goal
- **Output**: Recommended frequency protocol
- **Algorithm**: Machine learning model (neural network)
- **Training Data**: User session effectiveness, biometric responses

**Technical Specifications**:
```
Model Type: Neural network (TensorFlow Lite)
Input Features: 50+ features (HRV, goals, history, time, etc.)
Output: Frequency recommendations with confidence scores
Update Frequency: Continuous learning from user feedback
Privacy: On-device processing where possible
```

#### 7.3.3 Real-Time Adaptation
**Function**: Adjust frequencies during session based on real-time feedback
- **Input**: Current HRV, coherence score, session duration
- **Output**: Frequency adjustments
- **Adaptation Rate**: Every 30 seconds
- **Adjustment Range**: ±10% from baseline frequency

**Technical Specifications**:
```
Adaptation Algorithm: Reinforcement learning
Feedback Loop: HRV response to frequency changes
Adjustment Limits: ±10% frequency, ±20% intensity
User Override: Manual frequency control available
```

### 7.4 Session Management Module

#### 7.4.1 Session Library
**Function**: Store and manage session protocols
- **Pre-built Sessions**: 10+ at launch, expandable
- **Custom Sessions**: User-created or AI-generated
- **Session Metadata**: Duration, goal, description, expected outcomes
- **Session Format**: JSON structure with frequency parameters

**Technical Specifications**:
```
Session Format: JSON
Storage: Local cache + cloud sync
Update Mechanism: OTA updates for new sessions
Versioning: Session version control
```

#### 7.4.2 Session Execution
**Function**: Run frequency therapy sessions
- **Session Start**: Initialize all frequency generators
- **Real-Time Control**: Start, pause, resume, stop
- **Progress Tracking**: Time remaining, coherence score
- **Session End**: Save results, update user profile

**Technical Specifications**:
```
State Management: Session state machine
Error Handling: Graceful degradation if hardware unavailable
Background Mode: Continue session if app backgrounded
Notifications: Session reminders, completion alerts
```

#### 7.4.3 Session Analytics
**Function**: Track and analyze session effectiveness
- **Metrics**: Completion rate, coherence improvement, duration
- **Visualization**: Graphs, trends, progress indicators
- **Reporting**: Weekly summaries, goal progress
- **Export**: Data export for users (CSV, JSON)

**Technical Specifications**:
```
Data Storage: Local SQLite + cloud backup
Analytics Engine: On-device processing
Visualization: Charts (line, bar, pie)
Export Format: CSV, JSON, PDF reports
```

### 7.5 User Interface Functions

#### 7.5.1 Onboarding Flow
**Function**: Guide new users through setup
- **Screens**: Welcome, health assessment, baseline measurement, tutorial
- **Data Collection**: Demographics, goals, health conditions
- **Baseline Measurement**: 60-second HRV measurement
- **First Session**: Recommended session based on goals

**Technical Specifications**:
```
Screen Flow: Linear with skip options
Data Validation: Required fields, format checking
Progress Indicator: Step counter (1 of 5)
Persistence: Save progress, resume later
```

#### 7.5.2 Main Dashboard
**Function**: Primary app interface
- **Components**: Quick start sessions, progress summary, recommendations
- **Navigation**: Bottom tab bar (Home, Sessions, Progress, Profile)
- **Personalization**: AI-recommended sessions based on time/stress

**Technical Specifications**:
```
UI Framework: Native (SwiftUI/React Native)
Navigation: Tab-based with deep linking
Refresh Rate: Real-time updates
Offline Support: Cached content available
```

#### 7.5.3 Session Interface
**Function**: Session execution screen
- **Components**: Frequency visualization, HRV graph, coherence score, controls
- **Visual Design**: Calming, minimal, non-distracting
- **Accessibility**: VoiceOver support, large text, color contrast

**Technical Specifications**:
```
UI Updates: 60 FPS for smooth animations
Accessibility: WCAG 2.1 AA compliance
Dark Mode: Supported
Orientation: Portrait and landscape
```

### 7.6 Integration Functions

#### 7.6.1 Health App Integration
**Function**: Sync data with Apple Health / Google Fit
- **Data Types**: Heart rate, HRV, session completion, coherence scores
- **Privacy**: User-controlled sharing
- **Format**: HealthKit / Google Fit APIs

**Technical Specifications**:
```
API: HealthKit (iOS), Google Fit (Android)
Data Types: Heart rate, HRV, mindfulness minutes
Sync Frequency: After each session
Privacy: Explicit user permission required
```

#### 7.6.2 Wearable Device Integration
**Function**: Connect with Apple Watch, Fitbit, HRV monitors
- **Devices**: Apple Watch, Fitbit, Bluetooth HRV chest straps
- **Data**: Heart rate, HRV (more accurate than camera)
- **Control**: Start sessions from wearable (future)

**Technical Specifications**:
```
Bluetooth: BLE 4.0+
Device Support: Apple Watch, Fitbit API, generic BLE HRV
Pairing: In-app device discovery and pairing
Data Sync: Real-time during sessions
```

### 7.7 Backend Functions

#### 7.7.1 User Authentication
**Function**: Secure user account management
- **Methods**: Email/password, Apple Sign-In, Google Sign-In
- **Security**: Encrypted passwords, 2FA option
- **Session Management**: Secure token-based authentication

**Technical Specifications**:
```
Auth Provider: Firebase Auth / AWS Cognito
Security: OAuth 2.0, JWT tokens
Password Policy: Minimum 8 characters, complexity requirements
2FA: Optional TOTP support
```

#### 7.7.2 Data Synchronization
**Function**: Sync user data across devices
- **Data Types**: Profile, session history, preferences, progress
- **Sync Method**: Real-time when online, queue when offline
- **Conflict Resolution**: Last-write-wins with user notification

**Technical Specifications**:
```
Backend: Cloud Firestore / AWS DynamoDB
Sync Protocol: Real-time listeners + offline queue
Conflict Resolution: Timestamp-based with merge strategies
Encryption: End-to-end encryption for sensitive data
```

#### 7.7.3 Subscription Management
**Function**: Handle subscription payments and tiers
- **Payment**: Stripe / RevenueCat integration
- **Tiers**: Basic, Premium, Professional
- **Features**: Free trial, family sharing, annual discounts

**Technical Specifications**:
```
Payment Provider: Stripe / RevenueCat
Platform: App Store / Play Store in-app purchases
Receipt Validation: Server-side validation
Subscription Status: Real-time updates
```

---

## 8. NON-FUNCTIONAL REQUIREMENTS

### 8.1 Performance
- **App Launch**: <3 seconds
- **Session Start**: <2 seconds
- **HRV Measurement**: Real-time (5-second latency)
- **UI Responsiveness**: 60 FPS animations
- **Battery Usage**: <10% per 30-minute session

### 8.2 Reliability
- **Uptime**: 99.9% backend availability
- **Crash Rate**: <0.1% of sessions
- **Data Loss**: Zero data loss (backup and sync)
- **Error Recovery**: Graceful degradation

### 8.3 Security
- **Data Encryption**: AES-256 encryption at rest and in transit
- **Authentication**: Secure token-based auth
- **Privacy**: GDPR, HIPAA compliance (if applicable)
- **API Security**: Rate limiting, input validation

### 8.4 Scalability
- **User Capacity**: Support 1M+ concurrent users
- **Database**: Horizontally scalable
- **CDN**: Global content delivery
- **Load Balancing**: Auto-scaling infrastructure

### 8.5 Usability
- **Accessibility**: WCAG 2.1 AA compliance
- **Localization**: English at launch, expandable
- **Device Support**: iOS 14+, Android 10+
- **Offline**: Core features work offline

---

## 9. TESTING REQUIREMENTS

### 9.1 Unit Testing
- **Coverage**: 80%+ code coverage
- **Frequency Generation**: Test all frequency ranges
- **HRV Algorithm**: Validate against reference devices
- **AI Models**: Test with known inputs/outputs

### 9.2 Integration Testing
- **Device Integration**: Test with various phones, wearables
- **Backend Integration**: Test API endpoints, data sync
- **Payment Integration**: Test subscription flows
- **Health App Integration**: Test data sync

### 9.3 User Acceptance Testing
- **Beta Testing**: 1,000+ beta users
- **Feedback Collection**: In-app feedback mechanism
- **Metrics**: Session completion, satisfaction scores
- **Iteration**: Rapid feedback loops

### 9.4 Performance Testing
- **Load Testing**: Simulate 10,000+ concurrent sessions
- **Stress Testing**: Test under high load
- **Battery Testing**: Measure battery impact
- **Network Testing**: Test on various network conditions

---

## 10. DEPLOYMENT REQUIREMENTS

### 10.1 App Store Requirements
- **iOS**: App Store guidelines compliance
- **Android**: Google Play guidelines compliance
- **Privacy**: Privacy policy, data usage disclosure
- **Age Rating**: 4+ (general audience)

### 10.2 Release Strategy
- **MVP Launch**: Core features only
- **Phased Rollout**: Gradual user expansion
- **A/B Testing**: Test features with user segments
- **Update Frequency**: Bi-weekly minor updates, monthly major updates

### 10.3 Monitoring & Analytics
- **Crash Reporting**: Sentry / Crashlytics
- **Analytics**: Mixpanel / Amplitude
- **Performance**: APM tools (New Relic, Datadog)
- **User Feedback**: In-app feedback, App Store reviews

---

**Document Version**: v.20251117-1500  
**Last Updated**: November 17, 2025  
**Next Review**: December 17, 2025

---

*This PRD/FRD is a living document and will be updated as product requirements evolve.*

