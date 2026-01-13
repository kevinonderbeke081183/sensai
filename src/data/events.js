// =============================================================================
// EVENTS DATABASE - Benelux/DACH Focus
// =============================================================================
// Categories: Fitness Competitions, Seasonal Moments, Local/Regional, Fitness Industry
// 
// REMINDER FOR LATER: Replace with real event APIs:
// - Eventbrite API: https://www.eventbrite.com/platform/api
// - Ticketmaster API: https://developer.ticketmaster.com/
// - Sports Calendar APIs for competitions
// =============================================================================

export const events = [
  // ==========================================================================
  // FITNESS COMPETITIONS - High impact, predictable, athlete-focused
  // ==========================================================================
  {
    id: 'EVT-001',
    name: 'Hyrox Cologne',
    category: 'FITNESS_COMPETITION',
    subcategory: 'Hyrox',
    date: '2026-01-18',
    endDate: '2026-01-18',
    daysUntil: 8,
    location: {
      city: 'Cologne',
      country: 'Germany',
      region: 'DACH',
      venue: 'LANXESS Arena',
    },
    size: {
      participants: 5000,
      spectators: 8000,
      total: 13000,
    },
    audienceProfile: {
      athleteLevel: 'INTERMEDIATE_ADVANCED',
      ageRange: '25-45',
      gender: '55% male, 45% female',
      interests: ['functional fitness', 'endurance', 'CrossFit'],
    },
    impactScores: {
      preWorkout: 1.80,      // +180%
      protein: 0.80,         // +80%
      creatine: 1.20,        // +120%
      energyDrink: 1.00,     // +100%
      rtdShake: 0.60,        // +60%
      proteinBar: 0.40,      // +40%
    },
    leadTimeDays: 14,        // How far in advance to start campaign
    peakDemandWindow: {
      start: -3,             // 3 days before event
      end: 0,                // Day of event
    },
    confidence: 0.92,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['hyrox', 'functional-fitness', 'endurance', 'competition'],
    notes: 'Major Hyrox event, high conversion potential for pre-workout and creatine',
  },
  {
    id: 'EVT-002',
    name: 'CrossFit German Throwdown',
    category: 'FITNESS_COMPETITION',
    subcategory: 'CrossFit',
    date: '2026-02-08',
    endDate: '2026-02-09',
    daysUntil: 29,
    location: {
      city: 'Berlin',
      country: 'Germany',
      region: 'DACH',
      venue: 'Velodrom',
    },
    size: {
      participants: 3000,
      spectators: 5000,
      total: 8000,
    },
    audienceProfile: {
      athleteLevel: 'ADVANCED',
      ageRange: '22-40',
      gender: '50% male, 50% female',
      interests: ['CrossFit', 'weightlifting', 'gymnastics'],
    },
    impactScores: {
      preWorkout: 1.60,
      protein: 1.00,
      creatine: 1.40,
      energyDrink: 0.80,
      rtdShake: 0.50,
      proteinBar: 0.60,
    },
    leadTimeDays: 21,
    peakDemandWindow: { start: -5, end: 1 },
    confidence: 0.88,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['crossfit', 'competition', 'elite'],
  },
  {
    id: 'EVT-003',
    name: 'Rotterdam Marathon',
    category: 'FITNESS_COMPETITION',
    subcategory: 'Running',
    date: '2026-04-12',
    endDate: '2026-04-12',
    daysUntil: 92,
    location: {
      city: 'Rotterdam',
      country: 'Netherlands',
      region: 'BENELUX',
      venue: 'Coolsingel',
    },
    size: {
      participants: 18000,
      spectators: 100000,
      total: 118000,
    },
    audienceProfile: {
      athleteLevel: 'ALL_LEVELS',
      ageRange: '25-55',
      gender: '60% male, 40% female',
      interests: ['running', 'endurance', 'cardio'],
    },
    impactScores: {
      preWorkout: 0.40,
      protein: 0.40,
      creatine: 0.10,
      energyDrink: 1.60,
      rtdShake: 1.20,
      proteinBar: 1.00,
    },
    leadTimeDays: 30,
    peakDemandWindow: { start: -7, end: 0 },
    confidence: 0.95,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['marathon', 'running', 'endurance'],
  },
  {
    id: 'EVT-004',
    name: 'Amsterdam Half Marathon',
    category: 'FITNESS_COMPETITION',
    subcategory: 'Running',
    date: '2026-03-15',
    endDate: '2026-03-15',
    daysUntil: 64,
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'BENELUX',
      venue: 'Olympic Stadium',
    },
    size: {
      participants: 12000,
      spectators: 30000,
      total: 42000,
    },
    audienceProfile: {
      athleteLevel: 'BEGINNER_INTERMEDIATE',
      ageRange: '25-50',
      gender: '55% male, 45% female',
      interests: ['running', 'fitness'],
    },
    impactScores: {
      preWorkout: 0.30,
      protein: 0.30,
      creatine: 0.05,
      energyDrink: 1.40,
      rtdShake: 1.00,
      proteinBar: 0.80,
    },
    leadTimeDays: 21,
    peakDemandWindow: { start: -5, end: 0 },
    confidence: 0.90,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['half-marathon', 'running'],
  },
  {
    id: 'EVT-005',
    name: 'Belgian Bodybuilding Championship',
    category: 'FITNESS_COMPETITION',
    subcategory: 'Bodybuilding',
    date: '2026-03-28',
    endDate: '2026-03-29',
    daysUntil: 77,
    location: {
      city: 'Antwerp',
      country: 'Belgium',
      region: 'BENELUX',
      venue: 'Sportpaleis',
    },
    size: {
      participants: 400,
      spectators: 4000,
      total: 4400,
    },
    audienceProfile: {
      athleteLevel: 'ADVANCED',
      ageRange: '22-45',
      gender: '75% male, 25% female',
      interests: ['bodybuilding', 'physique', 'nutrition'],
    },
    impactScores: {
      preWorkout: 1.20,
      protein: 1.80,
      creatine: 1.00,
      energyDrink: 0.40,
      rtdShake: 0.80,
      proteinBar: 0.60,
    },
    leadTimeDays: 30,
    peakDemandWindow: { start: -14, end: 0 },
    confidence: 0.85,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['bodybuilding', 'physique', 'competition'],
  },

  // ==========================================================================
  // SEASONAL MOMENTS - Predictable, broad audience
  // ==========================================================================
  {
    id: 'EVT-010',
    name: 'New Year Resolution Season',
    category: 'SEASONAL_MOMENT',
    subcategory: 'NewYear',
    date: '2026-01-01',
    endDate: '2026-01-31',
    daysUntil: -9, // Already started
    location: {
      city: 'All',
      country: 'All',
      region: 'BENELUX_DACH',
      venue: 'N/A',
    },
    size: {
      participants: 0,
      spectators: 0,
      total: 5000000, // Market reach
    },
    audienceProfile: {
      athleteLevel: 'BEGINNER',
      ageRange: '25-55',
      gender: '50% male, 50% female',
      interests: ['weight loss', 'fitness start', 'health'],
    },
    impactScores: {
      preWorkout: 0.60,
      protein: 1.20,
      creatine: 0.40,
      energyDrink: 0.40,
      rtdShake: 1.40,
      proteinBar: 1.20,
    },
    leadTimeDays: 7,
    peakDemandWindow: { start: 0, end: 21 },
    confidence: 0.95,
    status: 'ACTIVE',
    source: 'manual',
    tags: ['new-year', 'resolutions', 'beginners'],
    notes: 'Peak gym signup period, focus on easy-entry products like RTD and bars',
  },
  {
    id: 'EVT-011',
    name: 'Summer Body Season',
    category: 'SEASONAL_MOMENT',
    subcategory: 'Summer',
    date: '2026-04-01',
    endDate: '2026-06-30',
    daysUntil: 81,
    location: {
      city: 'All',
      country: 'All',
      region: 'BENELUX_DACH',
      venue: 'N/A',
    },
    size: {
      participants: 0,
      spectators: 0,
      total: 8000000,
    },
    audienceProfile: {
      athleteLevel: 'ALL_LEVELS',
      ageRange: '18-45',
      gender: '45% male, 55% female',
      interests: ['weight loss', 'toning', 'beach body'],
    },
    impactScores: {
      preWorkout: 0.80,
      protein: 1.00,
      creatine: 0.60,
      energyDrink: 0.60,
      rtdShake: 1.20,
      proteinBar: 0.80,
    },
    leadTimeDays: 30,
    peakDemandWindow: { start: 0, end: 60 },
    confidence: 0.90,
    status: 'UPCOMING',
    source: 'manual',
    tags: ['summer', 'beach-body', 'weight-loss'],
  },
  {
    id: 'EVT-012',
    name: 'Back to Routine (September)',
    category: 'SEASONAL_MOMENT',
    subcategory: 'BackToRoutine',
    date: '2026-09-01',
    endDate: '2026-09-30',
    daysUntil: 234,
    location: {
      city: 'All',
      country: 'All',
      region: 'BENELUX_DACH',
      venue: 'N/A',
    },
    size: {
      participants: 0,
      spectators: 0,
      total: 6000000,
    },
    audienceProfile: {
      athleteLevel: 'ALL_LEVELS',
      ageRange: '25-50',
      gender: '50% male, 50% female',
      interests: ['routine', 'consistency', 'work-life balance'],
    },
    impactScores: {
      preWorkout: 0.80,
      protein: 0.80,
      creatine: 0.60,
      energyDrink: 1.00,
      rtdShake: 1.40,
      proteinBar: 1.20,
    },
    leadTimeDays: 14,
    peakDemandWindow: { start: 0, end: 30 },
    confidence: 0.88,
    status: 'FUTURE',
    source: 'manual',
    tags: ['back-to-routine', 'september', 'office'],
  },

  // ==========================================================================
  // LOCAL/REGIONAL - Smaller but highly targeted
  // ==========================================================================
  {
    id: 'EVT-020',
    name: 'CrossFit Box Opening - Amsterdam Noord',
    category: 'LOCAL_REGIONAL',
    subcategory: 'GymOpening',
    date: '2026-01-25',
    endDate: '2026-01-25',
    daysUntil: 15,
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'BENELUX',
      venue: 'CrossFit NoordWest',
    },
    size: {
      participants: 200,
      spectators: 100,
      total: 300,
    },
    audienceProfile: {
      athleteLevel: 'BEGINNER_INTERMEDIATE',
      ageRange: '25-40',
      gender: '50% male, 50% female',
      interests: ['CrossFit', 'community', 'local'],
    },
    impactScores: {
      preWorkout: 1.40,
      protein: 1.00,
      creatine: 0.80,
      energyDrink: 0.60,
      rtdShake: 0.80,
      proteinBar: 0.60,
    },
    leadTimeDays: 7,
    peakDemandWindow: { start: -3, end: 7 },
    confidence: 0.75,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['gym-opening', 'local', 'amsterdam'],
    notes: 'Partner with box for sampling opportunity',
  },
  {
    id: 'EVT-021',
    name: 'Brussels Urban Trail',
    category: 'LOCAL_REGIONAL',
    subcategory: 'LocalRace',
    date: '2026-02-22',
    endDate: '2026-02-22',
    daysUntil: 43,
    location: {
      city: 'Brussels',
      country: 'Belgium',
      region: 'BENELUX',
      venue: 'City Center',
    },
    size: {
      participants: 3500,
      spectators: 5000,
      total: 8500,
    },
    audienceProfile: {
      athleteLevel: 'INTERMEDIATE',
      ageRange: '28-50',
      gender: '55% male, 45% female',
      interests: ['trail running', 'urban fitness'],
    },
    impactScores: {
      preWorkout: 0.40,
      protein: 0.30,
      creatine: 0.10,
      energyDrink: 1.20,
      rtdShake: 0.80,
      proteinBar: 1.00,
    },
    leadTimeDays: 14,
    peakDemandWindow: { start: -5, end: 0 },
    confidence: 0.80,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['trail', 'running', 'brussels'],
  },
  {
    id: 'EVT-022',
    name: 'Munich Fitness Weekend',
    category: 'LOCAL_REGIONAL',
    subcategory: 'FitnessExpo',
    date: '2026-03-07',
    endDate: '2026-03-08',
    daysUntil: 56,
    location: {
      city: 'Munich',
      country: 'Germany',
      region: 'DACH',
      venue: 'Olympiapark',
    },
    size: {
      participants: 5000,
      spectators: 15000,
      total: 20000,
    },
    audienceProfile: {
      athleteLevel: 'ALL_LEVELS',
      ageRange: '20-45',
      gender: '50% male, 50% female',
      interests: ['fitness', 'wellness', 'lifestyle'],
    },
    impactScores: {
      preWorkout: 1.00,
      protein: 1.00,
      creatine: 0.80,
      energyDrink: 0.80,
      rtdShake: 1.00,
      proteinBar: 1.00,
    },
    leadTimeDays: 14,
    peakDemandWindow: { start: -3, end: 1 },
    confidence: 0.82,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['fitness-expo', 'munich', 'consumer'],
  },

  // ==========================================================================
  // FITNESS INDUSTRY - B2B focused but high influence
  // ==========================================================================
  {
    id: 'EVT-030',
    name: 'FIBO Cologne 2026',
    category: 'FITNESS_INDUSTRY',
    subcategory: 'TradeShow',
    date: '2026-04-02',
    endDate: '2026-04-05',
    daysUntil: 82,
    location: {
      city: 'Cologne',
      country: 'Germany',
      region: 'DACH',
      venue: 'Koelnmesse',
    },
    size: {
      participants: 1100, // Exhibitors
      spectators: 145000, // Visitors
      total: 146100,
    },
    audienceProfile: {
      athleteLevel: 'ALL_LEVELS',
      ageRange: '20-55',
      gender: '55% male, 45% female',
      interests: ['fitness industry', 'trends', 'networking'],
    },
    impactScores: {
      preWorkout: 1.40,
      protein: 1.40,
      creatine: 1.20,
      energyDrink: 1.00,
      rtdShake: 1.20,
      proteinBar: 1.00,
    },
    leadTimeDays: 30,
    peakDemandWindow: { start: -7, end: 7 },
    confidence: 0.95,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['fibo', 'trade-show', 'b2b', 'industry'],
    notes: 'Largest fitness trade show in Europe, major product launch opportunity',
  },
  {
    id: 'EVT-031',
    name: 'European Health & Fitness Forum',
    category: 'FITNESS_INDUSTRY',
    subcategory: 'Conference',
    date: '2026-05-14',
    endDate: '2026-05-15',
    daysUntil: 124,
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      region: 'BENELUX',
      venue: 'RAI Amsterdam',
    },
    size: {
      participants: 800,
      spectators: 2000,
      total: 2800,
    },
    audienceProfile: {
      athleteLevel: 'PROFESSIONAL',
      ageRange: '30-55',
      gender: '60% male, 40% female',
      interests: ['fitness business', 'trends', 'investment'],
    },
    impactScores: {
      preWorkout: 0.60,
      protein: 0.80,
      creatine: 0.40,
      energyDrink: 0.40,
      rtdShake: 0.60,
      proteinBar: 0.40,
    },
    leadTimeDays: 21,
    peakDemandWindow: { start: -3, end: 1 },
    confidence: 0.78,
    status: 'CONFIRMED',
    source: 'manual',
    tags: ['conference', 'b2b', 'industry'],
  },
];

// Helper function to calculate days until event
export function calculateDaysUntil(dateString) {
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Get events sorted by date
export function getUpcomingEvents(daysAhead = 90) {
  const today = new Date();
  return events
    .filter(e => {
      const eventDate = new Date(e.date);
      const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      return daysUntil >= -7 && daysUntil <= daysAhead; // Include recently passed events
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Get events by category
export function getEventsByCategory(category) {
  return events.filter(e => e.category === category);
}

export default events;
