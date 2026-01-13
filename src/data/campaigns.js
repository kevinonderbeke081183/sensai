// =============================================================================
// CAMPAIGN TEMPLATES & RECOMMENDATION ENGINE
// =============================================================================
// Templates for: Trend Amplify, Event Pre-Launch, Liquidation
// 
// REMINDER FOR LATER: 
// - Revise event-product impact matrix based on actual campaign data
// - Add machine learning for impact prediction based on historical performance
// =============================================================================

// =============================================================================
// IMPACT MATRIX
// =============================================================================
// Maps event types to product category demand multipliers
// REMINDER: Revise this matrix based on actual campaign performance data
// =============================================================================

export const eventProductImpactMatrix = {
  // Event Category → Product Impact Multipliers
  'FITNESS_COMPETITION': {
    'hyrox': {
      preWorkout: 1.80,
      protein: 0.80,
      creatine: 1.20,
      energyDrink: 1.00,
      rtdShake: 0.60,
      proteinBar: 0.40,
    },
    'crossfit': {
      preWorkout: 1.60,
      protein: 1.00,
      creatine: 1.40,
      energyDrink: 0.80,
      rtdShake: 0.50,
      proteinBar: 0.60,
    },
    'running': {
      preWorkout: 0.40,
      protein: 0.40,
      creatine: 0.10,
      energyDrink: 1.60,
      rtdShake: 1.20,
      proteinBar: 1.00,
    },
    'bodybuilding': {
      preWorkout: 1.20,
      protein: 1.80,
      creatine: 1.00,
      energyDrink: 0.40,
      rtdShake: 0.80,
      proteinBar: 0.60,
    },
  },
  'SEASONAL_MOMENT': {
    'newyear': {
      preWorkout: 0.60,
      protein: 1.20,
      creatine: 0.40,
      energyDrink: 0.40,
      rtdShake: 1.40,
      proteinBar: 1.20,
    },
    'summer': {
      preWorkout: 0.80,
      protein: 1.00,
      creatine: 0.60,
      energyDrink: 0.60,
      rtdShake: 1.20,
      proteinBar: 0.80,
    },
    'backtoroutine': {
      preWorkout: 0.80,
      protein: 0.80,
      creatine: 0.60,
      energyDrink: 1.00,
      rtdShake: 1.40,
      proteinBar: 1.20,
    },
  },
  'LOCAL_REGIONAL': {
    'gym_opening': {
      preWorkout: 1.40,
      protein: 1.00,
      creatine: 0.80,
      energyDrink: 0.60,
      rtdShake: 0.80,
      proteinBar: 0.60,
    },
    'local_race': {
      preWorkout: 0.40,
      protein: 0.30,
      creatine: 0.10,
      energyDrink: 1.20,
      rtdShake: 0.80,
      proteinBar: 1.00,
    },
    'fitness_expo': {
      preWorkout: 1.00,
      protein: 1.00,
      creatine: 0.80,
      energyDrink: 0.80,
      rtdShake: 1.00,
      proteinBar: 1.00,
    },
  },
  'FITNESS_INDUSTRY': {
    'tradeshow': {
      preWorkout: 1.40,
      protein: 1.40,
      creatine: 1.20,
      energyDrink: 1.00,
      rtdShake: 1.20,
      proteinBar: 1.00,
    },
    'conference': {
      preWorkout: 0.60,
      protein: 0.80,
      creatine: 0.40,
      energyDrink: 0.40,
      rtdShake: 0.60,
      proteinBar: 0.40,
    },
  },
};

// Social trend to product mapping
export const trendProductMapping = {
  'FITNESS_CHALLENGE': {
    '75soft': ['rtdShake', 'proteinBar', 'protein'],
    'cozycardio': ['rtdShake', 'proteinBar'],
    'hyrox': ['preWorkout', 'creatine', 'energyDrink', 'protein'],
  },
  'HEALTH_NEWS': {
    'cognitive': ['creatine'],
    'protein_timing': ['protein', 'rtdShake', 'proteinBar'],
  },
  'CULTURAL_MOMENT': {
    'recipes': ['protein', 'casein'],
    'morning_routine': ['preWorkout', 'rtdShake', 'proteinBar', 'energyDrink'],
    'couples': ['protein', 'preWorkout', 'rtdShake'],
  },
};

