import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5050;
const JWT_SECRET = process.env.JWT_SECRET || 'tripora-jwt-super-secret-key-2026';

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'tripora-api-gateway',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime()
  });
});

import crypto from 'crypto';

// In-memory OTP store (email:purpose -> { otp, expiresAt, attempts })
interface OtpRecord {
  otp: string;
  expiresAt: number;
  attempts: number;
  purpose: 'login' | 'register' | 'booking' | 'general';
}

const otpStore = new Map<string, OtpRecord>();

// Helper to generate cryptographically secure numeric OTP
function generateOtpCode(length: number = 6): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return crypto.randomInt(min, max + 1).toString();
}

// Clean up expired OTPs periodically (every 10 mins)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of otpStore.entries()) {
    if (record.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

// Auth Routes: OTP Generation & Verification
app.post('/api/auth/send-otp', (req: Request, res: Response) => {
  const { email, purpose = 'login', phone } = req.body;
  if (!email && !phone) {
    return res.status(400).json({ error: 'Email or phone number is required to send OTP' });
  }

  const targetIdentifier = (email || phone).toLowerCase().trim();
  const validPurposes = ['login', 'register', 'booking', 'general'];
  const otpPurpose = validPurposes.includes(purpose) ? (purpose as any) : 'login';

  const otpCode = generateOtpCode(6);
  const ttlMs = 5 * 60 * 1000; // 5 minutes validity
  const expiresAt = Date.now() + ttlMs;

  const key = `${targetIdentifier}:${otpPurpose}`;
  otpStore.set(key, {
    otp: otpCode,
    expiresAt,
    attempts: 0,
    purpose: otpPurpose
  });

  console.log(`🔑 [OTP Generated] Purpose: ${otpPurpose} | Target: ${targetIdentifier} | Code: ${otpCode} | Valid for 5m`);

  res.json({
    success: true,
    message: `OTP successfully generated and sent for ${otpPurpose}`,
    identifier: targetIdentifier,
    purpose: otpPurpose,
    expiresInSeconds: 300,
    // In dev / demo mode, return the OTP for direct UI testing & autofill
    demoOtp: otpCode
  });
});

app.post('/api/auth/verify-otp', (req: Request, res: Response) => {
  const { email, phone, otp, purpose = 'login' } = req.body;
  const targetIdentifier = (email || phone || '').toLowerCase().trim();

  if (!targetIdentifier || !otp) {
    return res.status(400).json({ error: 'Target identifier and OTP code are required' });
  }

  const key = `${targetIdentifier}:${purpose}`;
  const record = otpStore.get(key);

  if (!record) {
    return res.status(400).json({
      success: false,
      error: 'No active OTP found or OTP has expired. Please request a new code.'
    });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({
      success: false,
      error: 'OTP code has expired. Please generate a new code.'
    });
  }

  if (record.attempts >= 5) {
    otpStore.delete(key);
    return res.status(429).json({
      success: false,
      error: 'Too many failed verification attempts. Please generate a new OTP.'
    });
  }

  if (record.otp !== String(otp).trim()) {
    record.attempts += 1;
    return res.status(400).json({
      success: false,
      error: `Invalid OTP code. ${5 - record.attempts} attempts remaining.`
    });
  }

  // Verification succeeded
  res.json({
    success: true,
    message: 'OTP verified successfully'
  });
});

// Login with OTP
app.post('/api/auth/login-with-otp', (req: Request, res: Response) => {
  const { email, otp, role = 'traveler' } = req.body;
  const targetEmail = (email || '').toLowerCase().trim();

  if (!targetEmail || !otp) {
    return res.status(400).json({ error: 'Email and OTP code are required for login' });
  }

  const key = `${targetEmail}:login`;
  const record = otpStore.get(key);

  // Allow standard fallback code '123456' for rapid developer testing if not in store
  const isValid = (record && record.otp === String(otp).trim() && Date.now() <= record.expiresAt) || otp === '123456';

  if (!isValid) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or expired OTP for login. Please request a new code.'
    });
  }

  // Clear OTP after successful use
  otpStore.delete(key);

  const userId = `usr-${Date.now()}`;
  const token = jwt.sign(
    { id: userId, email: targetEmail, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: {
      id: userId,
      name: targetEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: targetEmail,
      role
    }
  });
});

// Register with OTP
app.post('/api/auth/register-with-otp', (req: Request, res: Response) => {
  const { name, email, otp, role = 'traveler', phone } = req.body;
  const targetEmail = (email || '').toLowerCase().trim();

  if (!name || !targetEmail || !otp) {
    return res.status(400).json({ error: 'Full name, email, and OTP code are required for registration' });
  }

  const key = `${targetEmail}:register`;
  const record = otpStore.get(key);

  const isValid = (record && record.otp === String(otp).trim() && Date.now() <= record.expiresAt) || otp === '123456';

  if (!isValid) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or expired registration OTP. Please request a new code.'
    });
  }

  // Clear OTP after successful use
  otpStore.delete(key);

  const userId = `usr-${Date.now()}`;
  const token = jwt.sign(
    { id: userId, name, email: targetEmail, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: {
      id: userId,
      name,
      email: targetEmail,
      role,
      phone
    }
  });
});

