// =============================================================================
// INFLUENCER DATABASE - Pre-vetted Pool
// =============================================================================
// Mock database of influencers for campaign recommendations
// Organized by tier, category affinity, and response time
// =============================================================================

export const influencers = [
  // ==========================================================================
  // MICRO INFLUENCERS (5K - 25K followers) - High engagement, fast response
  // ==========================================================================
  {
    id: 'INF-001',
    handle: '@fitnessmarta',
    name: 'Marta van der Berg',
    platform: 'instagram',
    tier: 'MICRO',
    followers: 18500,
    engagement: 0.068,  // 6.8% - excellent for micro
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'BENELUX',
    },
    categories: ['functional-fitness', 'CrossFit', 'nutrition'],
    audienceProfile: {
      ageRange: '25-35',
      gender: '65% female',
      interests: ['CrossFit', 'healthy eating', 'work-life balance'],
    },
    performance: {
      avgLikesPerPost: 1250,
      avgCommentsPerPost: 85,
      avgSavesPerPost: 180,
      clickThroughRate: 0.032,
      conversionRate: 0.018,
    },
    rates: {
      singlePost: 250,
      story: 80,
      reel: 400,
      bundle3Posts: 600,
    },
    responseTime: 'FAST',  // <4 hours
    avgResponseHours: 3,
    availability: 'HIGH',
    pastCampaigns: 12,
    avgROI: 3.8,
    specialties: ['recipe content', 'workout tips', 'product reviews'],
    languages: ['Dutch', 'English'],
    contractStatus: 'ACTIVE',  // Pre-vetted and ready
    notes: 'Excellent for recipe-based campaigns, very authentic',
  },
  {
    id: 'INF-002',
    handle: '@berlinfitfam',
    name: 'Max Schneider',
    platform: 'instagram',
    tier: 'MICRO',
    followers: 22000,
    engagement: 0.055,
    location: {
      city: 'Berlin',
      country: 'Germany',
      region: 'DACH',
    },
    categories: ['bodybuilding', 'strength', 'supplements'],
    audienceProfile: {
      ageRange: '22-38',
      gender: '75% male',
      interests: ['bodybuilding', 'strength training', 'supplements'],
    },
    performance: {
      avgLikesPerPost: 1210,
      avgCommentsPerPost: 95,
      avgSavesPerPost: 145,
      clickThroughRate: 0.028,
      conversionRate: 0.021,
    },
    rates: {
      singlePost: 280,
      story: 90,
      reel: 450,
      bundle3Posts: 680,
    },
    responseTime: 'FAST',
    avgResponseHours: 2,
    availability: 'HIGH',
    pastCampaigns: 8,
    avgROI: 4.2,
    specialties: ['supplement reviews', 'gym content', 'transformation'],
    languages: ['German', 'English'],
    contractStatus: 'ACTIVE',
  },
  {
    id: 'INF-003',
    handle: '@runningwithlotte',
    name: 'Lotte Jansen',
    platform: 'instagram',
    tier: 'MICRO',
    followers: 15800,
    engagement: 0.072,
    location: {
      city: 'Rotterdam',
      country: 'Netherlands',
      region: 'BENELUX',
    },
    categories: ['running', 'endurance', 'marathon'],
    audienceProfile: {
      ageRange: '28-45',
      gender: '55% female',
      interests: ['running', 'marathon', 'outdoor fitness'],
    },
    performance: {
      avgLikesPerPost: 1140,
      avgCommentsPerPost: 78,
      avgSavesPerPost: 120,
      clickThroughRate: 0.035,
      conversionRate: 0.016,
    },
    rates: {
      singlePost: 220,
      story: 70,
      reel: 350,
      bundle3Posts: 520,
    },
    responseTime: 'MEDIUM',
    avgResponseHours: 8,
    availability: 'MEDIUM',
    pastCampaigns: 6,
    avgROI: 3.5,
    specialties: ['race prep', 'nutrition for runners', 'gear reviews'],
    languages: ['Dutch', 'English'],
    contractStatus: 'ACTIVE',
  },
  {
    id: 'INF-004',
    handle: '@hyrox.lisa',
    name: 'Lisa Müller',
    platform: 'instagram',
    tier: 'MICRO',
    followers: 24500,
    engagement: 0.065,
    location: {
      city: 'Cologne',
      country: 'Germany',
      region: 'DACH',
    },
    categories: ['hyrox', 'functional-fitness', 'competition'],
    audienceProfile: {
      ageRange: '25-40',
      gender: '50% female',
      interests: ['Hyrox', 'functional fitness', 'competition'],
    },
    performance: {
      avgLikesPerPost: 1590,
      avgCommentsPerPost: 125,
      avgSavesPerPost: 220,
      clickThroughRate: 0.041,
      conversionRate: 0.024,
    },
    rates: {
      singlePost: 320,
      story: 100,
      reel: 500,
      bundle3Posts: 780,
    },
    responseTime: 'FAST',
    avgResponseHours: 4,
    availability: 'HIGH',
    pastCampaigns: 10,
    avgROI: 4.8,
    specialties: ['Hyrox prep', 'competition content', 'training plans'],
    languages: ['German', 'English'],
    contractStatus: 'ACTIVE',
    notes: 'Top performer for Hyrox-related campaigns',
  },
  {
    id: 'INF-005',
    handle: '@cozy.fitness.nl',
    name: 'Emma de Vries',
    platform: 'instagram',
    tier: 'MICRO',
    followers: 12000,
    engagement: 0.082,  // Very high engagement
    location: {
      city: 'Utrecht',
      country: 'Netherlands',
      region: 'BENELUX',
    },
    categories: ['beginner-fitness', 'low-impact', 'wellness'],
    audienceProfile: {
      ageRange: '25-45',
      gender: '80% female',
      interests: ['gentle fitness', 'wellness', 'self-care'],
    },
    performance: {
      avgLikesPerPost: 984,
      avgCommentsPerPost: 120,
      avgSavesPerPost: 180,
      clickThroughRate: 0.038,
      conversionRate: 0.015,
    },
    rates: {
      singlePost: 180,
      story: 60,
      reel: 280,
      bundle3Posts: 420,
    },
    responseTime: 'FAST',
    avgResponseHours: 2,
    availability: 'HIGH',
    pastCampaigns: 5,
    avgROI: 3.2,
    specialties: ['cozy cardio', 'beginner workouts', 'gentle nutrition'],
    languages: ['Dutch', 'English'],
    contractStatus: 'ACTIVE',
    notes: 'Perfect for anti-hustle, gentle fitness messaging',
  },

  // ==========================================================================
  // MID-TIER INFLUENCERS (25K - 100K followers)
  // ==========================================================================
  {
    id: 'INF-010',
    handle: '@proteinchef_de',
    name: 'Jonas Weber',
    platform: 'instagram',
    tier: 'MID',
    followers: 67000,
    engagement: 0.045,
    location: {
      city: 'Munich',
      country: 'Germany',
      region: 'DACH',
    },
    categories: ['recipes', 'nutrition', 'meal-prep'],
    audienceProfile: {
      ageRange: '22-40',
      gender: '55% male',
      interests: ['cooking', 'fitness nutrition', 'meal prep'],
    },
    performance: {
      avgLikesPerPost: 3015,
      avgCommentsPerPost: 180,
      avgSavesPerPost: 850,
      clickThroughRate: 0.029,
      conversionRate: 0.019,
    },
    rates: {
      singlePost: 800,
      story: 250,
      reel: 1200,
      bundle3Posts: 1900,
    },
    responseTime: 'MEDIUM',
    avgResponseHours: 12,
    availability: 'MEDIUM',
    pastCampaigns: 15,
    avgROI: 4.5,
    specialties: ['protein recipes', 'ice cream recipes', 'meal prep'],
    languages: ['German', 'English'],
    contractStatus: 'ACTIVE',
    notes: 'Go-to for recipe/cooking content, high save rate',
  },
  {
    id: 'INF-011',
    handle: '@crossfit_benelux',
    name: 'Thomas Bakker',
    platform: 'instagram',
    tier: 'MID',
    followers: 52000,
    engagement: 0.052,
    location: {
      city: 'Antwerp',
      country: 'Belgium',
      region: 'BENELUX',
    },
    categories: ['CrossFit', 'competition', 'coaching'],
    audienceProfile: {
      ageRange: '24-42',
      gender: '60% male',
      interests: ['CrossFit', 'Olympic lifting', 'competition'],
    },
    performance: {
      avgLikesPerPost: 2700,
      avgCommentsPerPost: 145,
      avgSavesPerPost: 320,
      clickThroughRate: 0.033,
      conversionRate: 0.022,
    },
    rates: {
      singlePost: 650,
      story: 200,
      reel: 1000,
      bundle3Posts: 1550,
    },
    responseTime: 'FAST',
    avgResponseHours: 6,
    availability: 'HIGH',
    pastCampaigns: 18,
    avgROI: 4.1,
    specialties: ['CrossFit workouts', 'competition prep', 'technique'],
    languages: ['Dutch', 'French', 'English'],
    contractStatus: 'ACTIVE',
  },
  {
    id: 'INF-012',
    handle: '@marathonmindset',
    name: 'Anna Schmidt',
    platform: 'instagram',
    tier: 'MID',
    followers: 45000,
    engagement: 0.048,
    location: {
      city: 'Hamburg',
      country: 'Germany',
      region: 'DACH',
    },
    categories: ['running', 'marathon', 'endurance'],
    audienceProfile: {
      ageRange: '28-50',
      gender: '50% female',
      interests: ['marathon', 'ultra running', 'endurance'],
    },
    performance: {
      avgLikesPerPost: 2160,
      avgCommentsPerPost: 110,
      avgSavesPerPost: 280,
      clickThroughRate: 0.031,
      conversionRate: 0.017,
    },
    rates: {
      singlePost: 580,
      story: 180,
      reel: 900,
      bundle3Posts: 1400,
    },
    responseTime: 'MEDIUM',
    avgResponseHours: 10,
    availability: 'MEDIUM',
    pastCampaigns: 12,
    avgROI: 3.6,
    specialties: ['race nutrition', 'training plans', 'race recaps'],
    languages: ['German', 'English'],
    contractStatus: 'ACTIVE',
  },

  // ==========================================================================
  // TIKTOK CREATORS - Trend-responsive
  // ==========================================================================
  {
    id: 'INF-020',
    handle: '@fitnesstiktok_nl',
    name: 'Daan Vermeer',
    platform: 'tiktok',
    tier: 'MID',
    followers: 89000,
    engagement: 0.085,  // Higher on TikTok
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'BENELUX',
    },
    categories: ['fitness', 'trends', 'humor'],
    audienceProfile: {
      ageRange: '18-30',
      gender: '55% male',
      interests: ['fitness', 'trends', 'entertainment'],
    },
    performance: {
      avgViewsPerVideo: 45000,
      avgLikesPerVideo: 3800,
      avgCommentsPerVideo: 180,
      avgSharesPerVideo: 420,
    },
    rates: {
      singleVideo: 600,
      series3Videos: 1500,
    },
    responseTime: 'FAST',
    avgResponseHours: 4,
    availability: 'HIGH',
    pastCampaigns: 8,
    avgROI: 5.2,
    specialties: ['trend hijacking', 'viral content', 'humor'],
    languages: ['Dutch', 'English'],
    contractStatus: 'ACTIVE',
    notes: 'Best for rapid trend response, can turn content in 6 hours',
  },
  {
    id: 'INF-021',
    handle: '@gym.recipes.de',
    name: 'Sophie Braun',
    platform: 'tiktok',
    tier: 'MICRO',
    followers: 34000,
    engagement: 0.095,
    location: {
      city: 'Cologne',
      country: 'Germany',
      region: 'DACH',
    },
    categories: ['recipes', 'protein', 'anabolic-cooking'],
    audienceProfile: {
      ageRange: '20-35',
      gender: '60% female',
      interests: ['healthy recipes', 'protein cooking', 'fitness'],
    },
    performance: {
      avgViewsPerVideo: 28000,
      avgLikesPerVideo: 2660,
      avgCommentsPerVideo: 220,
      avgSharesPerVideo: 380,
    },
    rates: {
      singleVideo: 350,
      series3Videos: 850,
    },
    responseTime: 'FAST',
    avgResponseHours: 3,
    availability: 'HIGH',
    pastCampaigns: 6,
    avgROI: 4.8,
    specialties: ['protein ice cream', 'anabolic recipes', 'macro-friendly'],
    languages: ['German', 'English'],
    contractStatus: 'ACTIVE',
    notes: 'Specialist for protein ice cream/recipe trends',
  },

  // ==========================================================================
  // ATHLETE/COMPETITOR INFLUENCERS - Event-specific
  // ==========================================================================
  {
    id: 'INF-030',
    handle: '@hyrox_pro_mark',
    name: 'Mark van den Berg',
    platform: 'instagram',
    tier: 'MICRO',
    followers: 28000,
    engagement: 0.058,
    location: {
      city: 'Rotterdam',
      country: 'Netherlands',
      region: 'BENELUX',
    },
    categories: ['hyrox', 'athlete', 'competition'],
    audienceProfile: {
      ageRange: '25-40',
      gender: '55% male',
      interests: ['Hyrox', 'competition', 'elite fitness'],
    },
    performance: {
      avgLikesPerPost: 1624,
      avgCommentsPerPost: 95,
      avgSavesPerPost: 180,
      clickThroughRate: 0.036,
      conversionRate: 0.025,
    },
    rates: {
      singlePost: 350,
      story: 110,
      reel: 550,
      eventDayCoverage: 800,
    },
    responseTime: 'FAST',
    avgResponseHours: 5,
    availability: 'MEDIUM',
    pastCampaigns: 9,
    avgROI: 4.6,
    specialties: ['race content', 'prep protocols', 'event coverage'],
    languages: ['Dutch', 'English'],
    contractStatus: 'ACTIVE',
    competingAt: ['Hyrox Cologne', 'Hyrox Amsterdam'],
    notes: 'Active Hyrox competitor, great for event-day content',
  },
];

// Helper functions
export function getInfluencersByTier(tier) {
  return influencers.filter(i => i.tier === tier);
}

export function getInfluencersByCategory(category) {
  return influencers.filter(i => i.categories.includes(category));
}

export function getInfluencersByRegion(region) {
  return influencers.filter(i => i.location.region === region);
}

export function getInfluencersByPlatform(platform) {
  return influencers.filter(i => i.platform === platform);
}

export function getFastResponseInfluencers() {
  return influencers.filter(i => i.responseTime === 'FAST' && i.availability === 'HIGH');
}

export function getInfluencersForEvent(eventTags) {
  return influencers.filter(i => 
    i.categories.some(cat => eventTags.includes(cat)) ||
    i.competingAt?.some(event => eventTags.includes(event))
  );
}

export function calculateCampaignCost(selectedInfluencers, contentType = 'singlePost') {
  return selectedInfluencers.reduce((total, inf) => {
    return total + (inf.rates[contentType] || 0);
  }, 0);
}

export function estimateCampaignReach(selectedInfluencers) {
  return selectedInfluencers.reduce((total, inf) => {
    return total + inf.followers;
  }, 0);
}

export default influencers;
