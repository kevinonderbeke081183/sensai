// SensAI - Demand Orchestration Dashboard
// INTERACTIVE DEMO with Live Google Trends + Social Integration
// Location: apps/signal-intelligence/src/App.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  TrendingUp, Calendar, Target, DollarSign, Users, Zap,
  Package, AlertTriangle, CheckCircle, Clock, Instagram,
  Youtube, TrendingDown, MapPin, ExternalLink, Search,
  RefreshCw, Play, Pause, Sparkles, BarChart3, PieChart,
  ArrowUpRight, ArrowDownRight, Loader2, Globe, Hash,
  MessageCircle, Heart, Share2, Bookmark, Filter, ChevronRight,
  Flame, Activity, Radio, Eye, MousePointer, ShoppingCart,
  Layers, Wifi, WifiOff, Database, Cloud, Lightbulb, ArrowLeft, Home
} from 'lucide-react';

// ============================================================
// THEME & DESIGN SYSTEM
// ============================================================

const theme = {
  bg: {
    primary: '#0a0a0f',
    secondary: '#12121a',
    card: 'rgba(255,255,255,0.02)',
    elevated: 'rgba(255,255,255,0.04)',
    glass: 'rgba(255,255,255,0.03)',
  },
  border: {
    default: 'rgba(255,255,255,0.08)',
    hover: 'rgba(255,255,255,0.15)',
    active: 'rgba(255,255,255,0.25)',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
    muted: '#666666'
  },
  accent: {
    blue: '#3b82f6',
    green: '#10b981',
    amber: '#fbbf24',
    red: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899',
    cyan: '#06b6d4',
  },
  gradient: {
    blue: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    fire: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    gold: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    instagram: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  }
};

// ============================================================
// API CONFIGURATION
// ============================================================

// Use relative path to leverage Vite's proxy configuration
// In development, requests to /api will be proxied to localhost:3000
// In production, update this to your actual API URL
const API_BASE_URL = '/api';

// ============================================================
// LIVE API DATA FETCHING
// ============================================================

// Fetch real Google Trends data from backend
const fetchLiveTrends = async (geo = 'BE') => {
  try {
    const response = await fetch(`${API_BASE_URL}/trends/quick-scan?geo=${geo}`);
    if (!response.ok) throw new Error('Failed to fetch trends');
    const result = await response.json();

    if (result.success && result.data?.trends) {
      return result.data.trends.map((t, i) => ({
        id: i + 1,
        keyword: t.trend.term,
        volume: t.trend.currentInterest * 1000, // Scale for display
        change: t.trend.changePercent,
        trend: t.trend.changePercent > 50 ? 'SURGING' : t.trend.changePercent > 20 ? 'RISING' : t.trend.changePercent > -10 ? 'STABLE' : 'FALLING',
        sparkline: t.trend.interestOverTime.slice(-7).map(v => v || 50),
        products: t.matchedSkus.slice(0, 3),
        category: t.matchedCategories[0] || 'General',
        inventoryMatch: t.suggestedAction === 'AMPLIFY' ? 'GOOD' : t.suggestedAction === 'MONITOR' ? 'NEUTRAL' : 'WATCH',
        opportunity: t.urgency,
        emoji: getEmojiForKeyword(t.trend.term),
        hashtags: [`#${t.trend.term.replace(/\s+/g, '')}`, '#fitfuel', '#supplements'],
        regions: {
          DE: Math.floor(t.trend.currentInterest * 400),
          NL: Math.floor(t.trend.currentInterest * 250),
          BE: Math.floor(t.trend.currentInterest * 200),
          AT: Math.floor(t.trend.currentInterest * 150),
        },
        lastUpdated: result.data.scannedAt,
        isLive: true,
      }));
    }
    throw new Error('Invalid response format');
  } catch (error) {
    console.warn('Live API unavailable, using simulated data:', error.message);
    return null; // Return null to trigger fallback
  }
};

// Fetch interest over time for a specific keyword
const fetchKeywordDetails = async (keyword, geo = 'BE') => {
  try {
    const [interestRes, relatedRes] = await Promise.all([
      fetch(`${API_BASE_URL}/trends/interest/${encodeURIComponent(keyword)}?geo=${geo}`),
      fetch(`${API_BASE_URL}/trends/related-queries/${encodeURIComponent(keyword)}?geo=${geo}`)
    ]);

    const interestData = await interestRes.json();
    const relatedData = await relatedRes.json();

    return {
      timeline: interestData.data?.timelineData || [],
      relatedQueries: relatedData.data?.rising || [],
      topQueries: relatedData.data?.top || [],
    };
  } catch (error) {
    console.warn('Failed to fetch keyword details:', error);
    return null;
  }
};

// Helper to get emoji for keyword
const getEmojiForKeyword = (keyword) => {
  const emojiMap = {
    'protein': '💪',
    'ice cream': '🍦',
    'coffee': '☕',
    'pre workout': '⚡',
    'creatine': '🔋',
    'hyrox': '🏋️',
    'crossfit': '🏆',
    'marathon': '🏃',
    'energy': '⚡',
    'recovery': '🔄',
    'bcaa': '💊',
    'bar': '🍫',
  };

  const lowerKeyword = keyword.toLowerCase();
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lowerKeyword.includes(key)) return emoji;
  }
  return '📊';
};

// ============================================================
// SIMULATED DATA (FALLBACK)
// ============================================================

// Simulated Google Trends data with realistic patterns
const generateTrendData = () => {
  const keywords = [
    {
      keyword: 'protein ice cream',
      baseVolume: 24500,
      category: 'Recipes',
      products: ['Casein Powder', 'Whey Isolate'],
      emoji: '🍦',
      hashtags: ['#proteinicecream', '#healthydessert', '#gains']
    },
    {
      keyword: 'hyrox training',
      baseVolume: 18200,
      category: 'Fitness',
      products: ['Pre-Workout', 'Creatine', 'Energy Gel'],
      emoji: '🏋️',
      hashtags: ['#hyrox', '#functionalfitness', '#hyroxtraining']
    },
    {
      keyword: 'pre workout',
      baseVolume: 45000,
      category: 'Supplements',
      products: ['Pre-Workout Explosive'],
      emoji: '⚡',
      hashtags: ['#preworkout', '#gymlife', '#fitness']
    },
    {
      keyword: 'protein coffee',
      baseVolume: 12800,
      category: 'Recipes',
      products: ['Whey Isolate', 'Casein Powder'],
      emoji: '☕',
      hashtags: ['#proffee', '#proteincoffee', '#morninggains']
    },
    {
      keyword: 'creatine benefits',
      baseVolume: 33000,
      category: 'Education',
      products: ['Creatine Monohydrate'],
      emoji: '💪',
      hashtags: ['#creatine', '#supplements', '#musclegrowth']
    },
    {
      keyword: 'high protein snacks',
      baseVolume: 28500,
      category: 'Nutrition',
      products: ['Protein Bar', 'RTD Shake'],
      emoji: '🍫',
      hashtags: ['#proteinsnacks', '#healthysnacking', '#macros']
    },
    {
      keyword: 'marathon nutrition',
      baseVolume: 8900,
      category: 'Endurance',
      products: ['Energy Gel', 'Electrolytes'],
      emoji: '🏃',
      hashtags: ['#marathon', '#runnersfuel', '#endurance']
    },
    {
      keyword: 'muscle recovery',
      baseVolume: 21000,
      category: 'Recovery',
      products: ['BCAA', 'Whey Protein', 'Casein'],
      emoji: '🔄',
      hashtags: ['#recovery', '#musclerecovery', '#postworkout']
    },
  ];

  return keywords.map((k, i) => {
    const changePercent = Math.floor(Math.random() * 180) - 30; // -30% to +150%
    const trend = changePercent > 50 ? 'SURGING' : changePercent > 20 ? 'RISING' : changePercent > -10 ? 'STABLE' : 'FALLING';
    const volume = Math.floor(k.baseVolume * (1 + (Math.random() * 0.3 - 0.15)));

    // Generate sparkline data (last 7 days)
    const sparkline = Array.from({ length: 7 }, (_, j) => {
      const base = 50 + (changePercent > 0 ? j * 5 : -j * 3);
      return Math.max(10, Math.min(100, base + Math.floor(Math.random() * 20 - 10)));
    });

    return {
      id: i + 1,
      ...k,
      volume,
      change: changePercent,
      trend,
      sparkline,
      inventoryMatch: changePercent > 30 ? 'GOOD' : changePercent > 0 ? 'NEUTRAL' : 'WATCH',
      opportunity: changePercent > 50 ? 'High' : changePercent > 20 ? 'Medium' : 'Low',
      regions: {
        DE: Math.floor(volume * 0.4),
        NL: Math.floor(volume * 0.25),
        BE: Math.floor(volume * 0.2),
        AT: Math.floor(volume * 0.15),
      },
      lastUpdated: new Date().toISOString(),
    };
  });
};

// Simulated Instagram/Social posts
const generateSocialPosts = () => {
  const posts = [
    {
      id: 1,
      platform: 'instagram',
      author: '@fitnesschef_anna',
      avatar: 'FA',
      content: 'Just made the most amazing protein ice cream with casein powder! 🍦💪 Only 150 calories and 25g protein. Recipe in bio!',
      image: 'protein-icecream',
      likes: 2847,
      comments: 156,
      shares: 89,
      hashtags: ['#proteinicecream', '#healthydessert', '#fitfood'],
      timestamp: '2h ago',
      engagement: 8.4,
      verified: true,
    },
    {
      id: 2,
      platform: 'instagram',
      author: '@hyrox_germany',
      avatar: 'HG',
      content: '10 DAYS until Hyrox Cologne! 🔥 Who\'s ready? Tag your training partner! Pre-race nutrition is key - check our recommended stack.',
      image: 'hyrox-event',
      likes: 4521,
      comments: 342,
      shares: 267,
      hashtags: ['#hyrox', '#hyroxcologne', '#functionalfitness'],
      timestamp: '4h ago',
      engagement: 12.1,
      verified: true,
    },
    {
      id: 3,
      platform: 'tiktok',
      author: '@gymtok.lars',
      avatar: 'GL',
      content: 'POV: Your pre-workout just kicked in ⚡️ This stuff is INSANE. Link in bio for 20% off!',
      image: 'preworkout-vid',
      likes: 18420,
      comments: 892,
      shares: 2341,
      hashtags: ['#preworkout', '#gymtok', '#gains'],
      timestamp: '6h ago',
      engagement: 15.7,
      verified: false,
    },
    {
      id: 4,
      platform: 'instagram',
      author: '@nutritionist.sophie',
      avatar: 'NS',
      content: 'Morning ritual: protein coffee ☕💪 Blend cold brew with vanilla whey for the perfect proffee. Game changer for busy mornings!',
      image: 'protein-coffee',
      likes: 1923,
      comments: 87,
      shares: 45,
      hashtags: ['#proffee', '#proteincoffee', '#morningroutine'],
      timestamp: '8h ago',
      engagement: 6.2,
      verified: true,
    },
  ];

  return posts.map(p => ({
    ...p,
    likes: p.likes + Math.floor(Math.random() * 100),
    comments: p.comments + Math.floor(Math.random() * 20),
  }));
};

// Events data
const eventsData = [
  {
    id: 1,
    name: 'Hyrox Cologne',
    date: '2026-01-20',
    daysUntil: 10,
    attendees: 2500,
    impact: 'High',
    location: 'Cologne, Germany',
    products: ['Pre-Workout', 'Energy Gel', 'Creatine'],
    demandMultiplier: 1.8,
    icon: '🏋️',
  },
  {
    id: 2,
    name: 'CrossFit Regional',
    date: '2026-01-27',
    daysUntil: 17,
    attendees: 1200,
    impact: 'Medium',
    location: 'Amsterdam, Netherlands',
    products: ['BCAA', 'Whey Protein', 'Creatine'],
    demandMultiplier: 1.4,
    icon: '🏆',
  },
  {
    id: 3,
    name: 'Marathon Rotterdam',
    date: '2026-02-10',
    daysUntil: 31,
    attendees: 8000,
    impact: 'High',
    location: 'Rotterdam, Netherlands',
    products: ['Energy Gel', 'Electrolytes', 'Recovery Shake'],
    demandMultiplier: 1.6,
    icon: '🏃',
  },
  {
    id: 4,
    name: 'FIBO Cologne',
    date: '2026-04-10',
    daysUntil: 90,
    attendees: 150000,
    impact: 'Critical',
    location: 'Cologne, Germany',
    products: ['All Categories'],
    demandMultiplier: 2.2,
    icon: '🎪',
  },
];

// Influencer database
const influencersData = [
  {
    id: 1,
    name: 'Emma van Fitness',
    handle: '@emmavfit',
    platform: 'Instagram',
    followers: 45000,
    engagement: 6.8,
    tier: 'Mid',
    niche: 'Fitness & Wellness',
    location: 'Amsterdam, NL',
    avgCost: 320,
    pastCampaigns: 3,
    avgROI: 4.2,
    status: 'Available',
    specialty: ['Protein', 'Wellness'],
    recentPerformance: [4.1, 4.5, 3.9, 4.2],
  },
  {
    id: 2,
    name: 'Lars Athlete',
    handle: '@larsathlete',
    platform: 'Instagram',
    followers: 28000,
    engagement: 8.2,
    tier: 'Micro',
    niche: 'CrossFit & HIIT',
    location: 'Berlin, DE',
    avgCost: 280,
    pastCampaigns: 5,
    avgROI: 5.1,
    status: 'Available',
    specialty: ['Pre-Workout', 'Creatine'],
    recentPerformance: [5.2, 4.8, 5.4, 5.0],
  },
  {
    id: 3,
    name: 'Sophie Nutrition',
    handle: '@sophienutrition',
    platform: 'Instagram',
    followers: 67000,
    engagement: 5.4,
    tier: 'Mid',
    niche: 'Nutrition & Recipes',
    location: 'Brussels, BE',
    avgCost: 420,
    pastCampaigns: 7,
    avgROI: 3.9,
    status: 'Available',
    specialty: ['Recipes', 'Casein', 'Protein'],
    recentPerformance: [3.8, 4.1, 3.7, 4.0],
  },
  {
    id: 4,
    name: 'Tom Hyrox',
    handle: '@tomhyrox',
    platform: 'Instagram',
    followers: 34000,
    engagement: 7.3,
    tier: 'Micro',
    niche: 'Hyrox & Functional',
    location: 'Amsterdam, NL',
    avgCost: 290,
    pastCampaigns: 6,
    avgROI: 5.4,
    status: 'Available',
    specialty: ['Pre-Workout', 'Energy', 'Endurance'],
    recentPerformance: [5.6, 5.2, 5.8, 5.0],
  },
  {
    id: 5,
    name: 'Max Endurance',
    handle: '@maxendurance',
    platform: 'YouTube',
    followers: 89000,
    engagement: 4.2,
    tier: 'Mid',
    niche: 'Running & Endurance',
    location: 'Rotterdam, NL',
    avgCost: 650,
    pastCampaigns: 4,
    avgROI: 3.5,
    status: 'In Campaign',
    specialty: ['Energy Gel', 'Electrolytes'],
    recentPerformance: [3.4, 3.8, 3.2, 3.6],
  },
  {
    id: 6,
    name: 'Julia Strong',
    handle: '@juliastrong',
    platform: 'TikTok',
    followers: 156000,
    engagement: 9.8,
    tier: 'Macro',
    niche: 'Strength & Motivation',
    location: 'Munich, DE',
    avgCost: 1200,
    pastCampaigns: 2,
    avgROI: 6.2,
    status: 'Available',
    specialty: ['Pre-Workout', 'Protein'],
    recentPerformance: [6.4, 6.0],
  },
];