// =============================================================================
// CAMPAIGN TEMPLATES
// =============================================================================

export const campaignTemplates = {
  // -------------------------------------------------------------------------
  // TREND AMPLIFY - Ride a growing social trend
  // -------------------------------------------------------------------------
  TREND_AMPLIFY: {
    id: 'TMPL-001',
    name: 'Trend Amplify',
    description: 'Amplify a growing social trend when you have inventory to fulfill demand',
    type: 'AMPLIFICATION',
    applicableWhen: {
      trendLifecycle: ['EMERGING', 'GROWING', 'PEAK'],
      inventoryBetQuality: ['GOOD', 'NEUTRAL'],
      minDaysOfSupply: 20,
    },
    defaultConfig: {
      duration: 7,
      influencerMix: {
        micro: { count: 15, platform: 'mixed' },
        mid: { count: 3, platform: 'mixed' },
      },
      contentTypes: ['reel', 'story', 'post'],
      budgetRange: { min: 2000, max: 4000 },
    },
    kpis: {
      expectedROI: { min: 2.5, target: 4.0, max: 6.0 },
      expectedLift: { min: 0.20, target: 0.35, max: 0.50 },
      expectedNewCustomers: { min: 50, target: 150, max: 300 },
    },
    messagingAngles: [
      'Join the movement - [TREND] made easy with [PRODUCT]',
      'Everyone\'s talking about [TREND] - here\'s why [PRODUCT] is the secret',
      'Your [TREND] journey starts with the right fuel',
    ],
    urgencyFactors: {
      trendVelocity: 0.4,      // Weight of trend growth speed
      inventoryFit: 0.3,       // Weight of product match
      competitorActivity: 0.2, // Weight of competitor presence
      timing: 0.1,             // Weight of timing (lifecycle stage)
    },
  },

  // -------------------------------------------------------------------------
  // EVENT PRE-LAUNCH - Build demand before an event
  // -------------------------------------------------------------------------
  EVENT_PRELAUNCH: {
    id: 'TMPL-002',
    name: 'Event Pre-Launch',
    description: 'Build demand and capture sales before a major event',
    type: 'EVENT',
    applicableWhen: {
      daysUntilEvent: { min: 5, max: 30 },
      eventSize: { min: 1000 },
      inventoryBetQuality: ['GOOD', 'NEUTRAL'],
    },
    defaultConfig: {
      duration: 14,
      startDaysBefore: 14,
      influencerMix: {
        micro: { count: 10, platform: 'instagram' },
        mid: { count: 5, platform: 'instagram' },
        athlete: { count: 3, platform: 'instagram' },
      },
      contentTypes: ['post', 'story', 'reel'],
      budgetRange: { min: 2500, max: 5000 },
    },
    phases: [
      {
        name: 'Awareness',
        days: [14, 10],
        focus: 'Build anticipation, prep content',
        contentType: 'educational',
      },
      {
        name: 'Consideration',
        days: [9, 5],
        focus: 'Product integration, prep protocols',
        contentType: 'product-focused',
      },
      {
        name: 'Conversion',
        days: [4, 0],
        focus: 'Urgency, last chance messaging',
        contentType: 'promotional',
      },
    ],
    kpis: {
      expectedROI: { min: 3.0, target: 4.5, max: 7.0 },
      expectedLift: { min: 0.30, target: 0.50, max: 0.80 },
      expectedNewCustomers: { min: 80, target: 200, max: 400 },
    },
    messagingAngles: [
      'Get [EVENT]-ready with [PRODUCT]',
      'Your [EVENT] prep checklist (hint: [PRODUCT] is on it)',
      'Top athletes trust [PRODUCT] for [EVENT] - here\'s why',
    ],
    leadTimeConsiderations: {
      warehouseProcessing: 1,  // Days for warehouse to pick/pack
      shipping: {
        BENELUX: 2,
        DACH: 3,
      },
      bufferDays: 1,
    },
  },

  // -------------------------------------------------------------------------
  // LIQUIDATION - Clear excess or expiring inventory
  // -------------------------------------------------------------------------
  LIQUIDATION: {
    id: 'TMPL-003',
    name: 'Strategic Liquidation',
    description: 'Clear excess inventory through influencer-driven demand, better than discounting',
    type: 'LIQUIDATION',
    applicableWhen: {
      inventoryBetQuality: ['BAD'],
      minDaysOfSupply: 45,
      shelfLifeRemaining: { max: 120 },
    },
    defaultConfig: {
      duration: 10,
      urgency: 'HIGH',
      influencerMix: {
        micro: { count: 20, platform: 'mixed' },
        mid: { count: 5, platform: 'mixed' },
      },
      contentTypes: ['reel', 'story'],  // Fast, high-volume content
      budgetRange: { min: 1500, max: 3500 },
    },
    incentiveStructure: {
      type: 'PERFORMANCE_BONUS',
      description: 'Reward influencers for driving measurable sales',
      basePayment: 0.6,  // 60% upfront
      bonusPayment: 0.4, // 40% based on performance
      bonusTrigger: {
        metric: 'conversions',
        threshold: 1.2,  // 20% above expected
      },
    },
    kpis: {
      expectedROI: { min: 3.5, target: 5.0, max: 8.0 },
      expectedUnitsCleared: { min: 0.20, target: 0.35, max: 0.50 }, // % of excess
      marginProtection: { min: 0.70 },  // Protect 70% of margin vs full discount
    },
    messagingAngles: [
      'Limited batch available - grab yours before it\'s gone',
      'Insider access to [PRODUCT] - my followers get first dibs',
      'Why I\'m stocking up on [PRODUCT] right now',
    ],
    promoMechanics: [
      {
        type: 'EXCLUSIVE_CODE',
        discount: 15,
        description: 'Influencer-exclusive 15% off code',
      },
      {
        type: 'BUNDLE_DEAL',
        description: 'Buy 2 get 1 free on specific SKUs',
      },
      {
        type: 'FREE_SHIPPING',
        threshold: 50,
        description: 'Free shipping over €50',
      },
    ],
  },
};

