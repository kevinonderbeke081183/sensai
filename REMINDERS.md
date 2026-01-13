# Signal Intelligence Dashboard - Future Improvements & Reminders

## 🔴 HIGH PRIORITY REMINDERS

### 1. Real Social Trend API Connections

**Current State:** Using mock data for social trends

**When to Build:** Before live customer demo or pilot

**APIs to Connect:**

#### Google Trends API
```javascript
// Option A: pytrends (Python) - more reliable
// Install: pip install pytrends
from pytrends.request import TrendReq
pytrends = TrendReq(hl='en-US', tz=360)
pytrends.build_payload(['protein ice cream'], geo='DE', timeframe='now 7-d')
interest = pytrends.interest_over_time()

// Option B: Node.js wrapper (unofficial)
// Install: npm install google-trends-api
const googleTrends = require('google-trends-api');
googleTrends.interestOverTime({
  keyword: 'protein ice cream',
  geo: 'DE',
  startTime: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))
})
.then(results => JSON.parse(results));
```

**Rate Limits:** ~1 request per 10 seconds (unofficial API)

#### Instagram Graph API
```javascript
// Requires: Facebook Developer Account + Business Account
// Endpoint: https://graph.facebook.com/v18.0/

// Step 1: Get hashtag ID
fetch(`https://graph.facebook.com/v18.0/ig_hashtag_search?user_id=${userId}&q=proteinicecream&access_token=${token}`)