// ============================================================
// MAIN APP COMPONENT
// ============================================================

function App({ onBackToLanding }) {
  const [activeTab, setActiveTab] = useState('cockpit');
  const [trends, setTrends] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [launchedCampaigns, setLaunchedCampaigns] = useState([]);
  const [showCampaignBuilder, setShowCampaignBuilder] = useState(false);
  const [campaignConfig, setCampaignConfig] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [dataSource, setDataSource] = useState('checking'); // 'live', 'simulated', 'checking'
  const [selectedGeo, setSelectedGeo] = useState('BE');
  const [keywordDetails, setKeywordDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const refreshInterval = useRef(null);

  // Fetch data from live API with fallback to simulated
  const refreshData = useCallback(async () => {
    setConnectionStatus('fetching');

    // Try live API first
    const liveData = await fetchLiveTrends(selectedGeo);

    if (liveData && liveData.length > 0) {
      setTrends(liveData);
      setDataSource('live');
      setConnectionStatus('connected');
    } else {
      // Fallback to simulated data
      setTrends(generateTrendData());
      setDataSource('simulated');
      setConnectionStatus('offline');
    }

    // Social posts are always simulated for now
    setSocialPosts(generateSocialPosts());
    setLastUpdate(new Date());
  }, [selectedGeo]);

  // Fetch details for selected keyword
  const loadKeywordDetails = useCallback(async (keyword) => {
    if (!keyword) return;
    setIsLoadingDetails(true);
    const details = await fetchKeywordDetails(keyword, selectedGeo);
    setKeywordDetails(details);
    setIsLoadingDetails(false);
  }, [selectedGeo]);

  // Initial load and live updates
  useEffect(() => {
    refreshData();

    if (isLive) {
      refreshInterval.current = setInterval(() => {
        refreshData();
      }, 30000); // Update every 30 seconds for live API (rate limiting)
    }

    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, [isLive, refreshData]);

  // Load details when trend is selected
  useEffect(() => {
    if (selectedTrend && dataSource === 'live') {
      loadKeywordDetails(selectedTrend.keyword);
    }
  }, [selectedTrend, dataSource, loadKeywordDetails]);

  // Calculate statistics
  const stats = {
    surgingTrends: trends.filter(t => t.trend === 'SURGING').length,
    risingTrends: trends.filter(t => t.trend === 'RISING').length,
    totalVolume: trends.reduce((sum, t) => sum + t.volume, 0),
    highOpportunity: trends.filter(t => t.opportunity === 'High').length,
    activeCampaigns: launchedCampaigns.length,
    totalBudget: launchedCampaigns.reduce((sum, c) => sum + c.budget, 0),
  };

  const handleLaunchCampaign = (campaign) => {
    setLaunchedCampaigns([...launchedCampaigns, {
      ...campaign,
      id: Date.now(),
      launchedAt: new Date().toISOString(),
      status: 'Active',
    }]);
    setShowCampaignBuilder(false);
    setCampaignConfig(null);
  };

  const openCampaignBuilder = (trend) => {
    setCampaignConfig({
      trigger: trend,
      type: trend.trend === 'SURGING' ? 'TREND_AMPLIFY' : 'TREND_RIDE',
    });
    setShowCampaignBuilder(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg.primary,
      color: theme.text.primary,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* PROTOTYPE INDICATOR */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: '#fff',
        padding: '12px 24px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        📊 PROTOTYPE 1: TRENDS-FIRST APPROACH 📈
      </div>
      {/* Header */}
      <Header
        isLive={isLive}
        setIsLive={setIsLive}
        lastUpdate={lastUpdate}
        onRefresh={refreshData}
        connectionStatus={connectionStatus}
        dataSource={dataSource}
        selectedGeo={selectedGeo}
        setSelectedGeo={setSelectedGeo}
        onBackToLanding={onBackToLanding}
      />

      {/* Live Stats Bar */}
      <LiveStatsBar stats={stats} trends={trends} />

      {/* Main Content */}
      <div style={{ padding: '0 24px 24px' }}>
        {/* Tabs */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stats={stats}
        />

        {/* Tab Content */}
        <div style={{ marginTop: '24px' }}>
          {activeTab === 'cockpit' && (
            <OrchestrationCockpit
              trends={trends}
              events={eventsData}
              influencers={influencersData}
              campaigns={launchedCampaigns}
              onLaunchCampaign={handleLaunchCampaign}
            />
          )}
          {activeTab === 'live' && (
            <LiveTrendsView
              trends={trends}
              socialPosts={socialPosts}
              onSelectTrend={setSelectedTrend}
              selectedTrend={selectedTrend}
              onCreateCampaign={openCampaignBuilder}
            />
          )}
          {activeTab === 'social' && (
            <SocialFeedView
              posts={socialPosts}
              trends={trends}
            />
          )}
          {activeTab === 'events' && (
            <EventsView
              events={eventsData}
              onCreateCampaign={openCampaignBuilder}
            />
          )}
          {activeTab === 'campaigns' && (
            <CampaignRecommendations
              trends={trends}
              events={eventsData}
              influencers={influencersData}
              onLaunch={handleLaunchCampaign}
              launchedCampaigns={launchedCampaigns}
            />
          )}
          {activeTab === 'influencers' && (
            <InfluencersView
              influencers={influencersData}
            />
          )}
          {activeTab === 'portal' && (
            <InfluencerPortalView
              influencers={influencersData}
              campaigns={launchedCampaigns}
            />
          )}
          {activeTab === 'impact' && (
            <InventoryImpactView
              trends={trends}
              events={eventsData}
              campaigns={launchedCampaigns}
            />
          )}
        </div>
      </div>

      {/* Campaign Builder Modal */}
      {showCampaignBuilder && (
        <CampaignBuilderModal
          config={campaignConfig}
          influencers={influencersData}
          onLaunch={handleLaunchCampaign}
          onClose={() => setShowCampaignBuilder(false)}
        />
      )}
    </div>
  );
}

// ============================================================
// HEADER COMPONENT
// ============================================================

function Header({ isLive, setIsLive, lastUpdate, onRefresh, connectionStatus, dataSource, selectedGeo, setSelectedGeo, onBackToLanding }) {
  const geoOptions = [
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
  ];

  return (
    <div style={{
      padding: '20px 24px',
      borderBottom: `1px solid ${theme.border.default}`,
      background: theme.bg.secondary,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: theme.text.secondary,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.color = '#10b981';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = theme.text.secondary;
              }}
              title="Back to Landing Page"
            >
              <Home size={18} />
            </button>
          )}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: theme.gradient.blue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Radio size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              Sens<span style={{ color: theme.accent.green }}>AI</span>
              {isLive && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: theme.accent.red,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  animation: 'pulse 2s infinite',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#fff',
                    animation: 'blink 1s infinite',
                  }} />
                  LIVE
                </span>
              )}
            </h1>
            <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
              Demand Orchestration Platform • Supply Chain + Influencer Marketing
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Region Selector */}
          <select
            value={selectedGeo}
            onChange={(e) => setSelectedGeo(e.target.value)}
            style={{
              padding: '8px 12px',
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.primary,
              fontSize: '13px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {geoOptions.map(geo => (
              <option key={geo.code} value={geo.code}>
                {geo.flag} {geo.name}
              </option>
            ))}
          </select>

          {/* Data Source Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: dataSource === 'live' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(251, 191, 36, 0.1)',
            borderRadius: '8px',
            border: `1px solid ${dataSource === 'live' ? theme.accent.green : theme.accent.amber}`,
          }}>
            {dataSource === 'live' ? (
              <>
                <Database size={16} color={theme.accent.green} />
                <span style={{ color: theme.accent.green, fontSize: '13px', fontWeight: '500' }}>Live API</span>
              </>
            ) : dataSource === 'simulated' ? (
              <>
                <Cloud size={16} color={theme.accent.amber} />
                <span style={{ color: theme.accent.amber, fontSize: '13px', fontWeight: '500' }}>Demo Mode</span>
              </>
            ) : (
              <>
                <Loader2 size={16} color={theme.accent.blue} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ color: theme.accent.blue, fontSize: '13px' }}>Checking...</span>
              </>
            )}
          </div>

          {/* Connection Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: theme.bg.card,
            borderRadius: '8px',
            border: `1px solid ${theme.border.default}`,
          }}>
            {connectionStatus === 'connected' ? (
              <>
                <Wifi size={16} color={theme.accent.green} />
                <span style={{ color: theme.accent.green, fontSize: '13px' }}>Connected</span>
              </>
            ) : connectionStatus === 'fetching' ? (
              <>
                <Loader2 size={16} color={theme.accent.blue} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ color: theme.accent.blue, fontSize: '13px' }}>Fetching...</span>
              </>
            ) : connectionStatus === 'offline' ? (
              <>
                <WifiOff size={16} color={theme.accent.amber} />
                <span style={{ color: theme.accent.amber, fontSize: '13px' }}>Offline</span>
              </>
            ) : (
              <>
                <Loader2 size={16} color={theme.accent.amber} style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ color: theme.accent.amber, fontSize: '13px' }}>Connecting...</span>
              </>
            )}
          </div>

          {/* Last Update */}
          <div style={{
            color: theme.text.muted,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Clock size={14} />
            Updated {lastUpdate.toLocaleTimeString()}
          </div>

          {/* Live Toggle */}
          <button
            onClick={() => setIsLive(!isLive)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: isLive ? theme.accent.green : theme.bg.card,
              border: `1px solid ${isLive ? theme.accent.green : theme.border.default}`,
              borderRadius: '8px',
              color: isLive ? '#fff' : theme.text.primary,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isLive ? <Pause size={16} /> : <Play size={16} />}
            {isLive ? 'Pause Live' : 'Go Live'}
          </button>

          {/* Manual Refresh */}
          <button
            onClick={onRefresh}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.primary,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes countUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// LIVE STATS BAR
// ============================================================

function LiveStatsBar({ stats, trends }) {
  const sortedTrends = [...trends].sort((a, b) => b.change - a.change);
  const topTrend = sortedTrends[0];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
      padding: '16px 24px',
      background: `linear-gradient(90deg, ${theme.bg.secondary} 0%, ${theme.bg.primary} 100%)`,
      borderBottom: `1px solid ${theme.border.default}`,
      overflowX: 'auto',
    }}>
      <LiveStatPill
        icon={<Flame size={16} />}
        label="Surging"
        value={stats.surgingTrends}
        color={theme.accent.red}
      />
      <LiveStatPill
        icon={<TrendingUp size={16} />}
        label="Rising"
        value={stats.risingTrends}
        color={theme.accent.green}
      />
      <LiveStatPill
        icon={<Eye size={16} />}
        label="Total Volume"
        value={`${(stats.totalVolume / 1000).toFixed(0)}K`}
        color={theme.accent.blue}
      />
      <LiveStatPill
        icon={<Sparkles size={16} />}
        label="Opportunities"
        value={stats.highOpportunity}
        color={theme.accent.amber}
      />

      {topTrend && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginLeft: 'auto',
          padding: '8px 16px',
          background: theme.gradient.fire,
          borderRadius: '20px',
        }}>
          <span style={{ fontSize: '16px' }}>{topTrend.emoji}</span>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>
            TOP: "{topTrend.keyword}" +{topTrend.change}%
          </span>
        </div>
      )}
    </div>
  );
}