// =============================================================================
// CAMPAIGN RECOMMENDATION ENGINE
// =============================================================================

export function generateCampaignRecommendation({
  signal,           // Event or Trend object
  signalType,       // 'EVENT' or 'TREND'
  matchedProducts,  // Products that match the signal
  inventoryData,    // Current inventory positions
  influencerPool,   // Available influencers
  config = {},      // Optional overrides
}) {
  // Determine campaign type based on signal and inventory
  let templateType = 'TREND_AMPLIFY';
  
  if (signalType === 'EVENT') {
    templateType = 'EVENT_PRELAUNCH';
  }
  
  // Check if any matched product needs liquidation
  const liquidationCandidates = matchedProducts.filter(p => 
    p.betQuality === 'BAD' || 
    (p.inventory?.shelfLifeRemaining && p.inventory.shelfLifeRemaining < 90) ||
    (p.inventory?.daysOfSupply && p.inventory.daysOfSupply > 60)
  );
  
  if (liquidationCandidates.length > 0 && signalType !== 'EVENT') {
    templateType = 'LIQUIDATION';
  }
  
  const template = campaignTemplates[templateType];
  
  // Select influencers based on signal
  const selectedInfluencers = selectInfluencersForCampaign({
    signal,
    signalType,
    template,
    influencerPool,
  });
  
  // Calculate budget
  const estimatedBudget = calculateCampaignBudget(selectedInfluencers, template);
  
  // Calculate expected outcomes
  const expectedOutcomes = calculateExpectedOutcomes({
    signal,
    signalType,
    template,
    matchedProducts,
    selectedInfluencers,
    budget: estimatedBudget,
  });
  
  // Calculate urgency considering logistics
  const urgency = calculateUrgencyWithLogistics({
    signal,
    signalType,
    template,
    matchedProducts,
  });
  
  // Generate recommendation
  return {
    id: `CAMP-${Date.now()}`,
    createdAt: new Date().toISOString(),
    
    // Campaign details
    type: templateType,
    templateId: template.id,
    name: generateCampaignName(signal, signalType, templateType),
    description: generateCampaignDescription(signal, signalType, template),
    
    // Trigger
    trigger: {
      type: signalType,
      signalId: signal.id,
      signalName: signal.name,
      confidence: signal.confidence,
    },
    
    // Products
    products: matchedProducts.map(p => ({
      id: p.id,
      name: p.shortName || p.name,
      category: p.category,
      inventoryPosition: {
        onHand: p.inventory?.totalOnHand,
        daysOfSupply: p.inventory?.daysOfSupply,
        betQuality: p.betQuality,
      },
      relevanceScore: p.relevanceScore || 0.8,
    })),
    
    // Influencers
    influencers: {
      selected: selectedInfluencers.map(inf => ({
        id: inf.id,
        handle: inf.handle,
        name: inf.name,
        platform: inf.platform,
        tier: inf.tier,
        followers: inf.followers,
        engagement: inf.engagement,
        cost: inf.rates?.singlePost || inf.rates?.singleVideo || 0,
      })),
      totalReach: selectedInfluencers.reduce((sum, inf) => sum + inf.followers, 0),
      avgEngagement: selectedInfluencers.reduce((sum, inf) => sum + inf.engagement, 0) / selectedInfluencers.length,
    },
    
    // Budget
    budget: {
      estimated: estimatedBudget,
      breakdown: {
        influencerFees: estimatedBudget * 0.75,
        productSampling: estimatedBudget * 0.15,
        contingency: estimatedBudget * 0.10,
      },
      range: template.defaultConfig.budgetRange,
    },
    
    // Timeline
    timeline: {
      duration: template.defaultConfig.duration,
      suggestedStart: calculateSuggestedStart(signal, signalType, template),
      phases: template.phases || null,
    },
    
    // Expected outcomes
    expectedOutcomes,
    
    // Urgency & priority
    urgency: urgency.level,
    urgencyScore: urgency.score,
    urgencyFactors: urgency.factors,
    
    // Logistics considerations
    logistics: {
      warehouseLeadTime: 1,
      shippingTime: { BENELUX: 2, DACH: 3 },
      lastOrderDate: calculateLastOrderDate(signal, signalType),
      note: 'Orders must be placed by this date to arrive before event/trend peak',
    },
    
    // Messaging
    suggestedMessaging: selectMessagingAngle(signal, signalType, template),
    
    // Convergence (if applicable)
    convergence: checkConvergence(signal, signalType),
    
    // Status
    status: 'RECOMMENDED',
    
    // Actions
    actions: ['LAUNCH', 'CUSTOMIZE', 'DISMISS'],
  };
}