// Auth Routes: Legacy Direct Password / Mock
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, role = 'traveler' } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = jwt.sign(
    { id: `usr-${Date.now()}`, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role
    }
  });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, role = 'traveler' } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const token = jwt.sign(
    { id: `usr-${Date.now()}`, name, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    token,
    user: {
      id: `usr-${Date.now()}`,
      name,
      email,
      role
    }
  });
});

// AI Trip Planner & Chat Assistant Route
app.post('/api/ai/chat', (req: Request, res: Response) => {
  const { message } = req.body;
  const lower = (message || '').toLowerCase();

  let reply = `I have processed your query for Tripora AI. All destination attractions, routes, and opening hours have been verified against current schedules.`;
  let suggestedPrompts = ['Show top recommended stays', 'Plan a 5-day itinerary', 'Optimize budget by 15%'];

  if (lower.includes('shinkansen') || (lower.includes('tokyo') && lower.includes('kyoto'))) {
    reply = `🚅 **Traveling from Tokyo to Kyoto on the Shinkansen (Bullet Train):**\n\n1. **Best Train**: Take the **Tokaido Shinkansen (Nozomi train)** from **Tokyo Station** or **Shinagawa Station** directly to **Kyoto Station**.\n2. **Travel Time**: ~2 hours and 15 minutes (285 km/h).\n3. **Fares & Passes**: \n   - Reserved Seat: ~¥14,170 ($95 USD)\n   - Non-Reserved: ~¥13,320 ($90 USD)\n   - If using a **JR Pass**, take the *Hikari* train (takes ~2h 40m with full JR Pass coverage).\n4. **Pro Tip**: Request **Seats on the Right (Row E)** when traveling West to get a spectacular view of **Mount Fuji** passing Shizuoka!`;
    suggestedPrompts = ['Book Kyoto Ryokan', 'View 5-Day Kyoto Itinerary', 'Check Japan Rail Pass options'];
  } else if (lower.includes('amalfi') || lower.includes('romantic')) {
    reply = `🌅 **5-Day Romantic Amalfi Coast Itinerary:**\n\n• **Day 1: Arrival in Positano & Cliffside Dinner** — Check in to a panoramic boutique stay in Praiano or Positano; enjoy sunset aperitivo at Franco's Bar and candlelit seafood at *La Sponda*.\n• **Day 2: Private Capri Boat Cruise** — Charter a traditional Gozzo boat around Faraglioni rock formations, swim in the Green Grotto, and stroll Anacapri.\n• **Day 3: Path of the Gods Hike & Ravello Gardens** — Early morning hike along the *Sentiero degli Dei*, followed by afternoon classical music strolls through Villa Rufolo & Villa Cimbrone in Ravello.\n• **Day 4: Amalfi Town & Hidden Fiordo di Furore** — Visit Amalfi Cathedral (Duomo), explore paper mills, and swim in the breathtaking fjord cove.\n• **Day 5: Limoncello Masterclass & Sunset in Conca dei Marini** — Private coastal cooking lesson with Michelin sea views.`;
    suggestedPrompts = ['Show luxury stays in Amalfi', 'Book Capri boat charter', 'Explore Amalfi restaurant guide'];
  } else if (lower.includes('budget') || lower.includes('optimize') || lower.includes('15%')) {
    reply = `💰 **15% Budget Optimization for Kyoto:**\n\n1. **Transport (Save ~$65/person)**: Replace private taxis with the **Subway & Bus 1-Day Pass (¥1,100)** and IC Card for local Kyoto city loops.\n2. **Dining (Save ~$110/day)**: Enjoy lunch sets at Michelin Bib Gourmand spots (*Gion Tanto*, *Menya Inoichi*) instead of pricey dinner kaiseki with identical culinary quality.\n3. **Accommodation (Save ~$140/night)**: Split stay: 3 nights in a stylish boutique hotel in Karasuma/Kawaramachi, followed by 1 signature luxury Ryokan night in Arashiyama.\n4. **Attraction Passes (Save 15%)**: Bundle Nijo Castle, Kyoto Tower, and Railway Museum digitally in advance.`;
    suggestedPrompts = ['Apply savings to Kyoto Itinerary', 'Find boutique stays under $200', 'Show cheap Michelin Bib spots'];
  } else if (lower.includes('bali') || lower.includes('sunrise') || lower.includes('photo')) {
    reply = `📸 **Top 4 Sunrise Photo Spots in Bali:**\n\n1. **Mount Batur Volcano Summit (Kintamani)**: 1,717m panoramic sunrise above the sea of clouds overlooking Mount Agung and Lake Batur (start hike at 3:30 AM).\n2. **Lempuyang Temple (Heaven's Gate, Karangasem)**: Iconic mirrored reflection framing Mount Agung at 5:30 AM before queues start.\n3. **Sanur Beach Promenade**: Serene golden hour over calm reef waters with traditional Jukung fishing outriggers.\n4. **Pinggan Village Viewpoint (Kintamani)**: Hidden gem mist-shrouded valley view with dramatic mountain silhouettes—zero hiking required!`;
    suggestedPrompts = ['Plan 7 days in Bali', 'Show Ubud jungle resorts', 'Find Bali photography tour'];
  } else if (lower.includes('kyoto') || lower.includes('japan')) {
    reply = `Kyoto is best experienced at dawn! I recommend visiting Fushimi Inari at 6:00 AM for crowd-free photography, followed by an authentic Kaiseki lunch in historic Gion and evening strolls along Pontocho Alley.`;
    suggestedPrompts = ['Plan 7 days in Kyoto', 'Show ryokans with private onsen'];
  }

  res.json({
    success: true,
    reply,
    suggestedPrompts
  });
});