function LiveStatPill({ icon, label, value, color }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      whiteSpace: 'nowrap',
    }}>
      <div style={{ color }}>{icon}</div>
      <div>
        <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
          {label}
        </div>
        <div style={{
          color: theme.text.primary,
          fontSize: '18px',
          fontWeight: '600',
          animation: 'countUp 0.3s ease-out',
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TAB NAVIGATION
// ============================================================

function TabNavigation({ activeTab, setActiveTab, stats }) {
  const tabs = [
    { id: 'cockpit', label: 'Orchestration Cockpit', icon: <Zap size={16} />, highlight: true },
    { id: 'live', label: 'Live Trends', icon: <Activity size={16} />, badge: stats.surgingTrends },
    { id: 'social', label: 'Social Feed', icon: <MessageCircle size={16} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={16} />, badge: 4 },
    { id: 'campaigns', label: 'Campaigns', icon: <Target size={16} />, badge: stats.activeCampaigns || null },
    { id: 'influencers', label: 'Influencers', icon: <Users size={16} /> },
    { id: 'portal', label: 'Influencer Portal', icon: <Sparkles size={16} /> },
    { id: 'impact', label: 'Inventory Impact', icon: <Package size={16} /> },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      borderBottom: `1px solid ${theme.border.default}`,
      marginTop: '24px',
      overflowX: 'auto',
      paddingBottom: '1px',
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: activeTab === tab.id ? theme.bg.elevated : 'transparent',
            border: 'none',
            borderBottom: activeTab === tab.id ? `2px solid ${theme.accent.blue}` : '2px solid transparent',
            borderRadius: '8px 8px 0 0',
            color: activeTab === tab.id ? theme.text.primary : theme.text.secondary,
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {tab.icon}
          {tab.label}
          {tab.badge > 0 && (
            <span style={{
              background: activeTab === tab.id ? theme.accent.blue : theme.bg.elevated,
              color: activeTab === tab.id ? '#fff' : theme.text.secondary,
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: '600',
            }}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// LIVE TRENDS VIEW
// ============================================================

function LiveTrendsView({ trends, socialPosts, onSelectTrend, selectedTrend, onCreateCampaign }) {
  const sortedTrends = [...trends].sort((a, b) => b.change - a.change);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
      {/* Trends Grid */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
            Google Trends - Live Monitor
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} color={theme.text.muted} />
            <span style={{ color: theme.text.muted, fontSize: '13px' }}>DE • NL • BE • AT</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sortedTrends.map((trend, index) => (
            <TrendCard
              key={trend.id}
              trend={trend}
              rank={index + 1}
              isSelected={selectedTrend?.id === trend.id}
              onClick={() => onSelectTrend(trend)}
              onCreateCampaign={() => onCreateCampaign(trend)}
            />
          ))}
        </div>
      </div>

      {/* Side Panel - Trend Details or Social Preview */}
      <div style={{ position: 'sticky', top: '24px', height: 'fit-content' }}>
        {selectedTrend ? (
          <TrendDetailPanel
            trend={selectedTrend}
            onClose={() => onSelectTrend(null)}
            onCreateCampaign={() => onCreateCampaign(selectedTrend)}
          />
        ) : (
          <SocialPreviewPanel posts={socialPosts.slice(0, 3)} />
        )}
      </div>
    </div>
  );
}

function TrendCard({ trend, rank, isSelected, onClick, onCreateCampaign }) {
  const trendColors = {
    SURGING: { bg: theme.accent.red + '20', border: theme.accent.red, text: theme.accent.red },
    RISING: { bg: theme.accent.green + '20', border: theme.accent.green, text: theme.accent.green },
    STABLE: { bg: theme.accent.blue + '20', border: theme.accent.blue, text: theme.accent.blue },
    FALLING: { bg: theme.accent.amber + '20', border: theme.accent.amber, text: theme.accent.amber },
  };
  const colors = trendColors[trend.trend] || trendColors.STABLE;

  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? theme.bg.elevated : theme.bg.card,
        border: `1px solid ${isSelected ? theme.accent.blue : theme.border.default}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        animation: 'slideIn 0.3s ease-out',
        animationDelay: `${rank * 0.05}s`,
        animationFillMode: 'both',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left: Trend Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>{trend.emoji}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                  {trend.keyword}
                </h3>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  background: colors.bg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}>
                  {trend.trend}
                </span>
              </div>
              <div style={{
                display: 'flex',
                gap: '12px',
                fontSize: '13px',
                color: theme.text.muted,
                marginTop: '4px',
              }}>
                <span>{trend.volume.toLocaleString()} searches/mo</span>
                <span>•</span>
                <span>{trend.category}</span>
              </div>
            </div>
          </div>

          {/* Sparkline */}
          <div style={{
            display: 'flex',
            alignItems: 'end',
            gap: '3px',
            height: '32px',
            marginTop: '12px',
          }}>
            {trend.sparkline.map((val, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: `${val * 0.32}px`,
                  background: i === trend.sparkline.length - 1 ? colors.text : theme.bg.elevated,
                  borderRadius: '2px',
                  transition: 'height 0.3s ease',
                }}
              />
            ))}
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              color: theme.text.muted
            }}>
              7d
            </span>
          </div>

          {/* Products */}
          <div style={{
            display: 'flex',
            gap: '6px',
            marginTop: '12px',
            flexWrap: 'wrap',
          }}>
            {trend.products.map((product, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                background: theme.bg.secondary,
                borderRadius: '12px',
                fontSize: '12px',
                color: theme.text.secondary,
              }}>
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Change & Actions */}
        <div style={{ textAlign: 'right', marginLeft: '20px' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: trend.change >= 0 ? theme.accent.green : theme.accent.red,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '4px',
          }}>
            {trend.change >= 0 ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
            {trend.change >= 0 ? '+' : ''}{trend.change}%
          </div>
          <div style={{ color: theme.text.muted, fontSize: '12px', marginTop: '4px' }}>
            vs last week
          </div>

          {trend.opportunity === 'High' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateCampaign();
              }}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                background: theme.gradient.blue,
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={14} />
              Create Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TrendDetailPanel({ trend, onClose, onCreateCampaign }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        background: theme.gradient.blue,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <div>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>{trend.emoji}</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{trend.keyword}</h3>
          <p style={{ fontSize: '13px', opacity: 0.8, margin: '4px 0 0 0' }}>{trend.category}</p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          Close
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <div style={{
            padding: '16px',
            background: theme.bg.secondary,
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ color: theme.accent.green, fontSize: '24px', fontWeight: '700' }}>
              +{trend.change}%
            </div>
            <div style={{ color: theme.text.muted, fontSize: '12px' }}>Weekly Change</div>
          </div>
          <div style={{
            padding: '16px',
            background: theme.bg.secondary,
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ color: theme.text.primary, fontSize: '24px', fontWeight: '700' }}>
              {(trend.volume / 1000).toFixed(1)}K
            </div>
            <div style={{ color: theme.text.muted, fontSize: '12px' }}>Monthly Volume</div>
          </div>
        </div>

        {/* Regional Breakdown */}
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
          Regional Interest
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {Object.entries(trend.regions).map(([region, volume]) => {
            const maxVolume = Math.max(...Object.values(trend.regions));
            const pct = (volume / maxVolume) * 100;
            return (
              <div key={region} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '30px', fontSize: '13px', color: theme.text.secondary }}>
                  {region}
                </span>
                <div style={{
                  flex: 1,
                  height: '8px',
                  background: theme.bg.secondary,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: theme.accent.blue,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
                <span style={{
                  width: '50px',
                  textAlign: 'right',
                  fontSize: '12px',
                  color: theme.text.muted
                }}>
                  {(volume / 1000).toFixed(1)}K
                </span>
              </div>
            );
          })}
        </div>

        {/* Hashtags */}
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
          Related Hashtags
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {trend.hashtags.map((tag, i) => (
            <span key={i} style={{
              padding: '6px 12px',
              background: theme.bg.secondary,
              borderRadius: '16px',
              fontSize: '13px',
              color: theme.accent.blue,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Products */}
        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
          Matched Products
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {trend.products.map((product, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              background: theme.bg.secondary,
              borderRadius: '8px',
            }}>
              <span style={{ fontSize: '14px' }}>{product}</span>
              <span style={{
                padding: '4px 8px',
                background: theme.accent.green + '20',
                color: theme.accent.green,
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
              }}>
                GOOD MATCH
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onCreateCampaign}
          style={{
            width: '100%',
            padding: '14px',
            background: theme.gradient.blue,
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Zap size={18} />
          Create Campaign for This Trend
        </button>
      </div>
    </div>
  );
}

function SocialPreviewPanel({ posts }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '20px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px'
      }}>
        <Instagram size={18} color={theme.accent.pink} />
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
          Social Buzz
        </h3>
        <span style={{
          marginLeft: 'auto',
          padding: '4px 8px',
          background: theme.accent.green + '20',
          color: theme.accent.green,
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: '600',
        }}>
          LIVE
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {posts.map(post => (
          <div key={post.id} style={{
            padding: '16px',
            background: theme.bg.secondary,
            borderRadius: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: theme.gradient.instagram,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
              }}>
                {post.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600' }}>{post.author}</div>
                <div style={{ fontSize: '11px', color: theme.text.muted }}>{post.timestamp}</div>
              </div>
              {post.verified && (
                <CheckCircle size={14} color={theme.accent.blue} />
              )}
            </div>
            <p style={{
              fontSize: '13px',
              color: theme.text.secondary,
              margin: '0 0 12px 0',
              lineHeight: '1.5',
            }}>
              {post.content.substring(0, 100)}...
            </p>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: theme.text.muted }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Heart size={14} /> {(post.likes / 1000).toFixed(1)}K
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MessageCircle size={14} /> {post.comments}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        width: '100%',
        marginTop: '16px',
        padding: '12px',
        background: 'transparent',
        border: `1px solid ${theme.border.default}`,
        borderRadius: '8px',
        color: theme.text.secondary,
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}>
        View Full Social Feed
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ============================================================
// SOCIAL FEED VIEW
// ============================================================

function SocialFeedView({ posts, trends }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
      {/* Main Feed */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            Live Social Feed
          </h2>
          <div style={{
            display: 'flex',
            gap: '8px',
            marginLeft: 'auto',
          }}>
            {['All', 'Instagram', 'TikTok', 'YouTube'].map(platform => (
              <button key={platform} style={{
                padding: '6px 14px',
                background: platform === 'All' ? theme.accent.blue : theme.bg.card,
                border: `1px solid ${platform === 'All' ? theme.accent.blue : theme.border.default}`,
                borderRadius: '20px',
                color: platform === 'All' ? '#fff' : theme.text.secondary,
                fontSize: '13px',
                cursor: 'pointer',
              }}>
                {platform}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map(post => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Trending Hashtags Sidebar */}
      <div>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '16px',
          padding: '20px',
          position: 'sticky',
          top: '24px',
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Hash size={18} color={theme.accent.purple} />
            Trending Hashtags
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {trends.slice(0, 6).flatMap(t => t.hashtags).slice(0, 10).map((tag, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: theme.bg.secondary,
                borderRadius: '8px',
              }}>
                <span style={{ color: theme.accent.blue, fontSize: '14px' }}>{tag}</span>
                <span style={{
                  color: theme.accent.green,
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  +{Math.floor(Math.random() * 150 + 20)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialPostCard({ post }) {
  const platformColors = {
    instagram: theme.gradient.instagram,
    tiktok: 'linear-gradient(135deg, #00f2ea 0%, #ff0050 100%)',
    youtube: theme.accent.red,
  };

  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '20px',
      transition: 'all 0.2s',
    }}>
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: platformColors[post.platform],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '600',
        }}>
          {post.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            {post.author}
            {post.verified && <CheckCircle size={16} color={theme.accent.blue} />}
          </div>
          <div style={{ fontSize: '13px', color: theme.text.muted }}>
            {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)} • {post.timestamp}
          </div>
        </div>
        <span style={{
          padding: '6px 12px',
          background: theme.accent.green + '20',
          color: theme.accent.green,
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
        }}>
          {post.engagement.toFixed(1)}% engagement
        </span>
      </div>

      {/* Content */}
      <p style={{
        fontSize: '15px',
        lineHeight: '1.6',
        color: theme.text.primary,
        margin: '0 0 16px 0',
      }}>
        {post.content}
      </p>

      {/* Hashtags */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {post.hashtags.map((tag, i) => (
          <span key={i} style={{
            padding: '4px 10px',
            background: theme.bg.secondary,
            borderRadius: '12px',
            fontSize: '13px',
            color: theme.accent.blue,
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Engagement Stats */}
      <div style={{
        display: 'flex',
        gap: '24px',
        paddingTop: '16px',
        borderTop: `1px solid ${theme.border.default}`,
      }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: theme.text.secondary,
          fontSize: '14px',
        }}>
          <Heart size={18} color={theme.accent.red} />
          {post.likes.toLocaleString()}
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: theme.text.secondary,
          fontSize: '14px',
        }}>
          <MessageCircle size={18} />
          {post.comments.toLocaleString()}
        </span>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: theme.text.secondary,
          fontSize: '14px',
        }}>
          <Share2 size={18} />
          {post.shares.toLocaleString()}
        </span>
        <button style={{
          marginLeft: 'auto',
          padding: '8px 16px',
          background: theme.gradient.blue,
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Target size={14} />
          Partner
        </button>
      </div>
    </div>
  );
}

// ============================================================
// EVENTS VIEW
// ============================================================

function EventsView({ events, onCreateCampaign }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            Upcoming Events
          </h2>
          <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
            Fitness competitions & seasonal moments affecting demand
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {events.map(event => (
          <EventCard key={event.id} event={event} onCreateCampaign={onCreateCampaign} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event, onCreateCampaign }) {
  const urgency = event.daysUntil <= 14 ? 'urgent' : event.daysUntil <= 30 ? 'soon' : 'upcoming';
  const urgencyColors = {
    urgent: { bg: theme.accent.red + '20', text: theme.accent.red },
    soon: { bg: theme.accent.amber + '20', text: theme.accent.amber },
    upcoming: { bg: theme.accent.blue + '20', text: theme.accent.blue },
  };

  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '32px' }}>{event.icon}</span>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
                {event.name}
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: theme.text.muted,
                fontSize: '13px',
                marginTop: '4px',
              }}>
                <MapPin size={14} />
                {event.location}
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <div>
              <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                Date
              </div>
              <div style={{ color: theme.text.primary, fontSize: '14px', fontWeight: '500' }}>
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div>
              <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                Attendees
              </div>
              <div style={{ color: theme.text.primary, fontSize: '14px', fontWeight: '500' }}>
                {event.attendees.toLocaleString()}
              </div>
            </div>
            <div>
              <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                Demand Lift
              </div>
              <div style={{ color: theme.accent.green, fontSize: '14px', fontWeight: '500' }}>
                +{((event.demandMultiplier - 1) * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {event.products.map((product, i) => (
              <span key={i} style={{
                padding: '4px 10px',
                background: theme.bg.secondary,
                borderRadius: '12px',
                fontSize: '12px',
                color: theme.text.secondary,
              }}>
                {product}
              </span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right', marginLeft: '20px' }}>
          <div style={{
            padding: '8px 16px',
            borderRadius: '12px',
            background: urgencyColors[urgency].bg,
            marginBottom: '8px',
          }}>
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: urgencyColors[urgency].text
            }}>
              {event.daysUntil}
            </div>
            <div style={{
              fontSize: '11px',
              color: urgencyColors[urgency].text,
              textTransform: 'uppercase',
            }}>
              days
            </div>
          </div>

          {event.daysUntil <= 21 && (
            <button
              onClick={() => onCreateCampaign({ ...event, type: 'EVENT' })}
              style={{
                padding: '10px 16px',
                background: theme.gradient.blue,
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Zap size={14} />
              Pre-Launch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CAMPAIGN RECOMMENDATIONS
// ============================================================

function CampaignRecommendations({ trends, events, influencers, onLaunch, launchedCampaigns }) {
  const recommendations = [
    {
      id: 'rec-1',
      name: 'Protein Ice Cream Challenge',
      type: 'TREND_AMPLIFY',
      trigger: trends.find(t => t.keyword === 'protein ice cream'),
      products: ['Casein Powder', 'Whey Isolate'],
      suggestedInfluencers: influencers.filter(i => i.specialty.includes('Recipes') || i.specialty.includes('Protein')),
      budget: 450,
      expectedROI: 5.2,
      demandLift: '+36%',
      urgency: 'High',
      rationale: 'Trend surging +127% - capitalize on viral recipe content',
    },
    {
      id: 'rec-2',
      name: 'Hyrox Ready Pack',
      type: 'EVENT_PRELAUNCH',
      trigger: events.find(e => e.name === 'Hyrox Cologne'),
      products: ['Pre-Workout', 'Energy Gel', 'Creatine'],
      suggestedInfluencers: influencers.filter(i => i.specialty.includes('Pre-Workout') || i.specialty.includes('Endurance')),
      budget: 680,
      expectedROI: 4.1,
      demandLift: '+45%',
      urgency: 'Critical',
      rationale: 'Event in 10 days - 2,500 attendees, peak pre-workout demand',
    },
    {
      id: 'rec-3',
      name: 'Morning Proffee Ritual',
      type: 'TREND_AMPLIFY',
      trigger: trends.find(t => t.keyword === 'protein coffee'),
      products: ['Whey Isolate', 'Casein Powder'],
      suggestedInfluencers: influencers.filter(i => i.niche.includes('Nutrition')),
      budget: 320,
      expectedROI: 4.8,
      demandLift: '+28%',
      urgency: 'Medium',
      rationale: 'Consistent growth in morning protein coffee content',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
          AI-Recommended Campaigns
        </h2>
        <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
          Smart recommendations based on live trends, events, and inventory position
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {recommendations.map(rec => {
          const isLaunched = launchedCampaigns.some(c => c.name === rec.name);

          return (
            <div key={rec.id} style={{
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '16px',
              padding: '24px',
              opacity: isLaunched ? 0.6 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <Lightbulb size={24} color={theme.accent.amber} />
                    <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                      {rec.name}
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      background: rec.type === 'TREND_AMPLIFY'
                        ? theme.accent.purple + '20'
                        : theme.accent.blue + '20',
                      color: rec.type === 'TREND_AMPLIFY'
                        ? theme.accent.purple
                        : theme.accent.blue,
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}>
                      {rec.type.replace('_', ' ')}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      background: rec.urgency === 'Critical'
                        ? theme.accent.red + '20'
                        : rec.urgency === 'High'
                        ? theme.accent.amber + '20'
                        : theme.accent.blue + '20',
                      color: rec.urgency === 'Critical'
                        ? theme.accent.red
                        : rec.urgency === 'High'
                        ? theme.accent.amber
                        : theme.accent.blue,
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}>
                      {rec.urgency}
                    </span>
                    {isLaunched && (
                      <span style={{
                        padding: '4px 12px',
                        background: theme.accent.green,
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}>
                        LAUNCHED
                      </span>
                    )}
                  </div>

                  <p style={{
                    color: theme.text.secondary,
                    fontSize: '14px',
                    margin: '0 0 16px 0',
                    padding: '12px 16px',
                    background: theme.bg.secondary,
                    borderRadius: '8px',
                    borderLeft: `3px solid ${theme.accent.amber}`,
                  }}>
                    {rec.rationale}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                    marginBottom: '16px',
                  }}>
                    <div>
                      <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                        Products
                      </div>
                      <div style={{ color: theme.text.primary, fontSize: '14px', marginTop: '4px' }}>
                        {rec.products.join(', ')}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                        Influencers
                      </div>
                      <div style={{ color: theme.text.primary, fontSize: '14px', marginTop: '4px' }}>
                        {rec.suggestedInfluencers.length} matched
                      </div>
                    </div>
                    <div>
                      <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                        Budget
                      </div>
                      <div style={{ color: theme.text.primary, fontSize: '14px', marginTop: '4px' }}>
                        €{rec.budget}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: theme.text.muted, fontSize: '11px', textTransform: 'uppercase' }}>
                        Demand Lift
                      </div>
                      <div style={{ color: theme.accent.green, fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>
                        {rec.demandLift}
                      </div>
                    </div>
                  </div>

                  {/* Influencer Avatars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: theme.text.muted, fontSize: '13px' }}>Suggested:</span>
                    <div style={{ display: 'flex' }}>
                      {rec.suggestedInfluencers.slice(0, 4).map((inf, i) => (
                        <div key={inf.id} style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: theme.gradient.instagram,
                          border: `2px solid ${theme.bg.card}`,
                          marginLeft: i > 0 ? '-8px' : 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}>
                          {inf.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                    </div>
                    <span style={{ color: theme.text.secondary, fontSize: '13px' }}>
                      {rec.suggestedInfluencers.slice(0, 3).map(i => i.name).join(', ')}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', marginLeft: '24px' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: theme.accent.green,
                    marginBottom: '4px',
                  }}>
                    {rec.expectedROI}x
                  </div>
                  <div style={{ color: theme.text.muted, fontSize: '12px', marginBottom: '16px' }}>
                    Expected ROI
                  </div>

                  {!isLaunched && (
                    <button
                      onClick={() => onLaunch(rec)}
                      style={{
                        padding: '14px 28px',
                        background: theme.gradient.blue,
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Zap size={18} />
                      Launch Campaign
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// INFLUENCERS VIEW
// ============================================================

function InfluencersView({ influencers }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('roi');

  const filteredInfluencers = influencers
    .filter(i => filter === 'all' || i.platform.toLowerCase() === filter)
    .sort((a, b) => {
      if (sortBy === 'roi') return b.avgROI - a.avgROI;
      if (sortBy === 'followers') return b.followers - a.followers;
      if (sortBy === 'engagement') return b.engagement - a.engagement;
      return 0;
    });

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
            Influencer Network
          </h2>
          <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
            Pre-vetted fitness & nutrition creators in Benelux & DACH
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Platform Filter */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'instagram', 'tiktok', 'youtube'].map(platform => (
              <button
                key={platform}
                onClick={() => setFilter(platform)}
                style={{
                  padding: '8px 16px',
                  background: filter === platform ? theme.accent.blue : theme.bg.card,
                  border: `1px solid ${filter === platform ? theme.accent.blue : theme.border.default}`,
                  borderRadius: '8px',
                  color: filter === platform ? '#fff' : theme.text.secondary,
                  fontSize: '13px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 16px',
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.primary,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            <option value="roi">Sort by ROI</option>
            <option value="followers">Sort by Followers</option>
            <option value="engagement">Sort by Engagement</option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px',
      }}>
        {filteredInfluencers.map(influencer => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
}

function InfluencerCard({ influencer }) {
  const platformIcons = {
    Instagram: <Instagram size={16} />,
    TikTok: <span style={{ fontSize: '14px' }}>♪</span>,
    YouTube: <Youtube size={16} />,
  };

  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.2s',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: theme.gradient.instagram,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: '600',
        }}>
          {influencer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
              {influencer.name}
            </h3>
            <span style={{
              padding: '2px 8px',
              background: influencer.tier === 'Macro'
                ? theme.accent.purple + '20'
                : influencer.tier === 'Mid'
                ? theme.accent.blue + '20'
                : theme.accent.green + '20',
              color: influencer.tier === 'Macro'
                ? theme.accent.purple
                : influencer.tier === 'Mid'
                ? theme.accent.blue
                : theme.accent.green,
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: '600',
            }}>
              {influencer.tier}
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: theme.text.muted,
            fontSize: '13px',
          }}>
            {platformIcons[influencer.platform]}
            {influencer.handle}
          </div>
        </div>
        <span style={{
          padding: '4px 10px',
          background: influencer.status === 'Available'
            ? theme.accent.green + '20'
            : theme.accent.amber + '20',
          color: influencer.status === 'Available'
            ? theme.accent.green
            : theme.accent.amber,
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
        }}>
          {influencer.status}
        </span>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '16px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: theme.text.primary, fontSize: '18px', fontWeight: '600' }}>
            {(influencer.followers / 1000).toFixed(0)}K
          </div>
          <div style={{ color: theme.text.muted, fontSize: '11px' }}>Followers</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: theme.accent.green, fontSize: '18px', fontWeight: '600' }}>
            {influencer.engagement}%
          </div>
          <div style={{ color: theme.text.muted, fontSize: '11px' }}>Engagement</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: theme.accent.blue, fontSize: '18px', fontWeight: '600' }}>
            {influencer.avgROI}x
          </div>
          <div style={{ color: theme.text.muted, fontSize: '11px' }}>Avg ROI</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          color: theme.text.muted,
          fontSize: '11px',
          marginBottom: '8px',
          textTransform: 'uppercase',
        }}>
          Recent Campaign Performance
        </div>
        <div style={{ display: 'flex', alignItems: 'end', gap: '4px', height: '32px' }}>
          {influencer.recentPerformance.map((perf, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${(perf / 7) * 100}%`,
                background: perf >= influencer.avgROI
                  ? theme.accent.green
                  : theme.accent.amber,
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {influencer.specialty.map((spec, i) => (
          <span key={i} style={{
            padding: '4px 10px',
            background: theme.bg.secondary,
            borderRadius: '12px',
            fontSize: '12px',
            color: theme.text.secondary,
          }}>
            {spec}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: `1px solid ${theme.border.default}`,
      }}>
        <div>
          <div style={{ color: theme.text.muted, fontSize: '11px' }}>Cost per post</div>
          <div style={{ color: theme.text.primary, fontSize: '16px', fontWeight: '600' }}>
            €{influencer.avgCost}
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: theme.text.muted,
          fontSize: '12px',
        }}>
          <MapPin size={14} />
          {influencer.location}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INVENTORY IMPACT VIEW
// ============================================================

function InventoryImpactView({ trends, events, campaigns }) {
  const inventoryPositions = [
    { sku: 'PRE-001', name: 'Pre-Workout Explosive', currentBet: 'GOOD', return: 12.4, stockDays: 28, signals: ['Hyrox Cologne', 'Pre-workout trend'] },
    { sku: 'CAS-002', name: 'Casein Powder', currentBet: 'GOOD', return: 10.8, stockDays: 42, signals: ['Protein ice cream trend'] },
    { sku: 'WHY-003', name: 'Whey Isolate Vanilla', currentBet: 'GOOD', return: 11.2, stockDays: 35, signals: ['Protein coffee trend'] },
    { sku: 'CRE-004', name: 'Creatine Monohydrate', currentBet: 'NEUTRAL', return: 7.8, stockDays: 45, signals: ['Hyrox Cologne'] },
    { sku: 'ENE-005', name: 'Energy Gel Pack', currentBet: 'GOOD', return: 15.2, stockDays: 18, signals: ['Hyrox Cologne', 'Marathon Rotterdam'] },
    { sku: 'RTD-006', name: 'RTD Chocolate Shake', currentBet: 'BAD', return: 2.1, stockDays: 65, signals: ['Expiry in 62 days'] },
    { sku: 'BAR-007', name: 'Protein Bar Chocolate', currentBet: 'NEUTRAL', return: 6.2, stockDays: 52, signals: ['High protein snacks trend'] },
  ];

  const summary = {
    good: inventoryPositions.filter(p => p.currentBet === 'GOOD').length,
    neutral: inventoryPositions.filter(p => p.currentBet === 'NEUTRAL').length,
    bad: inventoryPositions.filter(p => p.currentBet === 'BAD').length,
    signalAffected: inventoryPositions.filter(p => p.signals.length > 0).length,
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
          Inventory Impact Analysis
        </h2>
        <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
          How signals translate to inventory bet quality
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <SummaryCard
          label="Good Bets"
          value={summary.good}
          color={theme.accent.green}
          icon={<CheckCircle size={20} />}
        />
        <SummaryCard
          label="Neutral Bets"
          value={summary.neutral}
          color={theme.accent.amber}
          icon={<Clock size={20} />}
        />
        <SummaryCard
          label="Bad Bets"
          value={summary.bad}
          color={theme.accent.red}
          icon={<AlertTriangle size={20} />}
        />
        <SummaryCard
          label="Signal Affected"
          value={summary.signalAffected}
          color={theme.accent.blue}
          icon={<Radio size={20} />}
        />
      </div>

      {/* Positions Table */}
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px 100px 100px 2fr',
          gap: '16px',
          padding: '16px 24px',
          background: theme.bg.secondary,
          borderBottom: `1px solid ${theme.border.default}`,
          fontSize: '12px',
          color: theme.text.muted,
          textTransform: 'uppercase',
        }}>
          <div>Product</div>
          <div>Bet</div>
          <div>Return</div>
          <div>Stock</div>
          <div>Active Signals</div>
        </div>

        {inventoryPositions.map((position, i) => (
          <div
            key={position.sku}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 100px 100px 100px 2fr',
              gap: '16px',
              padding: '16px 24px',
              borderBottom: i < inventoryPositions.length - 1 ? `1px solid ${theme.border.default}` : 'none',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: '500' }}>{position.name}</div>
              <div style={{ color: theme.text.muted, fontSize: '12px' }}>{position.sku}</div>
            </div>
            <div>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                background: position.currentBet === 'GOOD'
                  ? theme.accent.green + '20'
                  : position.currentBet === 'NEUTRAL'
                  ? theme.accent.amber + '20'
                  : theme.accent.red + '20',
                color: position.currentBet === 'GOOD'
                  ? theme.accent.green
                  : position.currentBet === 'NEUTRAL'
                  ? theme.accent.amber
                  : theme.accent.red,
              }}>
                {position.currentBet}
              </span>
            </div>
            <div style={{
              color: position.return > 9.6
                ? theme.accent.green
                : position.return > 4
                ? theme.accent.amber
                : theme.accent.red,
              fontWeight: '600',
            }}>
              {position.return}%
            </div>
            <div style={{ color: theme.text.secondary }}>
              {position.stockDays} days
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {position.signals.map((signal, j) => (
                <span key={j} style={{
                  padding: '4px 10px',
                  background: signal.includes('Expiry')
                    ? theme.accent.red + '20'
                    : theme.accent.blue + '10',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: signal.includes('Expiry')
                    ? theme.accent.red
                    : theme.accent.blue,
                }}>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    }}>
      <div style={{ color }}>{icon}</div>
      <div>
        <div style={{ fontSize: '28px', fontWeight: '700', color }}>{value}</div>
        <div style={{ color: theme.text.muted, fontSize: '13px' }}>{label}</div>
      </div>
    </div>
  );
}

// ============================================================
// CAMPAIGN BUILDER MODAL
// ============================================================

function CampaignBuilderModal({ config, influencers, onLaunch, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [campaignName, setCampaignName] = useState(
    config?.trigger?.keyword
      ? `${config.trigger.keyword.charAt(0).toUpperCase() + config.trigger.keyword.slice(1)} Campaign`
      : 'New Campaign'
  );

  const matchedInfluencers = influencers.filter(i => i.status === 'Available');
  const totalBudget = selectedInfluencers.reduce((sum, id) => {
    const inf = influencers.find(i => i.id === id);
    return sum + (inf?.avgCost || 0);
  }, 0);

  const expectedROI = selectedInfluencers.length > 0
    ? selectedInfluencers.reduce((sum, id) => {
        const inf = influencers.find(i => i.id === id);
        return sum + (inf?.avgROI || 0);
      }, 0) / selectedInfluencers.length
    : 0;

  const handleLaunch = () => {
    onLaunch({
      name: campaignName,
      type: config.type,
      trigger: config.trigger,
      influencers: selectedInfluencers.length,
      budget: totalBudget,
      expectedROI: expectedROI.toFixed(1) + 'x',
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        width: '800px',
        maxHeight: '90vh',
        background: theme.bg.secondary,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: `1px solid ${theme.border.default}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
              Campaign Builder
            </h2>
            <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
              Step {step} of 2: {step === 1 ? 'Select Influencers' : 'Review & Launch'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.primary,
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Cancel
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {step === 1 && (
            <div>
              {/* Campaign Info */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  color: theme.text.secondary,
                  fontSize: '13px',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: theme.bg.card,
                    border: `1px solid ${theme.border.default}`,
                    borderRadius: '8px',
                    color: theme.text.primary,
                    fontSize: '16px',
                  }}
                />
              </div>

              {/* Trigger Info */}
              {config?.trigger && (
                <div style={{
                  padding: '16px',
                  background: theme.accent.blue + '10',
                  border: `1px solid ${theme.accent.blue}30`,
                  borderRadius: '12px',
                  marginBottom: '24px',
                }}>
                  <div style={{ fontSize: '13px', color: theme.accent.blue, marginBottom: '4px' }}>
                    TRIGGER
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                    {config.trigger.keyword || config.trigger.name}
                    {config.trigger.change && (
                      <span style={{ color: theme.accent.green, marginLeft: '8px' }}>
                        +{config.trigger.change}%
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Influencer Selection */}
              <div style={{
                color: theme.text.secondary,
                fontSize: '13px',
                marginBottom: '12px',
              }}>
                Select influencers ({selectedInfluencers.length} selected)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {matchedInfluencers.map(inf => {
                  const isSelected = selectedInfluencers.includes(inf.id);
                  return (
                    <div
                      key={inf.id}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedInfluencers(selectedInfluencers.filter(id => id !== inf.id));
                        } else {
                          setSelectedInfluencers([...selectedInfluencers, inf.id]);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        background: isSelected ? theme.accent.blue + '10' : theme.bg.card,
                        border: `2px solid ${isSelected ? theme.accent.blue : theme.border.default}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: `2px solid ${isSelected ? theme.accent.blue : theme.border.default}`,
                        background: isSelected ? theme.accent.blue : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {isSelected && <CheckCircle size={14} color="#fff" />}
                      </div>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: theme.gradient.instagram,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}>
                        {inf.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500' }}>{inf.name}</div>
                        <div style={{ color: theme.text.muted, fontSize: '13px' }}>
                          {inf.handle} - {(inf.followers / 1000).toFixed(0)}K followers
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: theme.accent.green, fontWeight: '600' }}>
                          {inf.avgROI}x ROI
                        </div>
                        <div style={{ color: theme.text.muted, fontSize: '13px' }}>
                          €{inf.avgCost}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                Campaign Summary
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <div style={{
                  padding: '20px',
                  background: theme.bg.card,
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: theme.text.primary, fontSize: '28px', fontWeight: '700' }}>
                    {selectedInfluencers.length}
                  </div>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>Influencers</div>
                </div>
                <div style={{
                  padding: '20px',
                  background: theme.bg.card,
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: theme.text.primary, fontSize: '28px', fontWeight: '700' }}>
                    €{totalBudget}
                  </div>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>Total Budget</div>
                </div>
                <div style={{
                  padding: '20px',
                  background: theme.bg.card,
                  borderRadius: '12px',
                  textAlign: 'center',
                }}>
                  <div style={{ color: theme.accent.green, fontSize: '28px', fontWeight: '700' }}>
                    {expectedROI.toFixed(1)}x
                  </div>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>Expected ROI</div>
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: theme.bg.card,
                borderRadius: '12px',
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>Campaign</div>
                  <div style={{ fontSize: '18px', fontWeight: '500' }}>{campaignName}</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>Selected Influencers</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {selectedInfluencers.map(id => {
                      const inf = influencers.find(i => i.id === id);
                      return (
                        <span key={id} style={{
                          padding: '6px 12px',
                          background: theme.bg.secondary,
                          borderRadius: '16px',
                          fontSize: '13px',
                        }}>
                          {inf?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>Expected Outcomes</div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    marginTop: '12px',
                  }}>
                    <div style={{ fontSize: '14px' }}>
                      Impressions: <strong>~{(selectedInfluencers.length * 25000).toLocaleString()}</strong>
                    </div>
                    <div style={{ fontSize: '14px' }}>
                      Expected Revenue: <strong>€{(totalBudget * expectedROI).toFixed(0)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 24px',
          borderTop: `1px solid ${theme.border.default}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ color: theme.text.secondary, fontSize: '14px' }}>
            Budget: <strong style={{ color: theme.text.primary }}>€{totalBudget}</strong>
            {' - '}
            Expected ROI: <strong style={{ color: theme.accent.green }}>{expectedROI.toFixed(1)}x</strong>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: `1px solid ${theme.border.default}`,
                  borderRadius: '8px',
                  color: theme.text.primary,
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
            )}
            {step < 2 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={selectedInfluencers.length === 0}
                style={{
                  padding: '12px 24px',
                  background: selectedInfluencers.length > 0 ? theme.gradient.blue : theme.bg.card,
                  border: 'none',
                  borderRadius: '8px',
                  color: selectedInfluencers.length > 0 ? '#fff' : theme.text.muted,
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: selectedInfluencers.length > 0 ? 'pointer' : 'not-allowed',
                }}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleLaunch}
                style={{
                  padding: '12px 24px',
                  background: theme.gradient.green,
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Zap size={18} />
                Launch Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INFLUENCER PORTAL VIEW
// Complete influencer tracking, discount codes, attribution, and payouts
// ============================================================

function InfluencerPortalView({ influencers, campaigns }) {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [portalView, setPortalView] = useState('overview'); // overview, codes, performance, payouts
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState([]);

  // Generate unique discount codes for each influencer
  const generateInfluencerCodes = () => {
    const codes = influencers.map(inf => {
      const baseCode = inf.name.split(' ')[0].toUpperCase().slice(0, 6);
      return {
        influencerId: inf.id,
        influencerName: inf.name,
        handle: inf.handle,
        codes: [
          { code: `${baseCode}20`, discount: 20, type: 'percentage', uses: Math.floor(Math.random() * 150) + 50, revenue: Math.floor(Math.random() * 8000) + 2000 },
          { code: `${baseCode}FREE`, discount: 0, type: 'freeShipping', uses: Math.floor(Math.random() * 80) + 20, revenue: Math.floor(Math.random() * 3000) + 500 },
          { code: `${baseCode}BUNDLE`, discount: 25, type: 'bundle', uses: Math.floor(Math.random() * 40) + 10, revenue: Math.floor(Math.random() * 5000) + 1500 },
        ],
        totalUses: 0,
        totalRevenue: 0,
        conversionRate: (Math.random() * 8 + 2).toFixed(1),
        avgOrderValue: Math.floor(Math.random() * 40) + 45,
      };
    }).map(inf => ({
      ...inf,
      totalUses: inf.codes.reduce((sum, c) => sum + c.uses, 0),
      totalRevenue: inf.codes.reduce((sum, c) => sum + c.revenue, 0),
    }));
    setGeneratedCodes(codes);
  };

  // Initialize codes on mount
  useEffect(() => {
    generateInfluencerCodes();
  }, []);

  // Performance data with 7-day attribution window
  const performanceData = influencers.map(inf => {
    const codeData = generatedCodes.find(c => c.influencerId === inf.id) || {};
    return {
      ...inf,
      ...codeData,
      // 7-day attribution tracking
      attributionWindow: {
        day1: Math.floor(Math.random() * 30) + 10,
        day2: Math.floor(Math.random() * 25) + 8,
        day3: Math.floor(Math.random() * 20) + 5,
        day4: Math.floor(Math.random() * 15) + 3,
        day5: Math.floor(Math.random() * 12) + 2,
        day6: Math.floor(Math.random() * 8) + 1,
        day7: Math.floor(Math.random() * 5) + 1,
      },
      // Tiered payout calculation
      tier: inf.avgROI > 5 ? 'GOLD' : inf.avgROI > 4 ? 'SILVER' : 'BRONZE',
      baseRate: inf.avgROI > 5 ? 15 : inf.avgROI > 4 ? 12 : 10,
      bonusMultiplier: inf.avgROI > 5 ? 1.5 : inf.avgROI > 4 ? 1.25 : 1.0,
    };
  });

  // Calculate total stats
  const totalStats = {
    totalInfluencers: influencers.length,
    activeInfluencers: influencers.filter(i => i.status === 'Available' || i.status === 'In Campaign').length,
    totalCodes: generatedCodes.reduce((sum, c) => sum + (c.codes?.length || 0), 0),
    totalUses: generatedCodes.reduce((sum, c) => sum + (c.totalUses || 0), 0),
    totalRevenue: generatedCodes.reduce((sum, c) => sum + (c.totalRevenue || 0), 0),
    avgConversion: (generatedCodes.reduce((sum, c) => sum + parseFloat(c.conversionRate || 0), 0) / (generatedCodes.length || 1)).toFixed(1),
  };

  // Payout calculation
  const calculatePayout = (inf) => {
    const perf = performanceData.find(p => p.id === inf.id);
    if (!perf || !perf.totalRevenue) return { base: 0, bonus: 0, total: 0 };

    const baseCommission = (perf.totalRevenue * perf.baseRate) / 100;
    const bonus = perf.tier === 'GOLD' ? baseCommission * 0.5 : perf.tier === 'SILVER' ? baseCommission * 0.25 : 0;
    return {
      base: Math.round(baseCommission),
      bonus: Math.round(bonus),
      total: Math.round(baseCommission + bonus),
    };
  };

  return (
    <div>
      {/* Portal Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '24px',
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={28} color={theme.accent.purple} />
            Influencer Portal
          </h2>
          <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '8px 0 0 0' }}>
            Track codes, attribution, performance & automated payouts
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowCodeGenerator(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: theme.gradient.purple,
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <Zap size={18} />
            Generate New Codes
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <PortalStatCard
          label="Active Influencers"
          value={totalStats.activeInfluencers}
          subtext={`of ${totalStats.totalInfluencers}`}
          color={theme.accent.blue}
          icon={<Users size={20} />}
        />
        <PortalStatCard
          label="Active Codes"
          value={totalStats.totalCodes}
          subtext="discount codes"
          color={theme.accent.purple}
          icon={<Hash size={20} />}
        />
        <PortalStatCard
          label="Total Uses"
          value={totalStats.totalUses.toLocaleString()}
          subtext="code redemptions"
          color={theme.accent.green}
          icon={<ShoppingCart size={20} />}
        />
        <PortalStatCard
          label="Revenue Generated"
          value={`€${(totalStats.totalRevenue / 1000).toFixed(1)}K`}
          subtext="via codes"
          color={theme.accent.amber}
          icon={<DollarSign size={20} />}
        />
        <PortalStatCard
          label="Avg Conversion"
          value={`${totalStats.avgConversion}%`}
          subtext="code to sale"
          color={theme.accent.cyan}
          icon={<TrendingUp size={20} />}
        />
        <PortalStatCard
          label="Pending Payouts"
          value={`€${(performanceData.reduce((sum, p) => sum + calculatePayout(p).total, 0) / 1000).toFixed(1)}K`}
          subtext="this period"
          color={theme.accent.pink}
          icon={<Layers size={20} />}
        />
      </div>

      {/* Sub-navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        background: theme.bg.card,
        padding: '6px',
        borderRadius: '12px',
        width: 'fit-content',
      }}>
        {[
          { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
          { id: 'codes', label: 'Discount Codes', icon: <Hash size={16} /> },
          { id: 'performance', label: 'Attribution', icon: <BarChart3 size={16} /> },
          { id: 'payouts', label: 'Payouts', icon: <DollarSign size={16} /> },
        ].map(view => (
          <button
            key={view.id}
            onClick={() => setPortalView(view.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              background: portalView === view.id ? theme.accent.purple : 'transparent',
              border: 'none',
              borderRadius: '8px',
              color: portalView === view.id ? '#fff' : theme.text.secondary,
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {view.icon}
            {view.label}
          </button>
        ))}
      </div>

      {/* Content Views */}
      {portalView === 'overview' && (
        <InfluencerOverviewGrid
          influencers={performanceData}
          onSelect={setSelectedInfluencer}
          calculatePayout={calculatePayout}
        />
      )}

      {portalView === 'codes' && (
        <DiscountCodesView
          codes={generatedCodes}
          onRefresh={generateInfluencerCodes}
        />
      )}

      {portalView === 'performance' && (
        <AttributionTrackingView
          performanceData={performanceData}
        />
      )}

      {portalView === 'payouts' && (
        <PayoutsView
          performanceData={performanceData}
          calculatePayout={calculatePayout}
        />
      )}

      {/* Code Generator Modal */}
      {showCodeGenerator && (
        <CodeGeneratorModal
          influencers={influencers}
          onClose={() => setShowCodeGenerator(false)}
          onGenerate={(newCodes) => {
            setGeneratedCodes([...generatedCodes, ...newCodes]);
            setShowCodeGenerator(false);
          }}
        />
      )}
    </div>
  );
}

// Portal Stat Card
function PortalStatCard({ label, value, subtext, color, icon }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '12px',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ color }}>{icon}</div>
        <span style={{ color: theme.text.muted, fontSize: '12px', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '700', color }}>{value}</div>
      <div style={{ color: theme.text.muted, fontSize: '12px', marginTop: '4px' }}>{subtext}</div>
    </div>
  );
}

// Influencer Overview Grid
function InfluencerOverviewGrid({ influencers, onSelect, calculatePayout }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    }}>
      {influencers.map(inf => {
        const payout = calculatePayout(inf);
        const tierColors = {
          GOLD: { bg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', border: '#fbbf24' },
          SILVER: { bg: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)', border: '#94a3b8' },
          BRONZE: { bg: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)', border: '#d97706' },
        };
        const tierStyle = tierColors[inf.tier] || tierColors.BRONZE;

        return (
          <div
            key={inf.id}
            onClick={() => onSelect(inf)}
            style={{
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: theme.gradient.instagram,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                }}>
                  {inf.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>{inf.name}</div>
                  <div style={{ color: theme.text.muted, fontSize: '13px' }}>{inf.handle}</div>
                </div>
              </div>
              <span style={{
                padding: '4px 10px',
                background: tierStyle.bg,
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '700',
                color: '#fff',
              }}>
                {inf.tier}
              </span>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '16px',
            }}>
              <div style={{ padding: '12px', background: theme.bg.secondary, borderRadius: '8px' }}>
                <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Code Uses</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: theme.accent.green }}>
                  {(inf.totalUses || 0).toLocaleString()}
                </div>
              </div>
              <div style={{ padding: '12px', background: theme.bg.secondary, borderRadius: '8px' }}>
                <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Revenue</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: theme.accent.amber }}>
                  €{((inf.totalRevenue || 0) / 1000).toFixed(1)}K
                </div>
              </div>
              <div style={{ padding: '12px', background: theme.bg.secondary, borderRadius: '8px' }}>
                <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Conversion</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: theme.accent.blue }}>
                  {inf.conversionRate || '0.0'}%
                </div>
              </div>
              <div style={{ padding: '12px', background: theme.bg.secondary, borderRadius: '8px' }}>
                <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Avg Order</div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: theme.accent.purple }}>
                  €{inf.avgOrderValue || 0}
                </div>
              </div>
            </div>

            {/* Payout Preview */}
            <div style={{
              padding: '14px',
              background: theme.accent.green + '10',
              border: `1px solid ${theme.accent.green}30`,
              borderRadius: '10px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: theme.text.muted, fontSize: '11px' }}>Pending Payout</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: theme.accent.green }}>
                    €{payout.total}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '11px', color: theme.text.muted }}>
                  <div>Base: €{payout.base}</div>
                  {payout.bonus > 0 && <div style={{ color: theme.accent.amber }}>Bonus: +€{payout.bonus}</div>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Discount Codes View
function DiscountCodesView({ codes, onRefresh }) {
  const [filter, setFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'percentage', 'freeShipping', 'bundle'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                background: filter === f ? theme.accent.purple : theme.bg.card,
                border: `1px solid ${filter === f ? theme.accent.purple : theme.border.default}`,
                borderRadius: '8px',
                color: filter === f ? '#fff' : theme.text.secondary,
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              {f === 'all' ? 'All Codes' : f === 'freeShipping' ? 'Free Shipping' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={onRefresh}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '8px',
            color: theme.text.secondary,
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} />
          Refresh Stats
        </button>
      </div>

      {/* Codes Table */}
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 150px 100px 100px 120px 120px 100px',
          gap: '16px',
          padding: '16px 24px',
          background: theme.bg.secondary,
          borderBottom: `1px solid ${theme.border.default}`,
          fontSize: '12px',
          color: theme.text.muted,
          textTransform: 'uppercase',
          fontWeight: '600',
        }}>
          <div>Influencer</div>
          <div>Code</div>
          <div>Discount</div>
          <div>Type</div>
          <div>Uses</div>
          <div>Revenue</div>
          <div>Action</div>
        </div>

        {/* Table Rows */}
        {codes.flatMap(inf =>
          inf.codes
            .filter(c => filter === 'all' || c.type === filter)
            .map((code, idx) => (
              <div
                key={`${inf.influencerId}-${code.code}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 150px 100px 100px 120px 120px 100px',
                  gap: '16px',
                  padding: '16px 24px',
                  borderBottom: `1px solid ${theme.border.default}`,
                  alignItems: 'center',
                }}
              >
                {idx === 0 && (
                  <div style={{ gridRow: `span ${inf.codes.filter(c => filter === 'all' || c.type === filter).length}` }}>
                    <div style={{ fontWeight: '500' }}>{inf.influencerName}</div>
                    <div style={{ color: theme.text.muted, fontSize: '12px' }}>{inf.handle}</div>
                  </div>
                )}
                {idx > 0 && <div />}
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: '600',
                  color: theme.accent.purple,
                  background: theme.accent.purple + '15',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  width: 'fit-content',
                }}>
                  {code.code}
                </div>
                <div style={{ fontWeight: '600', color: theme.accent.green }}>
                  {code.type === 'percentage' ? `${code.discount}%` : code.type === 'freeShipping' ? 'Free' : `${code.discount}%`}
                </div>
                <div>
                  <span style={{
                    padding: '4px 10px',
                    background: code.type === 'percentage' ? theme.accent.blue + '20' : code.type === 'freeShipping' ? theme.accent.green + '20' : theme.accent.amber + '20',
                    color: code.type === 'percentage' ? theme.accent.blue : code.type === 'freeShipping' ? theme.accent.green : theme.accent.amber,
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '500',
                  }}>
                    {code.type === 'freeShipping' ? 'Shipping' : code.type.charAt(0).toUpperCase() + code.type.slice(1)}
                  </span>
                </div>
                <div style={{ fontWeight: '600' }}>{code.uses.toLocaleString()}</div>
                <div style={{ fontWeight: '600', color: theme.accent.amber }}>€{code.revenue.toLocaleString()}</div>
                <button
                  onClick={() => copyToClipboard(code.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 12px',
                    background: copiedCode === code.code ? theme.accent.green : theme.bg.secondary,
                    border: 'none',
                    borderRadius: '6px',
                    color: copiedCode === code.code ? '#fff' : theme.text.secondary,
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {copiedCode === code.code ? <CheckCircle size={12} /> : <ExternalLink size={12} />}
                  {copiedCode === code.code ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

// Attribution Tracking View
function AttributionTrackingView({ performanceData }) {
  return (
    <div>
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 8px 0' }}>
          7-Day Attribution Window
        </h3>
        <p style={{ color: theme.text.secondary, fontSize: '13px', margin: '0 0 24px 0' }}>
          Track conversions attributed to each influencer within 7 days of code view/click
        </p>

        {/* Attribution Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {performanceData.slice(0, 6).map(inf => {
            const window = inf.attributionWindow || {};
            const maxVal = Math.max(...Object.values(window), 1);
            const totalConversions = Object.values(window).reduce((sum, v) => sum + v, 0);

            return (
              <div key={inf.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: theme.gradient.instagram,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                    }}>
                      {inf.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', fontSize: '14px' }}>{inf.name}</div>
                      <div style={{ color: theme.text.muted, fontSize: '11px' }}>{inf.handle}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: theme.accent.green }}>{totalConversions} conversions</div>
                    <div style={{ fontSize: '11px', color: theme.text.muted }}>7-day total</div>
                  </div>
                </div>

                {/* Day bars */}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'end', height: '60px' }}>
                  {['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'].map((day, i) => (
                    <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '100%',
                          height: `${(window[day] / maxVal) * 50}px`,
                          background: i === 0 ? theme.accent.green : `${theme.accent.blue}${Math.round(100 - i * 12)}`,
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.3s ease',
                          minHeight: '4px',
                        }}
                      />
                      <span style={{ fontSize: '10px', color: theme.text.muted, marginTop: '4px' }}>D{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attribution Insights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: theme.text.muted, fontSize: '12px', marginBottom: '8px' }}>Day 1 Conversion Rate</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: theme.accent.green }}>42%</div>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginTop: '4px' }}>
            of all conversions happen on day 1
          </div>
        </div>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: theme.text.muted, fontSize: '12px', marginBottom: '8px' }}>Avg Time to Convert</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: theme.accent.blue }}>2.3 days</div>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginTop: '4px' }}>
            weighted average conversion time
          </div>
        </div>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '12px',
          padding: '20px',
        }}>
          <div style={{ color: theme.text.muted, fontSize: '12px', marginBottom: '8px' }}>7-Day Attribution Rate</div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: theme.accent.purple }}>78%</div>
          <div style={{ fontSize: '12px', color: theme.text.secondary, marginTop: '4px' }}>
            conversions within 7-day window
          </div>
        </div>
      </div>
    </div>
  );
}