// Helper functions for the recommendation engine

function selectInfluencersForCampaign({ signal, signalType, template, influencerPool }) {
  const config = template.defaultConfig.influencerMix;
  const selected = [];
  
  // Get relevant categories from signal
  const relevantCategories = getRelevantCategories(signal, signalType);
  
  // Select micro influencers
  if (config.micro) {
    const microPool = influencerPool.filter(inf => 
      inf.tier === 'MICRO' &&
      inf.contractStatus === 'ACTIVE' &&
      inf.categories.some(cat => relevantCategories.includes(cat))
    ).sort((a, b) => b.avgROI - a.avgROI);
    
    selected.push(...microPool.slice(0, config.micro.count));
  }
  
  // Select mid-tier influencers
  if (config.mid) {
    const midPool = influencerPool.filter(inf => 
      inf.tier === 'MID' &&
      inf.contractStatus === 'ACTIVE' &&
      inf.categories.some(cat => relevantCategories.includes(cat))
    ).sort((a, b) => b.avgROI - a.avgROI);
    
    selected.push(...midPool.slice(0, config.mid.count));
  }
  
  // Select athletes (for event campaigns)
  if (config.athlete) {
    const athletePool = influencerPool.filter(inf => 
      inf.categories.includes('athlete') ||
      inf.categories.includes('competition') ||
      inf.competingAt?.length > 0
    );
    
    selected.push(...athletePool.slice(0, config.athlete.count));
  }
  
  return selected;
}

function getRelevantCategories(signal, signalType) {
  if (signalType === 'EVENT') {
    const tags = signal.tags || [];
    return [...tags, signal.subcategory?.toLowerCase()].filter(Boolean);
  } else {
    return signal.tags || [];
  }
}