// Step 2: Get recent media for hashtag
fetch(`https://graph.facebook.com/v18.0/${hashtagId}/recent_media?user_id=${userId}&fields=id,caption,like_count,comments_count,timestamp&access_token=${token}`)
```

**Rate Limits:** 200 calls/hour per user

#### TikTok Research API (Limited)
- Apply at: https://developers.tiktok.com/
- Very restricted access, usually requires partnership
- **Alternative:** Use third-party tools:
  - Brandwatch (enterprise)
  - Sprout Social (mid-market)
  - CreatorIQ (influencer focus)

**Recommended Approach for MVP:**
1. Start with Google Trends (easiest)
2. Add Instagram hashtag tracking
3. Consider Brandwatch/Sprinklr for TikTok data

---

### 2. Event-Product Impact Matrix - Needs Real Data Validation

**Current State:** Pre-built estimates based on industry knowledge

**What Needs Validation:**

| Event Type | Current Assumption | What to Track |
|------------|-------------------|---------------|
| Hyrox | +180% pre-workout | Actual sales lift during past Hyrox events |
| Marathon | +160% energy drinks | Correlation with race registrations |
| FIBO | +140% protein | Historical FIBO week sales data |

**How to Validate:**
1. Pull 12 months of sales data by product category
2. Map to event calendar (was there an event within 7 days?)
3. Calculate actual lift vs. baseline
4. Update impact scores in `/data/events.js` and `/data/campaigns.js`

**Data Points to Collect:**
```javascript
// For each event, track:
{
  eventId: 'EVT-001',
  eventName: 'Hyrox Cologne 2025',
  actualSales: {
    preWorkout: { baseline: 100, actual: 285, lift: 1.85 },
    protein: { baseline: 200, actual: 340, lift: 0.70 },
    // ...
  },
  campaignRun: true,
  campaignBudget: 2500,
  campaignROI: 4.2,
}
```

**File to Update:** `/apps/signal-intelligence/src/data/campaigns.js` - `eventProductImpactMatrix`

---

### 3. Influencer Performance Bonus Structure (Liquidation)

**Concept:** Reward influencers with bonuses when they successfully drive liquidation

**Current Implementation:** Basic bonus trigger in `campaignTemplates.LIQUIDATION.incentiveStructure`

**Full Implementation Needed:**

```javascript
// Liquidation Campaign Bonus Structure
const liquidationBonusStructure = {
  // Base payment (upfront)
  basePayment: {
    percent: 60,  // 60% of agreed rate paid upfront
    paidOn: 'content_live',
  },
  
  // Performance bonus
  performanceBonus: {
    percent: 40,  // 40% held for performance
    tiers: [
      { threshold: 1.0, multiplier: 1.0, label: 'Target Met' },
      { threshold: 1.2, multiplier: 1.3, label: '20% Over (+30% bonus)' },
      { threshold: 1.5, multiplier: 1.6, label: '50% Over (+60% bonus)' },
      { threshold: 2.0, multiplier: 2.0, label: 'Double Target (2x bonus)' },
    ],
    trackedBy: 'unique_discount_code',
    attributionWindow: '7_days',
  },
  
  // Example:
  // Influencer rate: €500
  // Base payment: €300 (60%)
  // Performance pool: €200 (40%)
  // If they hit 150% of target: €200 × 1.6 = €320 bonus
  // Total payout: €300 + €320 = €620
};
```

**Tracking Requirements:**
1. Unique discount codes per influencer
2. Attribution tracking (7-day window recommended)
3. Real-time dashboard for influencer to see their performance
4. Automated payout calculation

**This is powerful because:**
- Aligns influencer incentives with liquidation goals
- Higher payouts only when campaign works
- Creates competition between influencers
- Builds loyalty with top performers

---

## 🟡 MEDIUM PRIORITY REMINDERS

### 4. Warehouse & Logistics Lead Time Integration

**Current State:** Static lead times (1 day warehouse + 2-3 days shipping)

**Improvement:** Pull real-time data from WMS/TMS

```javascript
// Integrate with WMS API
const getLeadTime = async (productId, locationId) => {
  const warehouseCapacity = await wms.getCurrentCapacity(locationId);
  const pickPackTime = warehouseCapacity.utilizationPercent > 80 ? 2 : 1;
  
  const shipping = await tms.getTransitTime(locationId, customerRegion);
  
  return {
    warehouseProcessing: pickPackTime,
    shipping: shipping.transitDays,
    total: pickPackTime + shipping.transitDays,
    confidence: shipping.onTimeRate,
  };
};
```

### 5. Signal Convergence Scoring Model

**Current State:** Binary detection (convergence exists or not)

**Improvement:** Weighted scoring based on:
- Signal strength of each converging signal
- Overlap in affected product categories
- Geographic alignment
- Timing overlap

```javascript
const calculateConvergenceScore = (signal1, signal2) => {
  let score = 0;
  
  // Strength multiplier
  score += (signal1.confidence + signal2.confidence) / 2 * 0.3;
  
  // Product overlap
  const productOverlap = calculateProductOverlap(signal1, signal2);
  score += productOverlap * 0.3;
  
  // Geographic alignment
  const geoMatch = signal1.region === signal2.region ? 1 : 0.5;
  score += geoMatch * 0.2;
  
  // Timing overlap (within 7 days)
  const timingScore = calculateTimingOverlap(signal1, signal2);
  score += timingScore * 0.2;
  
  return {
    score,
    multiplierRecommendation: score > 0.7 ? 1.5 : score > 0.5 ? 1.3 : 1.0,
  };
};
```

### 6. Influencer Platform Integration

**For Automation (Phase 2):**

| Platform | API | Use Case |
|----------|-----|----------|
| CreatorIQ | REST API | Influencer discovery, campaign management |
| Grin | REST API | Relationship management, payments |
| Upfluence | REST API | Search, outreach automation |
| Aspire | REST API | E-commerce focused campaigns |

**Minimum Integration:**
1. Push campaign briefs to platform
2. Pull influencer acceptance/rejection
3. Pull content URLs when live
4. Pull performance metrics for ROI calculation

---

## 🟢 LOWER PRIORITY / NICE TO HAVE

### 7. AI/LLM Classification for Trend-Product Matching

**Current State:** Rule-based keyword matching

**Improvement:** Use Claude API for intelligent matching

```javascript
const classifyTrendProductMatch = async (trend) => {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Given this social media trend in the fitness/nutrition space:
      
      Trend: ${trend.name}
      Description: ${trend.description}
      Hashtags: ${trend.hashtags.join(', ')}
      
      Which product categories would benefit most from this trend?
      Categories: protein powder, pre-workout, creatine, energy drinks, RTD shakes, protein bars
      
      Return JSON with relevance scores (0-1) for each category and reasoning.`
    }]
  });
  
  return JSON.parse(response.content[0].text);
};
```

### 8. Automated Campaign Brief Generation

Generate influencer briefs automatically:

```javascript
const generateInfluencerBrief = async (campaign, influencer) => {
  const brief = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    messages: [{
      role: 'user',
      content: `Create an influencer brief for:
      
      Campaign: ${campaign.name}
      Product: ${campaign.products[0].name}
      Key message: ${campaign.suggestedMessaging}
      Influencer style: ${influencer.specialties.join(', ')}
      Platform: ${influencer.platform}
      
      Include: hook ideas, key talking points, dos/don'ts, hashtags to use`
    }]
  });
  
  return brief.content[0].text;
};
```

---

## 📊 Data Collection for Future Improvements

### Start Tracking Now:

1. **Campaign Performance Log**
   - Every campaign launched
   - Actual spend vs. budget
   - Actual lift vs. predicted lift
   - ROI calculation

2. **Influencer Performance Log**
   - By influencer: conversions, engagement, CTR
   - Which influencers work for which product categories
   - Response time and reliability

3. **Signal Accuracy Log**
   - Predicted impact vs. actual impact
   - Which signal types are most accurate
   - False positive rate (signals that didn't convert)

4. **Product-Signal Correlation**
   - Which products respond to which signals
   - Seasonal patterns
   - Regional differences

---

## 🗓️ Suggested Implementation Timeline

| Phase | Focus | Timeline |
|-------|-------|----------|
| Phase 1 | Google Trends API integration | Week 1-2 |
| Phase 2 | Validate impact matrix with real data | Week 2-3 |
| Phase 3 | Influencer bonus tracking | Week 3-4 |
| Phase 4 | Instagram API integration | Week 4-5 |
| Phase 5 | Full campaign performance loop | Week 5-6 |

---

**Last Updated:** January 2026
**Dashboard Version:** 1.0.0 (MVP)