// Payouts View
function PayoutsView({ performanceData, calculatePayout }) {
  const [payoutPeriod, setPayoutPeriod] = useState('current');

  // Calculate totals
  const payoutSummary = performanceData.reduce((acc, inf) => {
    const payout = calculatePayout(inf);
    acc.totalBase += payout.base;
    acc.totalBonus += payout.bonus;
    acc.totalPayout += payout.total;
    if (inf.tier === 'GOLD') acc.goldCount++;
    if (inf.tier === 'SILVER') acc.silverCount++;
    if (inf.tier === 'BRONZE') acc.bronzeCount++;
    return acc;
  }, { totalBase: 0, totalBonus: 0, totalPayout: 0, goldCount: 0, silverCount: 0, bronzeCount: 0 });

  return (
    <div>
      {/* Payout Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '8px' }}>Total Payouts</div>
          <div style={{ fontSize: '36px', fontWeight: '700' }}>€{payoutSummary.totalPayout.toLocaleString()}</div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>This period</div>
        </div>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ color: theme.text.muted, fontSize: '13px', marginBottom: '8px' }}>Base Commissions</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.text.primary }}>€{payoutSummary.totalBase.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: theme.text.muted, marginTop: '4px' }}>10-15% of revenue</div>
        </div>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ color: theme.text.muted, fontSize: '13px', marginBottom: '8px' }}>Tier Bonuses</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.accent.amber }}>€{payoutSummary.totalBonus.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: theme.text.muted, marginTop: '4px' }}>Performance rewards</div>
        </div>
        <div style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '16px',
          padding: '24px',
        }}>
          <div style={{ color: theme.text.muted, fontSize: '13px', marginBottom: '8px' }}>Tier Breakdown</div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#fbbf24' }}>{payoutSummary.goldCount}</div>
              <div style={{ fontSize: '10px', color: theme.text.muted }}>Gold</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#94a3b8' }}>{payoutSummary.silverCount}</div>
              <div style={{ fontSize: '10px', color: theme.text.muted }}>Silver</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#d97706' }}>{payoutSummary.bronzeCount}</div>
              <div style={{ fontSize: '10px', color: theme.text.muted }}>Bronze</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Explanation */}
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>Commission Structure</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            borderRadius: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>🥇</span>
              <span style={{ fontWeight: '700', color: '#fbbf24' }}>GOLD TIER</span>
            </div>
            <div style={{ fontSize: '13px', color: theme.text.secondary, marginBottom: '8px' }}>ROI {'>'} 5.0x</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#fbbf24' }}>15%</div>
            <div style={{ fontSize: '12px', color: theme.text.muted }}>base + 50% bonus</div>
          </div>
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.1) 0%, rgba(100, 116, 139, 0.1) 100%)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>🥈</span>
              <span style={{ fontWeight: '700', color: '#94a3b8' }}>SILVER TIER</span>
            </div>
            <div style={{ fontSize: '13px', color: theme.text.secondary, marginBottom: '8px' }}>ROI {'>'} 4.0x</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8' }}>12%</div>
            <div style={{ fontSize: '12px', color: theme.text.muted }}>base + 25% bonus</div>
          </div>
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(146, 64, 14, 0.1) 100%)',
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>🥉</span>
              <span style={{ fontWeight: '700', color: '#d97706' }}>BRONZE TIER</span>
            </div>
            <div style={{ fontSize: '13px', color: theme.text.secondary, marginBottom: '8px' }}>ROI {'<'} 4.0x</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#d97706' }}>10%</div>
            <div style={{ fontSize: '12px', color: theme.text.muted }}>base commission only</div>
          </div>
        </div>
      </div>

      {/* Payout Table */}
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${theme.border.default}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Individual Payouts</h3>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: theme.accent.green,
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
          }}>
            <DollarSign size={14} />
            Process All Payouts
          </button>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 80px 120px 100px 100px 120px 150px',
          gap: '16px',
          padding: '12px 24px',
          background: theme.bg.secondary,
          fontSize: '11px',
          color: theme.text.muted,
          textTransform: 'uppercase',
          fontWeight: '600',
        }}>
          <div>Influencer</div>
          <div>Tier</div>
          <div>Revenue</div>
          <div>Base Rate</div>
          <div>Base</div>
          <div>Bonus</div>
          <div>Total Payout</div>
        </div>

        {/* Table Rows */}
        {performanceData.map(inf => {
          const payout = calculatePayout(inf);
          const tierColors = {
            GOLD: '#fbbf24',
            SILVER: '#94a3b8',
            BRONZE: '#d97706',
          };

          return (
            <div
              key={inf.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 80px 120px 100px 100px 120px 150px',
                gap: '16px',
                padding: '16px 24px',
                borderBottom: `1px solid ${theme.border.default}`,
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: theme.gradient.instagram,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '600',
                }}>
                  {inf.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{inf.name}</div>
                  <div style={{ color: theme.text.muted, fontSize: '11px' }}>{inf.handle}</div>
                </div>
              </div>
              <div>
                <span style={{
                  padding: '4px 10px',
                  background: tierColors[inf.tier] + '20',
                  color: tierColors[inf.tier],
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700',
                }}>
                  {inf.tier}
                </span>
              </div>
              <div style={{ fontWeight: '600' }}>€{(inf.totalRevenue || 0).toLocaleString()}</div>
              <div style={{ color: theme.text.secondary }}>{inf.baseRate}%</div>
              <div style={{ fontWeight: '500' }}>€{payout.base}</div>
              <div style={{ color: payout.bonus > 0 ? theme.accent.amber : theme.text.muted, fontWeight: '500' }}>
                {payout.bonus > 0 ? `+€${payout.bonus}` : '-'}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: theme.accent.green }}>
                  €{payout.total}
                </span>
                <button style={{
                  padding: '6px 12px',
                  background: theme.bg.secondary,
                  border: 'none',
                  borderRadius: '6px',
                  color: theme.text.secondary,
                  fontSize: '11px',
                  cursor: 'pointer',
                }}>
                  Pay
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Code Generator Modal
function CodeGeneratorModal({ influencers, onClose, onGenerate }) {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [codePrefix, setCodePrefix] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(20);

  const generateCode = () => {
    if (!selectedInfluencer) return;

    const inf = influencers.find(i => i.id === selectedInfluencer);
    const prefix = codePrefix || inf.name.split(' ')[0].toUpperCase().slice(0, 6);
    const newCode = {
      influencerId: inf.id,
      influencerName: inf.name,
      handle: inf.handle,
      codes: [{
        code: `${prefix}${discountValue}`,
        discount: discountValue,
        type: discountType,
        uses: 0,
        revenue: 0,
      }],
      totalUses: 0,
      totalRevenue: 0,
      conversionRate: '0.0',
      avgOrderValue: 0,
    };
    onGenerate([newCode]);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        width: '500px',
        background: theme.bg.secondary,
        borderRadius: '20px',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '24px',
          borderBottom: `1px solid ${theme.border.default}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>Generate Discount Code</h2>
          <button
            onClick={onClose}
            style={{
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.primary,
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {/* Select Influencer */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: theme.text.secondary, fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Select Influencer
            </label>
            <select
              value={selectedInfluencer || ''}
              onChange={(e) => setSelectedInfluencer(parseInt(e.target.value))}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: theme.bg.card,
                border: `1px solid ${theme.border.default}`,
                borderRadius: '8px',
                color: theme.text.primary,
                fontSize: '14px',
              }}
            >
              <option value="">Select an influencer...</option>
              {influencers.map(inf => (
                <option key={inf.id} value={inf.id}>{inf.name} ({inf.handle})</option>
              ))}
            </select>
          </div>

          {/* Code Prefix */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: theme.text.secondary, fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Code Prefix (optional)
            </label>
            <input
              type="text"
              value={codePrefix}
              onChange={(e) => setCodePrefix(e.target.value.toUpperCase())}
              placeholder="e.g., EMMA"
              maxLength={6}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: theme.bg.card,
                border: `1px solid ${theme.border.default}`,
                borderRadius: '8px',
                color: theme.text.primary,
                fontSize: '14px',
              }}
            />
          </div>

          {/* Discount Type */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: theme.text.secondary, fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Discount Type
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { id: 'percentage', label: 'Percentage' },
                { id: 'freeShipping', label: 'Free Shipping' },
                { id: 'bundle', label: 'Bundle Deal' },
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setDiscountType(type.id)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: discountType === type.id ? theme.accent.purple : theme.bg.card,
                    border: `1px solid ${discountType === type.id ? theme.accent.purple : theme.border.default}`,
                    borderRadius: '8px',
                    color: discountType === type.id ? '#fff' : theme.text.secondary,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Value */}
          {discountType !== 'freeShipping' && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ color: theme.text.secondary, fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                Discount Value (%)
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(parseInt(e.target.value) || 0)}
                min={5}
                max={50}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: theme.bg.card,
                  border: `1px solid ${theme.border.default}`,
                  borderRadius: '8px',
                  color: theme.text.primary,
                  fontSize: '14px',
                }}
              />
            </div>
          )}

          {/* Preview */}
          {selectedInfluencer && (
            <div style={{
              padding: '16px',
              background: theme.accent.purple + '10',
              border: `1px solid ${theme.accent.purple}30`,
              borderRadius: '12px',
              marginBottom: '24px',
            }}>
              <div style={{ color: theme.text.muted, fontSize: '12px', marginBottom: '8px' }}>Preview</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '24px',
                fontWeight: '700',
                color: theme.accent.purple,
              }}>
                {codePrefix || influencers.find(i => i.id === selectedInfluencer)?.name.split(' ')[0].toUpperCase().slice(0, 6) || 'CODE'}
                {discountType === 'freeShipping' ? 'FREE' : discountValue}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateCode}
            disabled={!selectedInfluencer}
            style={{
              width: '100%',
              padding: '14px',
              background: selectedInfluencer ? theme.gradient.purple : theme.bg.card,
              border: 'none',
              borderRadius: '10px',
              color: selectedInfluencer ? '#fff' : theme.text.muted,
              fontSize: '15px',
              fontWeight: '600',
              cursor: selectedInfluencer ? 'pointer' : 'not-allowed',
            }}
          >
            Generate Code
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DEMAND ORCHESTRATION COCKPIT
// The closed-loop mechanism: DETECT → EVALUATE → ORCHESTRATE → MEASURE → LEARN
// ============================================================

function OrchestrationCockpit({ trends, events, influencers, campaigns, onLaunchCampaign }) {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [launchConfig, setLaunchConfig] = useState(null);

  // Inventory positions with signal matching
  const inventoryPositions = [
    {
      sku: 'CAS-001',
      name: 'Casein Powder',
      units: 2400,
      shelfLife: 180,
      daysRemaining: 165,
      unitCost: 18.50,
      unitPrice: 34.99,
      bet: 'GOOD',
      expectedReturn: 12.4,
      matchedSignals: ['protein ice cream', 'overnight oats protein'],
      category: 'Protein',
    },
    {
      sku: 'WPI-002',
      name: 'Whey Isolate Vanilla',
      units: 1800,
      shelfLife: 240,
      daysRemaining: 210,
      unitCost: 22.00,
      unitPrice: 44.99,
      bet: 'GOOD',
      expectedReturn: 11.2,
      matchedSignals: ['protein coffee', 'morning shake'],
      category: 'Protein',
    },
    {
      sku: 'PRE-003',
      name: 'Pre-Workout Explosive',
      units: 960,
      shelfLife: 365,
      daysRemaining: 280,
      unitCost: 14.00,
      unitPrice: 29.99,
      bet: 'GOOD',
      expectedReturn: 15.2,
      matchedSignals: ['hyrox training', 'pre workout'],
      category: 'Performance',
    },
    {
      sku: 'BAR-004',
      name: 'Protein Bar Chocolate',
      units: 3200,
      shelfLife: 180,
      daysRemaining: 52,
      unitCost: 1.20,
      unitPrice: 2.99,
      bet: 'NEUTRAL',
      expectedReturn: 6.8,
      matchedSignals: ['high protein snacks', 'marathon rotterdam'],
      category: 'Snacks',
    },
    {
      sku: 'RTD-005',
      name: 'RTD Chocolate Shake',
      units: 4800,
      shelfLife: 90,
      daysRemaining: 28,
      unitCost: 2.80,
      unitPrice: 4.99,
      bet: 'BAD',
      expectedReturn: 2.1,
      matchedSignals: [],
      category: 'RTD',
    },
    {
      sku: 'GEL-006',
      name: 'Energy Gel Citrus',
      units: 6000,
      shelfLife: 365,
      daysRemaining: 320,
      unitCost: 0.85,
      unitPrice: 2.49,
      bet: 'GOOD',
      expectedReturn: 14.8,
      matchedSignals: ['marathon rotterdam', 'hyrox cologne'],
      category: 'Performance',
    },
    {
      sku: 'CRE-007',
      name: 'Creatine Monohydrate',
      units: 1200,
      shelfLife: 730,
      daysRemaining: 580,
      unitCost: 12.00,
      unitPrice: 24.99,
      bet: 'NEUTRAL',
      expectedReturn: 7.8,
      matchedSignals: ['hyrox training'],
      category: 'Performance',
    },
  ];

  // Generate orchestration opportunities based on signals + inventory
  const generateOpportunities = () => {
    const opportunities = [];

    // Find AMPLIFY opportunities (GOOD bets + SURGING/RISING trends)
    const surgingTrends = trends.filter(t => t.trend === 'SURGING' || t.trend === 'RISING');
    surgingTrends.forEach(trend => {
      const matchedProducts = inventoryPositions.filter(p =>
        p.bet === 'GOOD' &&
        p.matchedSignals.some(s => trend.keyword.toLowerCase().includes(s.split(' ')[0]) ||
          s.toLowerCase().includes(trend.keyword.split(' ')[0].toLowerCase()))
      );

      matchedProducts.forEach(product => {
        opportunities.push({
          id: `amp-${trend.id}-${product.sku}`,
          type: 'AMPLIFY',
          priority: trend.trend === 'SURGING' ? 'HIGH' : 'MEDIUM',
          signal: {
            type: 'trend',
            name: trend.keyword,
            change: trend.change,
            status: trend.trend,
            emoji: trend.emoji,
          },
          product: product,
          action: {
            name: `${trend.keyword.charAt(0).toUpperCase() + trend.keyword.slice(1)} Campaign`,
            description: `Ride the ${trend.keyword} trend wave with targeted content`,
            suggestedBudget: Math.round(product.units * 0.15),
            expectedLift: Math.round(trend.change * 0.3),
            expectedROI: (trend.change / 25).toFixed(1),
          },
          influencers: influencers.filter(i => i.status === 'Available').slice(0, 3),
        });
      });
    });

    // Find LIQUIDATE opportunities (BAD bets or expiring soon)
    const expiringProducts = inventoryPositions.filter(p =>
      p.bet === 'BAD' || p.daysRemaining < 45
    );

    expiringProducts.forEach(product => {
      opportunities.push({
        id: `liq-${product.sku}`,
        type: 'LIQUIDATE',
        priority: product.daysRemaining < 30 ? 'CRITICAL' : 'HIGH',
        signal: {
          type: 'expiry',
          name: `Expiring in ${product.daysRemaining} days`,
          change: -Math.round((1 - product.daysRemaining / product.shelfLife) * 100),
          status: product.daysRemaining < 30 ? 'CRITICAL' : 'WARNING',
          emoji: '⏰',
        },
        product: product,
        action: {
          name: 'Flash Sale Liquidation',
          description: `Clear ${product.units.toLocaleString()} units before expiry`,
          suggestedBudget: Math.round(product.units * product.unitCost * 0.02),
          expectedLift: 80,
          expectedROI: ((product.units * product.unitPrice * 0.6) / (product.units * product.unitCost * 0.02)).toFixed(0),
          marginSaved: Math.round(product.units * product.unitCost * 0.4),
        },
        influencers: influencers.filter(i => i.avgCost < 200).slice(0, 5),
      });
    });

    // Find SMOOTH opportunities (upcoming events)
    events.forEach(event => {
      const matchedProducts = inventoryPositions.filter(p =>
        p.matchedSignals.some(s => event.name.toLowerCase().includes(s.split(' ')[0]))
      );

      matchedProducts.forEach(product => {
        if (!opportunities.find(o => o.product.sku === product.sku && o.type !== 'LIQUIDATE')) {
          opportunities.push({
            id: `smooth-${event.id}-${product.sku}`,
            type: 'SMOOTH',
            priority: 'MEDIUM',
            signal: {
              type: 'event',
              name: event.name,
              change: event.demandLift,
              status: 'UPCOMING',
              emoji: event.icon,
              date: event.date,
            },
            product: product,
            action: {
              name: 'Pre-Event Awareness',
              description: `Build demand before ${event.name}`,
              suggestedBudget: Math.round(event.demandLift * 3),
              expectedLift: event.demandLift,
              expectedROI: (event.demandLift / 30).toFixed(1),
            },
            influencers: influencers.filter(i => i.niche === 'Fitness').slice(0, 2),
          });
        }
      });
    });

    return opportunities.sort((a, b) => {
      const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const opportunities = generateOpportunities();

  // Impact stats
  const impactStats = {
    capitalFreed: 127000,
    marginSaved: 45000,
    wasteAvoided: 38000,
    overallROI: 18.2,
    runningCampaigns: campaigns.length,
    pendingCampaigns: 3,
    completedCampaigns: 12,
    budgetUsed: 3240,
    budgetTotal: 8000,
  };

  const handleLaunch = (opportunity) => {
    setLaunchConfig(opportunity);
    setShowLaunchModal(true);
  };

  const confirmLaunch = () => {
    if (launchConfig) {
      onLaunchCampaign({
        name: launchConfig.action.name,
        type: launchConfig.type,
        trigger: launchConfig.signal,
        product: launchConfig.product,
        influencers: launchConfig.influencers.length,
        budget: launchConfig.action.suggestedBudget,
        expectedROI: launchConfig.action.expectedROI + 'x',
        expectedLift: launchConfig.action.expectedLift,
      });
      setShowLaunchModal(false);
      setLaunchConfig(null);
    }
  };

  return (
    <div>
      {/* Cockpit Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: theme.gradient.fire,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Zap size={22} color="#fff" />
            </div>
            Demand Orchestration Cockpit
            <span style={{
              padding: '4px 12px',
              background: theme.accent.green,
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: '600',
              animation: 'pulse 2s infinite',
            }}>
              LIVE
            </span>
          </h2>
          <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '8px 0 0 0' }}>
            Closed-loop demand orchestration: Detect → Evaluate → Orchestrate → Measure → Learn
          </p>
        </div>
      </div>

      {/* Top Row: Signal Radar + Inventory Heatmap */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Signal Radar */}
        <SignalRadar trends={trends} />

        {/* Inventory Heatmap */}
        <InventoryHeatmap positions={inventoryPositions} />
      </div>

      {/* Orchestration Opportunities */}
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '16px',
        marginBottom: '24px',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${theme.border.default}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>
              Orchestration Opportunities
            </h3>
            <p style={{ color: theme.text.secondary, fontSize: '13px', margin: '4px 0 0 0' }}>
              AI-matched signals to inventory positions with recommended actions
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              padding: '6px 12px',
              background: theme.accent.red + '20',
              color: theme.accent.red,
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {opportunities.filter(o => o.priority === 'CRITICAL').length} Critical
            </span>
            <span style={{
              padding: '6px 12px',
              background: theme.accent.amber + '20',
              color: theme.accent.amber,
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {opportunities.filter(o => o.priority === 'HIGH').length} High
            </span>
            <span style={{
              padding: '6px 12px',
              background: theme.accent.blue + '20',
              color: theme.accent.blue,
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
            }}>
              {opportunities.filter(o => o.priority === 'MEDIUM').length} Medium
            </span>
          </div>
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {opportunities.slice(0, 5).map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onLaunch={() => handleLaunch(opp)}
              onDetails={() => setSelectedOpportunity(opp)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Row: Active Campaigns + Impact Tracker */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Active Campaigns */}
        <ActiveCampaignsSidebar stats={impactStats} campaigns={campaigns} />

        {/* Impact Tracker */}
        <ImpactTracker stats={impactStats} />
      </div>

      {/* Launch Confirmation Modal */}
      {showLaunchModal && launchConfig && (
        <LaunchConfirmationModal
          config={launchConfig}
          onConfirm={confirmLaunch}
          onClose={() => setShowLaunchModal(false)}
        />
      )}
    </div>
  );
}

// Signal Radar Component
function SignalRadar({ trends }) {
  const topTrends = [...trends]
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);

  const getStatusColor = (trend) => {
    if (trend === 'SURGING') return theme.accent.red;
    if (trend === 'RISING') return theme.accent.amber;
    if (trend === 'STABLE') return theme.accent.blue;
    return theme.text.muted;
  };

  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '20px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
      }}>
        <Radio size={20} color={theme.accent.blue} />
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Signal Radar</h3>
        <span style={{
          marginLeft: 'auto',
          padding: '4px 10px',
          background: theme.accent.green + '20',
          color: theme.accent.green,
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
        }}>
          Live
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {topTrends.map((trend, i) => (
          <div
            key={trend.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: theme.bg.secondary,
              borderRadius: '10px',
              borderLeft: `3px solid ${getStatusColor(trend.trend)}`,
            }}
          >
            <span style={{ fontSize: '20px' }}>{trend.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>{trend.keyword}</div>
              <div style={{
                fontSize: '11px',
                color: getStatusColor(trend.trend),
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>
                {trend.trend}
              </div>
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: trend.change >= 0 ? theme.accent.green : theme.accent.red,
            }}>
              {trend.change >= 0 ? '+' : ''}{trend.change}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inventory Heatmap Component
function InventoryHeatmap({ positions }) {
  const [viewMode, setViewMode] = useState('heatmap'); // 'heatmap' or 'atp'
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getBetColor = (bet) => {
    if (bet === 'GOOD') return theme.accent.green;
    if (bet === 'NEUTRAL') return theme.accent.amber;
    return theme.accent.red;
  };

  const getBetEmoji = (bet) => {
    if (bet === 'GOOD') return '🟢';
    if (bet === 'NEUTRAL') return '🟡';
    return '🔴';
  };

  // Generate ATP data for each position
  const atpData = positions.map(pos => {
    const onHand = pos.units;
    const committed = Math.floor(pos.units * (0.15 + Math.random() * 0.25)); // 15-40% committed
    const inTransit = Math.floor(pos.units * (Math.random() * 0.15)); // 0-15% in transit
    const safetyStock = Math.floor(pos.units * 0.1); // 10% safety stock
    const atp = Math.max(0, onHand - committed - safetyStock);
    const atpPercent = Math.round((atp / onHand) * 100);

    // Generate 7-day ATP projection
    const projection = [];
    let runningATP = atp;
    for (let i = 0; i < 7; i++) {
      const dailyDemand = Math.floor(pos.units * (0.02 + Math.random() * 0.03)); // 2-5% daily
      const dailySupply = i === 3 ? inTransit : 0; // Supply arrives on day 3
      runningATP = Math.max(0, runningATP - dailyDemand + dailySupply);
      projection.push({
        day: i + 1,
        atp: runningATP,
        demand: dailyDemand,
        supply: dailySupply,
      });
    }

    return {
      ...pos,
      onHand,
      committed,
      inTransit,
      safetyStock,
      atp,
      atpPercent,
      projection,
      atpStatus: atpPercent > 50 ? 'HEALTHY' : atpPercent > 25 ? 'LOW' : 'CRITICAL',
    };
  });

  const getAtpColor = (status) => {
    if (status === 'HEALTHY') return theme.accent.green;
    if (status === 'LOW') return theme.accent.amber;
    return theme.accent.red;
  };

  // Summary stats
  const atpSummary = {
    totalOnHand: atpData.reduce((sum, p) => sum + p.onHand, 0),
    totalCommitted: atpData.reduce((sum, p) => sum + p.committed, 0),
    totalATP: atpData.reduce((sum, p) => sum + p.atp, 0),
    healthyCount: atpData.filter(p => p.atpStatus === 'HEALTHY').length,
    lowCount: atpData.filter(p => p.atpStatus === 'LOW').length,
    criticalCount: atpData.filter(p => p.atpStatus === 'CRITICAL').length,
  };

  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '20px',
    }}>
      {/* Header with View Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Package size={20} color={theme.accent.purple} />
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
            {viewMode === 'heatmap' ? 'Inventory Heatmap' : 'ATP Dashboard'}
          </h3>
        </div>
        <div style={{
          display: 'flex',
          background: theme.bg.secondary,
          borderRadius: '8px',
          padding: '3px',
        }}>
          <button
            onClick={() => setViewMode('heatmap')}
            style={{
              padding: '6px 12px',
              background: viewMode === 'heatmap' ? theme.accent.purple : 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: viewMode === 'heatmap' ? '#fff' : theme.text.muted,
              fontSize: '11px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Bets
          </button>
          <button
            onClick={() => setViewMode('atp')}
            style={{
              padding: '6px 12px',
              background: viewMode === 'atp' ? theme.accent.blue : 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: viewMode === 'atp' ? '#fff' : theme.text.muted,
              fontSize: '11px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            ATP
          </button>
        </div>
      </div>

      {viewMode === 'heatmap' ? (
        <>
          {/* Heatmap Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            marginBottom: '16px',
          }}>
            {positions.slice(0, 8).map(pos => (
              <div
                key={pos.sku}
                style={{
                  padding: '12px 8px',
                  background: getBetColor(pos.bet) + '15',
                  border: `1px solid ${getBetColor(pos.bet)}40`,
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{getBetEmoji(pos.bet)}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: theme.text.primary }}>
                  {pos.name.split(' ')[0]}
                </div>
                <div style={{ fontSize: '10px', color: theme.text.muted }}>{pos.sku}</div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '16px',
            padding: '12px',
            background: theme.bg.secondary,
            borderRadius: '8px',
            fontSize: '11px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🟢</span>
              <span style={{ color: theme.text.secondary }}>GOOD ({'>'}9.6% return)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🟡</span>
              <span style={{ color: theme.text.secondary }}>NEUTRAL (4-9.6%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔴</span>
              <span style={{ color: theme.text.secondary }}>BAD ({'<'}4%)</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ATP Summary Bar */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <div style={{
              flex: 1,
              padding: '12px',
              background: theme.bg.secondary,
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: theme.text.primary }}>
                {atpSummary.totalOnHand.toLocaleString()}
              </div>
              <div style={{ fontSize: '10px', color: theme.text.muted }}>On Hand</div>
            </div>
            <div style={{
              flex: 1,
              padding: '12px',
              background: theme.accent.amber + '15',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: theme.accent.amber }}>
                {atpSummary.totalCommitted.toLocaleString()}
              </div>
              <div style={{ fontSize: '10px', color: theme.text.muted }}>Committed</div>
            </div>
            <div style={{
              flex: 1,
              padding: '12px',
              background: theme.accent.green + '15',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: theme.accent.green }}>
                {atpSummary.totalATP.toLocaleString()}
              </div>
              <div style={{ fontSize: '10px', color: theme.text.muted }}>ATP</div>
            </div>
          </div>

          {/* ATP Grid with Bars */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '16px',
          }}>
            {atpData.slice(0, 5).map(item => (
              <div
                key={item.sku}
                onClick={() => setSelectedProduct(selectedProduct?.sku === item.sku ? null : item)}
                style={{
                  padding: '10px 12px',
                  background: selectedProduct?.sku === item.sku ? theme.bg.elevated : theme.bg.secondary,
                  border: `1px solid ${selectedProduct?.sku === item.sku ? theme.accent.blue : 'transparent'}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600' }}>{item.name.split(' ').slice(0, 2).join(' ')}</span>
                    <span style={{
                      padding: '2px 6px',
                      background: getAtpColor(item.atpStatus) + '20',
                      color: getAtpColor(item.atpStatus),
                      borderRadius: '4px',
                      fontSize: '9px',
                      fontWeight: '700',
                    }}>
                      {item.atpStatus}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: getAtpColor(item.atpStatus) }}>
                    {item.atpPercent}% ATP
                  </span>
                </div>

                {/* Stacked Bar */}
                <div style={{
                  height: '12px',
                  background: theme.bg.card,
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                }}>
                  {/* ATP (Available) */}
                  <div style={{
                    width: `${item.atpPercent}%`,
                    height: '100%',
                    background: theme.accent.green,
                    transition: 'width 0.3s ease',
                  }} />
                  {/* Committed */}
                  <div style={{
                    width: `${Math.round((item.committed / item.onHand) * 100)}%`,
                    height: '100%',
                    background: theme.accent.amber,
                    transition: 'width 0.3s ease',
                  }} />
                  {/* Safety Stock */}
                  <div style={{
                    width: `${Math.round((item.safetyStock / item.onHand) * 100)}%`,
                    height: '100%',
                    background: theme.accent.red + '60',
                    transition: 'width 0.3s ease',
                  }} />
                </div>

                {/* Expanded Details */}
                {selectedProduct?.sku === item.sku && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${theme.border.default}` }}>
                    {/* Quantity Breakdown */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '11px' }}>
                      <div>
                        <span style={{ color: theme.text.muted }}>On Hand: </span>
                        <span style={{ fontWeight: '600' }}>{item.onHand.toLocaleString()}</span>
                      </div>
                      <div>
                        <span style={{ color: theme.text.muted }}>Committed: </span>
                        <span style={{ fontWeight: '600', color: theme.accent.amber }}>{item.committed.toLocaleString()}</span>
                      </div>
                      <div>
                        <span style={{ color: theme.text.muted }}>In Transit: </span>
                        <span style={{ fontWeight: '600', color: theme.accent.blue }}>{item.inTransit.toLocaleString()}</span>
                      </div>
                      <div>
                        <span style={{ color: theme.text.muted }}>Safety: </span>
                        <span style={{ fontWeight: '600', color: theme.accent.red }}>{item.safetyStock.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* 7-Day ATP Projection */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '10px', color: theme.text.muted, marginBottom: '6px' }}>7-Day ATP Projection</div>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'end', height: '40px' }}>
                        {item.projection.map((day, i) => {
                          const maxAtp = Math.max(...item.projection.map(d => d.atp));
                          const height = maxAtp > 0 ? (day.atp / maxAtp) * 35 : 0;
                          const isLow = day.atp < item.safetyStock;
                          return (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <div style={{
                                width: '100%',
                                height: `${height}px`,
                                background: isLow ? theme.accent.red : theme.accent.blue,
                                borderRadius: '2px 2px 0 0',
                                minHeight: '4px',
                                position: 'relative',
                              }}>
                                {day.supply > 0 && (
                                  <div style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '8px',
                                  }}>📦</div>
                                )}
                              </div>
                              <span style={{ fontSize: '8px', color: theme.text.muted, marginTop: '2px' }}>D{day.day}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Warning if ATP goes critical */}
                    {item.projection.some(d => d.atp < item.safetyStock) && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        background: theme.accent.red + '15',
                        borderRadius: '6px',
                        fontSize: '10px',
                        color: theme.accent.red,
                      }}>
                        <AlertTriangle size={12} />
                        ATP drops below safety stock on Day {item.projection.findIndex(d => d.atp < item.safetyStock) + 1}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ATP Legend */}
          <div style={{
            display: 'flex',
            gap: '16px',
            padding: '10px 12px',
            background: theme.bg.secondary,
            borderRadius: '8px',
            fontSize: '10px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '8px', background: theme.accent.green, borderRadius: '2px' }} />
              <span style={{ color: theme.text.secondary }}>Available (ATP)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '8px', background: theme.accent.amber, borderRadius: '2px' }} />
              <span style={{ color: theme.text.secondary }}>Committed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '8px', background: theme.accent.red + '60', borderRadius: '2px' }} />
              <span style={{ color: theme.text.secondary }}>Safety Stock</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
              <span>📦</span>
              <span style={{ color: theme.text.secondary }}>Incoming Supply</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Opportunity Card Component
function OpportunityCard({ opportunity, onLaunch, onDetails }) {
  const opp = opportunity;

  const typeConfig = {
    AMPLIFY: {
      icon: '🎯',
      color: theme.accent.green,
      bg: theme.accent.green + '10',
      label: 'AMPLIFY',
      description: 'Ride the trend wave',
    },
    LIQUIDATE: {
      icon: '🚨',
      color: theme.accent.red,
      bg: theme.accent.red + '10',
      label: 'LIQUIDATE',
      description: 'Clear before expiry',
    },
    SMOOTH: {
      icon: '📊',
      color: theme.accent.blue,
      bg: theme.accent.blue + '10',
      label: 'SMOOTH',
      description: 'Pre-event preparation',
    },
  };

  const config = typeConfig[opp.type];

  const priorityColors = {
    CRITICAL: theme.accent.red,
    HIGH: theme.accent.amber,
    MEDIUM: theme.accent.blue,
    LOW: theme.text.muted,
  };

  return (
    <div style={{
      background: config.bg,
      border: `1px solid ${config.color}30`,
      borderRadius: '12px',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left Side */}
        <div style={{ flex: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>{config.icon}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '3px 10px',
                  background: config.color,
                  color: '#fff',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                }}>
                  {config.label}
                </span>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>
                  {opp.signal.name} × {opp.product.name}
                </span>
                <span style={{
                  padding: '2px 8px',
                  background: opp.product.bet === 'GOOD' ? theme.accent.green + '20' :
                    opp.product.bet === 'NEUTRAL' ? theme.accent.amber + '20' : theme.accent.red + '20',
                  color: opp.product.bet === 'GOOD' ? theme.accent.green :
                    opp.product.bet === 'NEUTRAL' ? theme.accent.amber : theme.accent.red,
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '600',
                }}>
                  {opp.product.bet}
                </span>
              </div>
            </div>
            <span style={{
              marginLeft: 'auto',
              padding: '4px 10px',
              background: priorityColors[opp.priority] + '20',
              color: priorityColors[opp.priority],
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: '700',
            }}>
              {opp.priority}
            </span>
          </div>

          {/* Signal Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: theme.text.secondary,
            marginBottom: '8px',
          }}>
            <span style={{ fontWeight: '500' }}>Signal:</span>
            <span style={{ color: opp.signal.change >= 0 ? theme.accent.green : theme.accent.red, fontWeight: '600' }}>
              {opp.signal.status} ({opp.signal.change >= 0 ? '+' : ''}{opp.signal.change}%
              {opp.signal.type === 'trend' ? ' search' : ''})
            </span>
          </div>

          {/* Inventory Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: theme.text.secondary,
            marginBottom: '8px',
          }}>
            <span style={{ fontWeight: '500' }}>Inventory:</span>
            <span>
              {opp.product.units.toLocaleString()} units,
              {opp.product.daysRemaining} days shelf life,
              {opp.product.expectedReturn}% return
            </span>
          </div>

          {/* Action */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: theme.text.secondary,
            marginBottom: '8px',
          }}>
            <span style={{ fontWeight: '500' }}>Action:</span>
            <span style={{ color: theme.text.primary }}>{opp.action.description}</span>
          </div>

          {/* Influencers */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: theme.text.secondary,
            marginBottom: '12px',
          }}>
            <span style={{ fontWeight: '500' }}>Influencers:</span>
            <span>
              {opp.influencers[0]?.handle || 'Multiple'} ({(opp.influencers[0]?.followers / 1000).toFixed(0)}K),
              {opp.influencers.length > 1 ? ` ${opp.influencers.length - 1} others` : ''}
            </span>
          </div>

          {/* Budget & ROI */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '12px 16px',
            background: theme.bg.card,
            borderRadius: '8px',
          }}>
            <div>
              <span style={{ color: theme.text.muted, fontSize: '11px' }}>Budget</span>
              <div style={{ fontWeight: '700', color: theme.text.primary }}>€{opp.action.suggestedBudget}</div>
            </div>
            <div style={{ color: theme.text.muted }}>→</div>
            <div>
              <span style={{ color: theme.text.muted, fontSize: '11px' }}>Expected ROI</span>
              <div style={{ fontWeight: '700', color: theme.accent.green }}>{opp.action.expectedROI}x</div>
            </div>
            <div>
              <span style={{ color: theme.text.muted, fontSize: '11px' }}>Expected Lift</span>
              <div style={{ fontWeight: '700', color: theme.accent.blue }}>+{opp.action.expectedLift}%</div>
            </div>
            {opp.action.marginSaved && (
              <div>
                <span style={{ color: theme.text.muted, fontSize: '11px' }}>Margin Saved</span>
                <div style={{ fontWeight: '700', color: theme.accent.amber }}>€{opp.action.marginSaved.toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Actions */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginLeft: '20px',
        }}>
          <button
            onClick={onLaunch}
            style={{
              padding: '12px 24px',
              background: config.color,
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Zap size={16} />
            Launch
          </button>
          <button
            onClick={onDetails}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.secondary,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Details
          </button>
          <button
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              color: theme.text.secondary,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}

// Active Campaigns Sidebar
function ActiveCampaignsSidebar({ stats, campaigns }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '20px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>
        Active Campaigns
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: theme.accent.green,
          }} />
          <span style={{ color: theme.text.secondary, fontSize: '14px' }}>Running:</span>
          <span style={{ fontWeight: '600', marginLeft: 'auto' }}>{stats.runningCampaigns + campaigns.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: theme.accent.amber,
          }} />
          <span style={{ color: theme.text.secondary, fontSize: '14px' }}>Pending:</span>
          <span style={{ fontWeight: '600', marginLeft: 'auto' }}>{stats.pendingCampaigns}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: theme.accent.blue,
          }} />
          <span style={{ color: theme.text.secondary, fontSize: '14px' }}>Completed:</span>
          <span style={{ fontWeight: '600', marginLeft: 'auto' }}>{stats.completedCampaigns}</span>
        </div>
      </div>

      {/* Budget Progress */}
      <div style={{
        padding: '16px',
        background: theme.bg.secondary,
        borderRadius: '10px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: theme.text.muted, fontSize: '12px' }}>Budget Used</span>
          <span style={{ fontWeight: '600', fontSize: '13px' }}>
            €{stats.budgetUsed.toLocaleString()} / €{stats.budgetTotal.toLocaleString()}
          </span>
        </div>
        <div style={{
          height: '8px',
          background: theme.bg.card,
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${(stats.budgetUsed / stats.budgetTotal) * 100}%`,
            background: theme.gradient.blue,
            borderRadius: '4px',
          }} />
        </div>
      </div>
    </div>
  );
}