function calculateCampaignBudget(influencers, template) {
  const influencerCost = influencers.reduce((sum, inf) => {
    return sum + (inf.rates?.singlePost || inf.rates?.singleVideo || 300);
  }, 0);
  
  // Add 25% for product sampling and contingency
  const totalBudget = influencerCost * 1.25;
  
  // Clamp to template range
  const { min, max } = template.defaultConfig.budgetRange;
  return Math.max(min, Math.min(max, totalBudget));
}

function calculateExpectedOutcomes({ signal, signalType, template, matchedProducts, selectedInfluencers, budget }) {
  const totalReach = selectedInfluencers.reduce((sum, inf) => sum + inf.followers, 0);
  const avgEngagement = selectedInfluencers.reduce((sum, inf) => sum + inf.engagement, 0) / selectedInfluencers.length;
  const avgConversion = selectedInfluencers.reduce((sum, inf) => sum + (inf.performance?.conversionRate || 0.02), 0) / selectedInfluencers.length;
  
  // Calculate expected impressions (reach * avg posts * engagement multiplier)
  const expectedImpressions = totalReach * 2.5;
  
  // Calculate expected clicks
  const avgCTR = selectedInfluencers.reduce((sum, inf) => sum + (inf.performance?.clickThroughRate || 0.03), 0) / selectedInfluencers.length;
  const expectedClicks = expectedImpressions * avgCTR;
  
  // Calculate expected conversions
  const expectedConversions = expectedClicks * avgConversion;
  
  // Calculate expected revenue (using avg product price)
  const avgProductPrice = matchedProducts.reduce((sum, p) => sum + (p.pricing?.retailPrice || 25), 0) / matchedProducts.length;
  const expectedRevenue = expectedConversions * avgProductPrice;
  
  // Calculate ROI
  const expectedROI = expectedRevenue / budget;
  
  // Calculate demand lift
  const avgDailyDemand = matchedProducts.reduce((sum, p) => sum + (p.inventory?.avgDailyDemand || 50), 0) / matchedProducts.length;
  const baselineSales = avgDailyDemand * template.defaultConfig.duration;
  const demandLift = expectedConversions / baselineSales;
  
  return {
    reach: totalReach,
    impressions: Math.round(expectedImpressions),
    clicks: Math.round(expectedClicks),
    conversions: Math.round(expectedConversions),
    expectedRevenue: Math.round(expectedRevenue),
    expectedProfit: Math.round(expectedRevenue * 0.45),  // Assume 45% margin
    expectedROI: Math.round(expectedROI * 10) / 10,
    demandLift: Math.round(demandLift * 100) / 100,
    confidence: 0.75,  // Base confidence
  };
}

function calculateUrgencyWithLogistics({ signal, signalType, template, matchedProducts }) {
  const factors = {};
  let score = 0;
  
  if (signalType === 'EVENT') {
    // Time-based urgency for events
    const daysUntil = signal.daysUntil || 30;
    const leadTime = template.defaultConfig.startDaysBefore || 14;
    const logisticsBuffer = 4;  // Warehouse + shipping buffer
    
    const daysToAct = daysUntil - logisticsBuffer;
    
    if (daysToAct <= 3) {
      factors.timing = { score: 1.0, reason: 'Must act immediately' };
      score += 0.4;
    } else if (daysToAct <= 7) {
      factors.timing = { score: 0.8, reason: 'Action needed this week' };
      score += 0.32;
    } else if (daysToAct <= 14) {
      factors.timing = { score: 0.5, reason: 'Plan and prepare' };
      score += 0.2;
    } else {
      factors.timing = { score: 0.3, reason: 'Good lead time available' };
      score += 0.12;
    }
  } else {
    // Trend lifecycle urgency
    const lifecycle = signal.lifecycle;
    if (lifecycle === 'EMERGING') {
      factors.timing = { score: 0.9, reason: 'Early mover advantage' };
      score += 0.36;
    } else if (lifecycle === 'GROWING') {
      factors.timing = { score: 0.7, reason: 'Trend accelerating' };
      score += 0.28;
    } else if (lifecycle === 'PEAK') {
      factors.timing = { score: 0.5, reason: 'Ride the peak' };
      score += 0.2;
    } else {
      factors.timing = { score: 0.2, reason: 'Trend stabilizing' };
      score += 0.08;
    }
  }
  
  // Inventory urgency
  const hasLiquidationCandidate = matchedProducts.some(p => 
    p.betQuality === 'BAD' || 
    (p.inventory?.shelfLifeRemaining && p.inventory.shelfLifeRemaining < 90)
  );
  
  if (hasLiquidationCandidate) {
    factors.inventory = { score: 0.9, reason: 'Inventory needs liquidation' };
    score += 0.35;
  } else {
    factors.inventory = { score: 0.3, reason: 'Inventory healthy' };
    score += 0.12;
  }
  
  // Convergence bonus
  const hasConvergence = signal.convergingEvents?.length > 0;
  if (hasConvergence) {
    factors.convergence = { score: 1.0, reason: 'Multiple signals align!' };
    score += 0.25;
  }
  
  // Determine level
  let level = 'LOW';
  if (score >= 0.7) level = 'CRITICAL';
  else if (score >= 0.5) level = 'HIGH';
  else if (score >= 0.3) level = 'MEDIUM';
  
  return { level, score: Math.round(score * 100) / 100, factors };
}

