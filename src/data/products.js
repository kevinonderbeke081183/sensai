// =============================================================================
// FITFUEL PRODUCTS DATABASE
// =============================================================================
// Fictional sports nutrition brand for demo purposes
// Products aligned with sports nutrition/energy drink market
// =============================================================================

export const products = [
  // ==========================================================================
  // PROTEIN POWDERS
  // ==========================================================================
  {
    id: 'PROD-001',
    sku: 'FF-WHEY-VAN-1KG',
    name: 'FitFuel Whey Isolate Vanilla',
    shortName: 'Whey Vanilla 1kg',
    category: 'protein',
    subcategory: 'whey-isolate',
    description: '90% protein, low lactose, premium vanilla flavor',
    specs: {
      size: '1kg',
      servings: 33,
      proteinPerServing: 27,
      calories: 110,
    },
    pricing: {
      costPrice: 18.50,
      wholesalePrice: 24.00,
      retailPrice: 34.99,
      margin: 0.47,
    },
    inventory: {
      totalOnHand: 4200,
      locations: {
        'DC-Rotterdam': 2400,
        'DC-Dusseldorf': 1800,
      },
      daysOfSupply: 42,
      avgDailyDemand: 100,
      reorderPoint: 800,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 540,
    shelfLifeRemaining: 380,
    seasonality: {
      jan: 1.3, feb: 1.2, mar: 1.1, apr: 1.0, may: 0.9, jun: 0.8,
      jul: 0.7, aug: 0.8, sep: 1.2, oct: 1.1, nov: 1.0, dec: 0.9,
    },
    trendRelevance: {
      recipes: 0.95,      // Great for protein ice cream
      challenges: 0.85,   // Popular in fitness challenges
      convenience: 0.60,  // Requires preparation
    },
    tags: ['bestseller', 'recipe-friendly', 'low-lactose'],
  },
  {
    id: 'PROD-002',
    sku: 'FF-WHEY-CHOC-1KG',
    name: 'FitFuel Whey Isolate Chocolate',
    shortName: 'Whey Chocolate 1kg',
    category: 'protein',
    subcategory: 'whey-isolate',
    description: '90% protein, rich chocolate flavor',
    specs: {
      size: '1kg',
      servings: 33,
      proteinPerServing: 27,
      calories: 112,
    },
    pricing: {
      costPrice: 18.50,
      wholesalePrice: 24.00,
      retailPrice: 34.99,
      margin: 0.47,
    },
    inventory: {
      totalOnHand: 3800,
      locations: {
        'DC-Rotterdam': 2200,
        'DC-Dusseldorf': 1600,
      },
      daysOfSupply: 38,
      avgDailyDemand: 100,
      reorderPoint: 800,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 540,
    shelfLifeRemaining: 420,
    seasonality: {
      jan: 1.3, feb: 1.2, mar: 1.1, apr: 1.0, may: 0.9, jun: 0.8,
      jul: 0.7, aug: 0.8, sep: 1.2, oct: 1.1, nov: 1.0, dec: 0.9,
    },
    trendRelevance: {
      recipes: 0.90,
      challenges: 0.85,
      convenience: 0.60,
    },
    tags: ['bestseller', 'recipe-friendly'],
  },
  {
    id: 'PROD-003',
    sku: 'FF-CASEIN-VAN-1KG',
    name: 'FitFuel Casein Vanilla',
    shortName: 'Casein Vanilla 1kg',
    category: 'protein',
    subcategory: 'casein',
    description: 'Slow-release protein, perfect for recipes and before bed',
    specs: {
      size: '1kg',
      servings: 33,
      proteinPerServing: 24,
      calories: 105,
    },
    pricing: {
      costPrice: 21.00,
      wholesalePrice: 27.00,
      retailPrice: 39.99,
      margin: 0.47,
    },
    inventory: {
      totalOnHand: 1800,
      locations: {
        'DC-Rotterdam': 1000,
        'DC-Dusseldorf': 800,
      },
      daysOfSupply: 45,
      avgDailyDemand: 40,
      reorderPoint: 400,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 540,
    shelfLifeRemaining: 400,
    seasonality: {
      jan: 1.1, feb: 1.0, mar: 1.0, apr: 1.0, may: 1.0, jun: 1.0,
      jul: 1.0, aug: 1.0, sep: 1.0, oct: 1.0, nov: 1.0, dec: 1.0,
    },
    trendRelevance: {
      recipes: 0.98,      // THE ice cream protein
      challenges: 0.70,
      convenience: 0.50,
    },
    tags: ['recipe-star', 'ice-cream', 'slow-release'],
  },

  // ==========================================================================
  // PRE-WORKOUT
  // ==========================================================================
  {
    id: 'PROD-010',
    sku: 'FF-PRE-IGNITE-300G',
    name: 'FitFuel IGNITE Pre-Workout',
    shortName: 'IGNITE 300g',
    category: 'preWorkout',
    subcategory: 'high-stim',
    description: '300mg caffeine, beta-alanine, citrulline, explosive energy',
    specs: {
      size: '300g',
      servings: 30,
      caffeinePerServing: 300,
      calories: 5,
    },
    pricing: {
      costPrice: 14.00,
      wholesalePrice: 19.00,
      retailPrice: 29.99,
      margin: 0.53,
    },
    inventory: {
      totalOnHand: 2800,
      locations: {
        'DC-Rotterdam': 1500,
        'DC-Dusseldorf': 1300,
      },
      daysOfSupply: 35,
      avgDailyDemand: 80,
      reorderPoint: 600,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 720,
    shelfLifeRemaining: 550,
    seasonality: {
      jan: 1.4, feb: 1.2, mar: 1.1, apr: 1.0, may: 0.9, jun: 0.8,
      jul: 0.8, aug: 0.9, sep: 1.3, oct: 1.1, nov: 1.0, dec: 0.9,
    },
    trendRelevance: {
      competitions: 0.95,
      challenges: 0.90,
      morningRoutine: 0.80,
    },
    tags: ['high-stim', 'competition', 'intense'],
  },
  {
    id: 'PROD-011',
    sku: 'FF-PRE-FLOW-300G',
    name: 'FitFuel FLOW Pre-Workout',
    shortName: 'FLOW 300g',
    category: 'preWorkout',
    subcategory: 'low-stim',
    description: '100mg caffeine, focus blend, smooth energy without jitters',
    specs: {
      size: '300g',
      servings: 30,
      caffeinePerServing: 100,
      calories: 5,
    },
    pricing: {
      costPrice: 12.00,
      wholesalePrice: 17.00,
      retailPrice: 27.99,
      margin: 0.57,
    },
    inventory: {
      totalOnHand: 1200,
      locations: {
        'DC-Rotterdam': 700,
        'DC-Dusseldorf': 500,
      },
      daysOfSupply: 30,
      avgDailyDemand: 40,
      reorderPoint: 300,
      leadTimeDays: 14,
    },
    betQuality: 'NEUTRAL',
    shelfLifeDays: 720,
    shelfLifeRemaining: 600,
    seasonality: {
      jan: 1.2, feb: 1.1, mar: 1.0, apr: 1.0, may: 1.0, jun: 1.0,
      jul: 1.0, aug: 1.0, sep: 1.1, oct: 1.0, nov: 1.0, dec: 1.0,
    },
    trendRelevance: {
      competitions: 0.60,
      challenges: 0.75,
      morningRoutine: 0.85,
      cozyCardio: 0.70,
    },
    tags: ['low-stim', 'focus', 'beginner-friendly'],
  },

  // ==========================================================================
  // CREATINE
  // ==========================================================================
  {
    id: 'PROD-020',
    sku: 'FF-CREAT-MONO-500G',
    name: 'FitFuel Creatine Monohydrate',
    shortName: 'Creatine 500g',
    category: 'creatine',
    subcategory: 'monohydrate',
    description: 'Pure micronized creatine monohydrate, 5g serving',
    specs: {
      size: '500g',
      servings: 100,
      creatinePerServing: 5,
      calories: 0,
    },
    pricing: {
      costPrice: 8.00,
      wholesalePrice: 12.00,
      retailPrice: 19.99,
      margin: 0.60,
    },
    inventory: {
      totalOnHand: 3200,
      locations: {
        'DC-Rotterdam': 1800,
        'DC-Dusseldorf': 1400,
      },
      daysOfSupply: 40,
      avgDailyDemand: 80,
      reorderPoint: 600,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 1080,
    shelfLifeRemaining: 900,
    seasonality: {
      jan: 1.3, feb: 1.2, mar: 1.1, apr: 1.0, may: 0.9, jun: 0.8,
      jul: 0.8, aug: 0.9, sep: 1.2, oct: 1.1, nov: 1.0, dec: 0.9,
    },
    trendRelevance: {
      competitions: 0.95,
      cognitiveHealth: 0.90,  // New angle from health news!
      challenges: 0.85,
    },
    tags: ['staple', 'research-backed', 'cognitive'],
  },

  // ==========================================================================
  // RTD SHAKES (Ready-to-Drink)
  // ==========================================================================
  {
    id: 'PROD-030',
    sku: 'FF-RTD-CHOC-330ML',
    name: 'FitFuel RTD Protein Shake Chocolate',
    shortName: 'RTD Chocolate 330ml',
    category: 'rtdShake',
    subcategory: 'rtd-protein',
    description: 'Ready-to-drink protein shake, 25g protein, grab and go',
    specs: {
      size: '330ml',
      servings: 1,
      proteinPerServing: 25,
      calories: 160,
    },
    pricing: {
      costPrice: 1.50,
      wholesalePrice: 2.20,
      retailPrice: 3.49,
      margin: 0.57,
    },
    inventory: {
      totalOnHand: 18000,
      locations: {
        'DC-Rotterdam': 10000,
        'DC-Dusseldorf': 8000,
      },
      daysOfSupply: 65,  // EXCESS!
      avgDailyDemand: 280,
      reorderPoint: 3000,
      leadTimeDays: 21,
    },
    betQuality: 'BAD',  // Excess inventory, short shelf life
    shelfLifeDays: 180,
    shelfLifeRemaining: 62,  // CRITICAL - needs liquidation!
    seasonality: {
      jan: 1.2, feb: 1.1, mar: 1.0, apr: 1.0, may: 1.1, jun: 1.2,
      jul: 1.3, aug: 1.2, sep: 1.0, oct: 0.9, nov: 0.9, dec: 0.8,
    },
    trendRelevance: {
      convenience: 0.95,
      morningRoutine: 0.90,
      challenges: 0.80,
      office: 0.85,
    },
    tags: ['convenience', 'on-the-go', 'liquidation-candidate'],
    alerts: ['EXPIRING_SOON', 'EXCESS_STOCK'],
  },
  {
    id: 'PROD-031',
    sku: 'FF-RTD-VAN-330ML',
    name: 'FitFuel RTD Protein Shake Vanilla',
    shortName: 'RTD Vanilla 330ml',
    category: 'rtdShake',
    subcategory: 'rtd-protein',
    description: 'Ready-to-drink protein shake, 25g protein, smooth vanilla',
    specs: {
      size: '330ml',
      servings: 1,
      proteinPerServing: 25,
      calories: 155,
    },
    pricing: {
      costPrice: 1.50,
      wholesalePrice: 2.20,
      retailPrice: 3.49,
      margin: 0.57,
    },
    inventory: {
      totalOnHand: 8500,
      locations: {
        'DC-Rotterdam': 5000,
        'DC-Dusseldorf': 3500,
      },
      daysOfSupply: 42,
      avgDailyDemand: 200,
      reorderPoint: 2500,
      leadTimeDays: 21,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 180,
    shelfLifeRemaining: 120,
    seasonality: {
      jan: 1.2, feb: 1.1, mar: 1.0, apr: 1.0, may: 1.1, jun: 1.2,
      jul: 1.3, aug: 1.2, sep: 1.0, oct: 0.9, nov: 0.9, dec: 0.8,
    },
    trendRelevance: {
      convenience: 0.95,
      morningRoutine: 0.90,
      challenges: 0.80,
    },
    tags: ['convenience', 'on-the-go'],
  },

  // ==========================================================================
  // PROTEIN BARS
  // ==========================================================================
  {
    id: 'PROD-040',
    sku: 'FF-BAR-COOKIE-12PK',
    name: 'FitFuel Protein Bar Cookies & Cream (12 pack)',
    shortName: 'Bar Cookies 12pk',
    category: 'proteinBar',
    subcategory: 'protein-bar',
    description: '20g protein bar, delicious cookies & cream flavor',
    specs: {
      size: '12 x 60g',
      servings: 12,
      proteinPerServing: 20,
      calories: 210,
    },
    pricing: {
      costPrice: 12.00,
      wholesalePrice: 18.00,
      retailPrice: 29.99,
      margin: 0.60,
    },
    inventory: {
      totalOnHand: 2400,
      locations: {
        'DC-Rotterdam': 1400,
        'DC-Dusseldorf': 1000,
      },
      daysOfSupply: 48,
      avgDailyDemand: 50,
      reorderPoint: 400,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 270,
    shelfLifeRemaining: 180,
    seasonality: {
      jan: 1.3, feb: 1.1, mar: 1.0, apr: 1.0, may: 1.0, jun: 0.9,
      jul: 0.8, aug: 0.9, sep: 1.2, oct: 1.1, nov: 1.0, dec: 1.0,
    },
    trendRelevance: {
      convenience: 0.90,
      challenges: 0.85,
      office: 0.80,
    },
    tags: ['snacking', 'convenience', 'bestseller'],
  },

  // ==========================================================================
  // ENERGY DRINKS
  // ==========================================================================
  {
    id: 'PROD-050',
    sku: 'FF-ENERGY-CITRUS-250ML',
    name: 'FitFuel Energy Citrus Blast',
    shortName: 'Energy Citrus 250ml',
    category: 'energyDrink',
    subcategory: 'energy-drink',
    description: 'Performance energy drink, 150mg caffeine, B-vitamins, zero sugar',
    specs: {
      size: '250ml',
      servings: 1,
      caffeinePerServing: 150,
      calories: 10,
    },
    pricing: {
      costPrice: 0.80,
      wholesalePrice: 1.40,
      retailPrice: 2.49,
      margin: 0.68,
    },
    inventory: {
      totalOnHand: 24000,
      locations: {
        'DC-Rotterdam': 14000,
        'DC-Dusseldorf': 10000,
      },
      daysOfSupply: 40,
      avgDailyDemand: 600,
      reorderPoint: 6000,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 365,
    shelfLifeRemaining: 280,
    seasonality: {
      jan: 1.0, feb: 1.0, mar: 1.0, apr: 1.1, may: 1.2, jun: 1.3,
      jul: 1.4, aug: 1.3, sep: 1.1, oct: 1.0, nov: 0.9, dec: 0.9,
    },
    trendRelevance: {
      competitions: 0.85,
      events: 0.90,
      morningRoutine: 0.70,
    },
    tags: ['energy', 'zero-sugar', 'performance'],
  },
  {
    id: 'PROD-051',
    sku: 'FF-ENERGY-BERRY-250ML',
    name: 'FitFuel Energy Berry Rush',
    shortName: 'Energy Berry 250ml',
    category: 'energyDrink',
    subcategory: 'energy-drink',
    description: 'Performance energy drink, mixed berry flavor, zero sugar',
    specs: {
      size: '250ml',
      servings: 1,
      caffeinePerServing: 150,
      calories: 10,
    },
    pricing: {
      costPrice: 0.80,
      wholesalePrice: 1.40,
      retailPrice: 2.49,
      margin: 0.68,
    },
    inventory: {
      totalOnHand: 18000,
      locations: {
        'DC-Rotterdam': 10000,
        'DC-Dusseldorf': 8000,
      },
      daysOfSupply: 36,
      avgDailyDemand: 500,
      reorderPoint: 5000,
      leadTimeDays: 14,
    },
    betQuality: 'GOOD',
    shelfLifeDays: 365,
    shelfLifeRemaining: 300,
    seasonality: {
      jan: 1.0, feb: 1.0, mar: 1.0, apr: 1.1, may: 1.2, jun: 1.3,
      jul: 1.4, aug: 1.3, sep: 1.1, oct: 1.0, nov: 0.9, dec: 0.9,
    },
    trendRelevance: {
      competitions: 0.85,
      events: 0.90,
      morningRoutine: 0.70,
    },
    tags: ['energy', 'zero-sugar', 'performance'],
  },
];

// Product category definitions for matching
export const productCategories = {
  protein: {
    name: 'Protein Powder',
    products: ['PROD-001', 'PROD-002', 'PROD-003'],
    avgMargin: 0.47,
  },
  preWorkout: {
    name: 'Pre-Workout',
    products: ['PROD-010', 'PROD-011'],
    avgMargin: 0.55,
  },
  creatine: {
    name: 'Creatine',
    products: ['PROD-020'],
    avgMargin: 0.60,
  },
  rtdShake: {
    name: 'RTD Shakes',
    products: ['PROD-030', 'PROD-031'],
    avgMargin: 0.57,
  },
  proteinBar: {
    name: 'Protein Bars',
    products: ['PROD-040'],
    avgMargin: 0.60,
  },
  energyDrink: {
    name: 'Energy Drinks',
    products: ['PROD-050', 'PROD-051'],
    avgMargin: 0.68,
  },
};

// Helper functions
export function getProductById(id) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

export function getProductsNeedingLiquidation() {
  return products.filter(p => 
    p.betQuality === 'BAD' || 
    p.shelfLifeRemaining < 90 ||
    p.inventory.daysOfSupply > 60
  );
}

export function getProductsByBetQuality(quality) {
  return products.filter(p => p.betQuality === quality);
}

export default products;