// Impact Tracker Component
function ImpactTracker({ stats }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '16px',
      padding: '20px',
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0' }}>
        Impact Tracker
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{
          padding: '20px',
          background: theme.accent.green + '10',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '8px' }}>Capital Freed</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.accent.green }}>
            €{(stats.capitalFreed / 1000).toFixed(0)}K
          </div>
        </div>
        <div style={{
          padding: '20px',
          background: theme.accent.blue + '10',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '8px' }}>Margin Saved</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.accent.blue }}>
            €{(stats.marginSaved / 1000).toFixed(0)}K
          </div>
        </div>
        <div style={{
          padding: '20px',
          background: theme.accent.amber + '10',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '8px' }}>Waste Avoided</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.accent.amber }}>
            €{(stats.wasteAvoided / 1000).toFixed(0)}K
          </div>
        </div>
        <div style={{
          padding: '20px',
          background: theme.accent.purple + '10',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '8px' }}>Overall ROI</div>
          <div style={{ fontSize: '28px', fontWeight: '700', color: theme.accent.purple }}>
            {stats.overallROI}x
          </div>
        </div>
      </div>

      {/* Closed Loop Indicator */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: theme.bg.secondary,
        borderRadius: '10px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme.accent.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '700',
            }}>1</div>
            <span style={{ fontWeight: '500' }}>DETECT</span>
          </div>
          <div style={{ color: theme.text.muted }}>→</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme.accent.purple,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '700',
            }}>2</div>
            <span style={{ fontWeight: '500' }}>EVALUATE</span>
          </div>
          <div style={{ color: theme.text.muted }}>→</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme.accent.green,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '700',
            }}>3</div>
            <span style={{ fontWeight: '500' }}>ORCHESTRATE</span>
          </div>
          <div style={{ color: theme.text.muted }}>→</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme.accent.amber,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '700',
            }}>4</div>
            <span style={{ fontWeight: '500' }}>MEASURE</span>
          </div>
          <div style={{ color: theme.text.muted }}>→</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: theme.accent.cyan,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '700',
            }}>5</div>
            <span style={{ fontWeight: '500' }}>LEARN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Launch Confirmation Modal