function calculateSuggestedStart(signal, signalType, template) {
  const today = new Date();
  
  if (signalType === 'EVENT') {
    const eventDate = new Date(signal.date);
    const startDaysBefore = template.defaultConfig.startDaysBefore || 14;
    const startDate = new Date(eventDate);
    startDate.setDate(startDate.getDate() - startDaysBefore);
    
    // Don't suggest past dates
    return startDate > today ? startDate.toISOString().split('T')[0] : today.toISOString().split('T')[0];
  } else {
    // For trends, start ASAP
    return today.toISOString().split('T')[0];
  }
}

function calculateLastOrderDate(signal, signalType) {
  if (signalType === 'EVENT') {
    const eventDate = new Date(signal.date);
    // 4 days before event (1 day warehouse + 3 days shipping)
    eventDate.setDate(eventDate.getDate() - 4);
    return eventDate.toISOString().split('T')[0];
  } else {
    // For trends, calculate based on peak prediction
    if (signal.peakPredicted && signal.peakPredicted !== 'EVERGREEN') {
      const peakDate = new Date(signal.peakPredicted);
      peakDate.setDate(peakDate.getDate() - 4);
      return peakDate.toISOString().split('T')[0];
    }
    return null;
  }
}

function selectMessagingAngle(signal, signalType, template) {
  const angles = template.messagingAngles;
  const angle = angles[Math.floor(Math.random() * angles.length)];
  
  return angle
    .replace('[TREND]', signal.name)
    .replace('[EVENT]', signal.name)
    .replace('[PRODUCT]', 'FitFuel');
}

function checkConvergence(signal, signalType) {
  if (signal.convergingEvents?.length > 0) {
    return {
      hasConvergence: true,
      convergingWith: signal.convergingEvents,
      multiplierBoost: 1.5,
      recommendation: 'Increase budget by 50% to capitalize on signal convergence',
    };
  }
  return { hasConvergence: false };
}

function generateCampaignName(signal, signalType, templateType) {
  const prefix = {
    'TREND_AMPLIFY': 'Ride the Wave',
    'EVENT_PRELAUNCH': 'Get Ready',
    'LIQUIDATION': 'Flash Move',
  }[templateType] || 'Campaign';
  
  return `${prefix}: ${signal.name}`;
}

function generateCampaignDescription(signal, signalType, template) {
  if (template.type === 'LIQUIDATION') {
    return `Clear excess inventory by leveraging ${signal.name} to drive demand through influencer campaigns.`;
  } else if (signalType === 'EVENT') {
    return `Capture demand leading up to ${signal.name} with a coordinated influencer campaign.`;
  } else {
    return `Amplify the ${signal.name} trend while inventory is positioned to fulfill demand.`;
  }
}

export default {
  campaignTemplates,
  eventProductImpactMatrix,
  trendProductMapping,
  generateCampaignRecommendation,
};
