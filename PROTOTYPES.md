# SensAI Prototypes

This repository contains **two distinct prototypes** of the SensAI platform, each taking a different strategic approach to campaign intelligence.

---

## 🔄 Accessing the Prototypes

### Landing Page (Default)
- **URL**: `/` or `http://localhost:5173`
- The landing page provides buttons to access either prototype

### Prototype 1: Trends-First Approach
- **URL**: `?app=trends` or `#app`
- **Component**: `src/App.jsx`
- **Philosophy**: Start with trending signals (Google Trends, events) and match products to capitalize

### Prototype 2: Inventory-First Approach ⭐ NEW
- **URL**: `?app=inventory`
- **Component**: `src/InventoryApp.jsx`
- **Philosophy**: Start with inventory status and recommend campaigns to move specific SKUs

---

## 📊 Prototype Comparison

| Aspect | Trends-First | Inventory-First |
|--------|--------------|-----------------|
| **Starting Point** | Social trends & events | Inventory levels & quality |
| **Primary Goal** | Capitalize on market momentum | Optimize inventory positions |
| **User Flow** | Find trend → Match products → Launch campaign | Analyze inventory → Get action → Launch campaign |
| **Best For** | Opportunistic marketing | Inventory management & liquidation |
| **Dashboard View** | Trends, Events, Campaigns | Inventory status categories |

---

## 🎯 Prototype 1: Trends-First Approach

### Concept
Monitor external signals (Google Trends, events, social media) and proactively suggest campaigns when trends align with available inventory.

### Key Features
- **Trends Dashboard**: Displays trending keywords with velocity, growth, and lifecycle
- **Events Calendar**: Shows upcoming fitness events with impact scores
- **Campaign Builder**: Generates campaigns based on trend-product matches
- **Signal Convergence**: Identifies when multiple signals align (trend + event)

### User Journey
1. View trending keywords (e.g., "Protein Ice Cream" is surging)
2. See which products match the trend
3. Review auto-generated campaign recommendations
4. Launch influencer + Google Ads campaigns
5. Track performance

### Data Flow
```
External Signals → Product Matching → Campaign Generation → Launch
```

### Files
- `src/App.jsx` - Main trends dashboard (5,940 lines)
- `src/data/socialTrends-MINIMAL-TEST.js` - Mock trend data
- `src/data/events.js` - Event database
- `src/data/campaigns.js` - Campaign templates

---

## 📦 Prototype 2: Inventory-First Approach

### Concept
Start with your actual inventory positions (levels, shelf life, bet quality) and recommend campaigns specifically designed to move or amplify those SKUs.

### Key Features
- **Inventory Categorization**: Auto-categorizes products into Critical/Amplify/Stable
- **Action Intelligence**: Tells you exactly what to do with each SKU
- **SKU-Specific Campaigns**: Generates campaigns tailored to each product's needs
- **Multi-Channel Recommendations**: Influencer, Google Ads, and Hybrid campaigns

### User Journey
1. See inventory status overview (3 categories)
2. Identify products needing action (liquidation or amplification)
3. Click a product to see campaign recommendations
4. Review matched influencers, Google Ads strategies, and hybrid options
5. Launch campaigns to achieve inventory goals

### Inventory Categories

#### 🔴 CRITICAL - Needs Liquidation
**Triggers:**
- Bet Quality = BAD
- Shelf life < 90 days
- Days of supply > 60

**Example**: RTD Chocolate Shake
- 18,000 units on hand
- 65 days of supply (excess)
- 62 days shelf life (expiring soon)
- **Action**: Aggressive liquidation campaign

#### 🟡 AMPLIFY - Push Opportunity
**Triggers:**
- Bet Quality = GOOD
- High velocity (units/day)
- Healthy shelf life

**Example**: Whey Vanilla 1kg
- 4,200 units on hand
- 42 days of supply (healthy)
- 380 days shelf life (safe)
- 100 units/day velocity (strong)
- **Action**: Amplify demand to maximize revenue

#### 🟢 STABLE - Healthy Stock
**Triggers:**
- Balanced inventory levels
- No urgency

**Action**: Monitor, no immediate action needed

### Campaign Types Generated

#### 1. Influencer Campaign
- Matches product category to influencer specialties
- Selects best ROI influencers
- Provides messaging strategy and timeline
- **Example Budget**: €2,000-4,000

#### 2. Google Ads Campaign
- Auto-generates relevant keywords
- Creates Shopping + Search campaigns
- Optimizes for product-specific goals
- **Example Budget**: €1,500-3,000