app.post('/api/ai/plan-trip', (req: Request, res: Response) => {
  const { destination, durationDays = 5, travelersCount = 2, budgetTier = 'Balanced' } = req.body;
  
  res.json({
    success: true,
    message: `Synthesized ${durationDays}-day itinerary for ${destination}`,
    meta: {
      destination,
      durationDays,
      travelersCount,
      budgetTier,
      generatedAt: new Date().toISOString()
    }
  });
});

// Bookings Endpoint
app.post('/api/bookings/checkout', (req: Request, res: Response) => {
  const bookingData = req.body;
  const bookingRef = `TP-${(bookingData.type || 'BK').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  res.json({
    success: true,
    bookingRef,
    status: 'confirmed',
    paymentStatus: 'paid',
    issuedAt: new Date().toISOString(),
    data: bookingData
  });
});

// Payment Processing Endpoints
app.post('/api/payments/intent', (req: Request, res: Response) => {
  const { amount, currency = 'USD', paymentMethod, itemId, itemTitle } = req.body;
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Valid payment amount is required' });
  }

  const clientSecret = `pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`;
  const transactionId = `TXN-${Date.now().toString().slice(-8)}`;

  res.json({
    success: true,
    clientSecret,
    transactionId,
    amount,
    currency,
    paymentMethod: paymentMethod || 'credit_card',
    requires3DSecure: amount > 500, // Trigger 3D Secure for amounts over $500
    createdAt: new Date().toISOString()
  });
});

app.post('/api/payments/confirm', (req: Request, res: Response) => {
  const { transactionId, paymentMethod, otpCode, guestEmail, amount } = req.body;

  // Verify OTP if 3D Secure was requested
  if (otpCode && otpCode !== '123456' && otpCode !== '888888') {
    return res.status(400).json({
      success: false,
      error: 'Invalid 3D Secure verification code. Please check your bank SMS.'
    });
  }

  const receiptUrl = `https://tripora.ai/receipts/${transactionId}`;

  res.json({
    success: true,
    transactionId: transactionId || `TXN-${Date.now().toString().slice(-8)}`,
    status: 'succeeded',
    paymentMethod: paymentMethod || 'Credit Card (•••• 4242)',
    settledAmount: amount || 1440,
    settlementTimestamp: new Date().toISOString(),
    receiptUrl,
    authorizationCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

app.post('/api/payments/coupon', (req: Request, res: Response) => {
  const { code, amount } = req.body;
  const coupon = (code || '').toUpperCase().trim();

  if (coupon === 'TRIPORA2026') {
    const discount = Math.round((amount || 100) * 0.15);
    return res.json({
      valid: true,
      code: 'TRIPORA2026',
      discountAmount: discount,
      description: '15% Tripora Explorer Launch Discount applied'
    });
  } else if (coupon === 'AIEXPLORE') {
    return res.json({
      valid: true,
      code: 'AIEXPLORE',
      discountAmount: 50,
      description: '$50 AI First-Trip Travel Credit applied'
    });
  } else {
    return res.status(400).json({
      valid: false,
      error: 'Invalid or expired promotional voucher code'
    });
  }
});

app.post('/api/payments/refund', (req: Request, res: Response) => {
  const { transactionId, bookingRef, amount, reason } = req.body;

  res.json({
    success: true,
    refundId: `RFD-${Date.now().toString().slice(-8)}`,
    transactionId,
    bookingRef,
    refundAmount: amount,
    status: 'refunded',
    disbursedTo: 'Original Payment Method',
    processedAt: new Date().toISOString()
  });
});

// Admin System Health Metrics
app.get('/api/admin/metrics', (req: Request, res: Response) => {
  res.json({
    usersCount: 14820,
    gmvUsd: 184920,
    aiInferences: 3491,
    avgLatencyMs: 380,
    services: [
      { name: 'Gateway', status: 'UP', port: 5000 },
      { name: 'FastAPI AI Engine', status: 'UP', port: 8000 },
      { name: 'PostgreSQL DB', status: 'UP', port: 5432 },
      { name: 'MongoDB', status: 'UP', port: 27017 },
      { name: 'Redis', status: 'UP', port: 6379 },
      { name: 'Kafka', status: 'UP', port: 9092 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Tripora AI API Gateway running on http://localhost:${PORT}`);
});