function LaunchConfirmationModal({ config, onConfirm, onClose }) {
  const [step, setStep] = useState(1);

  const typeConfig = {
    AMPLIFY: { color: theme.accent.green, label: 'AMPLIFY CAMPAIGN' },
    LIQUIDATE: { color: theme.accent.red, label: 'LIQUIDATION CAMPAIGN' },
    SMOOTH: { color: theme.accent.blue, label: 'SMOOTHING CAMPAIGN' },
  };

  const style = typeConfig[config.type];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        width: '600px',
        background: theme.bg.secondary,
        borderRadius: '20px',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          background: style.color,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>{style.label}</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{config.action.name}</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Closed Loop Preview */}
          <div style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 16px 0' }}>
              Campaign Flow Preview
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Step 1: DETECT */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: theme.accent.blue,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}>1</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>DETECT Signal</div>
                  <div style={{ color: theme.text.secondary, fontSize: '12px' }}>
                    {config.signal.name}: {config.signal.status} ({config.signal.change >= 0 ? '+' : ''}{config.signal.change}%)
                  </div>
                </div>
              </div>

              {/* Step 2: EVALUATE */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: theme.accent.purple,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}>2</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>EVALUATE Inventory</div>
                  <div style={{ color: theme.text.secondary, fontSize: '12px' }}>
                    {config.product.name}: {config.product.units.toLocaleString()} units,
                    {config.product.daysRemaining} days remaining,
                    {config.product.bet} bet ({config.product.expectedReturn}% return)
                  </div>
                </div>
              </div>

              {/* Step 3: ORCHESTRATE */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: theme.accent.green,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}>3</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>ORCHESTRATE Demand</div>
                  <div style={{ color: theme.text.secondary, fontSize: '12px' }}>
                    Launch "{config.action.name}" with {config.influencers.length} influencers
                  </div>
                </div>
              </div>

              {/* Step 4: Expected MEASURE */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: theme.accent.amber,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}>4</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>Expected MEASURE</div>
                  <div style={{ color: theme.text.secondary, fontSize: '12px' }}>
                    +{config.action.expectedLift}% demand lift, {config.action.expectedROI}x ROI
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <div style={{
              padding: '16px',
              background: theme.bg.card,
              borderRadius: '10px',
              textAlign: 'center',
            }}>
              <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Budget</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: theme.text.primary }}>
                €{config.action.suggestedBudget}
              </div>
            </div>
            <div style={{
              padding: '16px',
              background: theme.bg.card,
              borderRadius: '10px',
              textAlign: 'center',
            }}>
              <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Influencers</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: theme.accent.purple }}>
                {config.influencers.length}
              </div>
            </div>
            <div style={{
              padding: '16px',
              background: theme.bg.card,
              borderRadius: '10px',
              textAlign: 'center',
            }}>
              <div style={{ color: theme.text.muted, fontSize: '11px', marginBottom: '4px' }}>Expected ROI</div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: theme.accent.green }}>
                {config.action.expectedROI}x
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={onConfirm}
            style={{
              width: '100%',
              padding: '16px',
              background: style.color,
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Zap size={20} />
            Launch Campaign
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