#### 3. Hybrid Campaign
- Combines influencers + Google Ads + trending topics
- Multi-channel approach for maximum impact
- Leverages signal convergence
- **Example Budget**: €3,000-6,000

### Data Flow
```
Inventory Analysis → Action Determination → Campaign Matching → Multi-Channel Launch
```

### Intelligence Features

**Automatic Calculations:**
- Recommended campaign budget (based on inventory value)
- Expected units to move
- Projected revenue loss (if liquidation needed)
- Optimal discount percentage
- Campaign duration
- Expected ROI

**Smart Matching:**
- Product category → Influencer specialty
- Product attributes → Google keywords
- Inventory urgency → Campaign aggressiveness
- Trending topics → Product relevance

### Files
- `src/InventoryApp.jsx` - Main inventory dashboard
- `src/data/products.js` - Enhanced product data (reused)
- `src/data/influencers.js` - Influencer database (reused)
- `src/data/events.js` - Events database (reused)

---

## 🎨 Design Philosophy Differences

### Trends-First (App.jsx)
- **Mindset**: "What's trending? How can we capitalize?"
- **Reactive**: Respond to external market signals
- **Opportunity-driven**: Chase momentum
- **Risk**: May recommend campaigns for products with poor inventory positions

### Inventory-First (InventoryApp.jsx)
- **Mindset**: "What do we need to move? How do we move it?"
- **Proactive**: Solve internal inventory challenges
- **Goal-driven**: Achieve specific SKU objectives
- **Strategic**: Every campaign has a clear inventory purpose

---

## 🔧 Technical Implementation

### Shared Data Models
Both prototypes use the same underlying data:
- `products.js` - 12 SKUs with inventory, pricing, shelf life
- `influencers.js` - 11+ pre-vetted influencers
- `events.js` - 14 upcoming fitness events
- `campaigns.js` - Campaign templates and logic

### Unique Logic

**Trends-First:**
- `generateTrendData()` - Simulates trending keywords
- `generateCampaignRecommendation()` - Matches trends to products
- Event-product impact matrices

**Inventory-First:**
- `analyzeInventoryStatus()` - Categorizes products by action needed
- `generateCampaignsForProduct()` - Creates SKU-specific campaigns
- Budget calculation based on inventory value

---

## 🚀 Use Cases

### Use Trends-First When:
- You want to be opportunistic and agile
- External market signals are your primary driver
- You have flexible inventory that can support various trends
- Your goal is to maximize FOMO and ride viral moments

### Use Inventory-First When:
- You have specific inventory challenges to solve
- Liquidation or amplification is your priority
- You want campaigns directly tied to business metrics (units moved, days of supply)
- Your goal is inventory optimization and working capital efficiency

---

## 📈 Future Convergence

The ideal final product would **combine both approaches**:

```
┌─────────────────┐         ┌──────────────────┐
│  Trends Signal  │────────▶│  Campaign Engine │
└─────────────────┘         └──────────────────┘
                                     ▲
                                     │
┌─────────────────┐                  │
│ Inventory Need  │──────────────────┘
└─────────────────┘
```

**Hybrid Intelligence:**
- "You have excess RTD Chocolate Shakes (inventory need)"
- "Convenience/On-the-Go is trending +45% (trend signal)"
- "CONVERGENCE DETECTED → Launch Hybrid Campaign!"

This would provide the **best of both worlds**: solving inventory problems while capitalizing on market momentum.

---

## 🧪 Demo Data Status

**Both prototypes use 100% mock data:**
- ❌ No real Google Trends API
- ❌ No real influencer platforms
- ❌ No real inventory system integration
- ✅ Sophisticated business logic with realistic calculations
- ✅ Professional UI/UX suitable for investor demos

---

## 📝 Notes

- Both are **frontend-only prototypes**
- All data is hardcoded in `/src/data/` folder
- Campaigns save to `localStorage` only
- Perfect for **product validation** and **stakeholder demos**
- Not production-ready (see REMINDERS.md for integration roadmap)

---

## 🎯 Recommendation

For your specific use case (sports nutrition brand with inventory management challenges), the **Inventory-First approach** is likely more valuable because:

1. **Direct ROI**: Every campaign ties to a specific inventory goal
2. **Risk Reduction**: Prevents bad bets and shelf life losses
3. **Working Capital**: Optimizes cash tied up in inventory
4. **Measurable**: Clear KPIs (units moved, days of supply reduced)

However, the **Trends-First approach** provides valuable **opportunistic upside** when combined with healthy inventory positions.

**Ideal State**: Use both in parallel, with inventory-first as the foundation and trends-first as the opportunity layer.
