// Signal Intelligence & Demand Orchestration Dashboard
// Location: apps/signal-intelligence/src/App.jsx

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Calendar, Target, DollarSign, Users, Zap, 
  Package, AlertTriangle, CheckCircle, Clock, Instagram,
  Youtube, TrendingDown, MapPin, Mail, ExternalLink
} from 'lucide-react';
import { getSocialTrends } from './data/socialTrends';

const theme = {
  bg: { primary: '#0a0a0f', secondary: '#12121a', card: 'rgba(255,255,255,0.02)' },
  border: { default: 'rgba(255,255,255,0.08)', hover: 'rgba(255,255,255,0.15)' },
  text: { primary: '#ffffff', secondary: '#888888', muted: '#666666' },
  accent: { blue: '#3b82f6', green: '#10b981', amber: '#fbbf24', red: '#ef4444' },
};

// Load/Save from localStorage
const loadLaunchedCampaigns = () => {
  try {
    const saved = localStorage.getItem('launchedCampaigns');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveLaunchedCampaigns = (campaigns) => {
  localStorage.setItem('launchedCampaigns', JSON.stringify(campaigns));
};

function App() {
  const [activeTab, setActiveTab] = useState('trends');
  const [launchedCampaigns, setLaunchedCampaigns] = useState(loadLaunchedCampaigns);
  
  // Social Trends - Now fetched from API
  const [trends, setTrends] = useState([]);
  const [loadingTrends, setLoadingTrends] = useState(true);

  useEffect(() => {
    saveLaunchedCampaigns(launchedCampaigns);
  }, [launchedCampaigns]);

  // Fetch social trends on mount
  useEffect(() => {
    getSocialTrends().then(data => {
      setTrends(data);
      setLoadingTrends(false);
    });
  }, []);

  // Mock Data: Events
  const events = [
    { 
      id: 1, 
      name: 'Hyrox Cologne', 
      date: '2026-01-20', 
      daysUntil: 10, 
      attendees: 2500, 
      impact: 'High',
      location: 'Cologne, Germany',
      products: ['Pre-Workout', 'Energy Gel', 'Creatine']
    },
    { 
      id: 2, 
      name: 'CrossFit Regional', 
      date: '2026-01-27', 
      daysUntil: 17, 
      attendees: 1200, 
      impact: 'Medium',
      location: 'Amsterdam, Netherlands',
      products: ['BCAA', 'Whey Protein']
    },
    { 
      id: 3, 
      name: 'Marathon Rotterdam', 
      date: '2026-02-10', 
      daysUntil: 31, 
      attendees: 8000, 
      impact: 'High',
      location: 'Rotterdam, Netherlands',
      products: ['Energy Gel', 'Electrolytes', 'Recovery Shake']
    },
    { 
      id: 4, 
      name: 'Bodybuilding Expo', 
      date: '2026-02-15', 
      daysUntil: 36, 
      attendees: 5000, 
      impact: 'High',
      location: 'Brussels, Belgium',
      products: ['Whey Isolate', 'Creatine', 'Mass Gainer']
    },
  ];

  // Mock Data: Campaign Recommendations
  const campaignRecommendations = [
    {
      id: 'camp1',
      name: 'Protein Ice Cream Recipe Challenge',
      type: 'Trend Amplify',
      trigger: 'Social trend + GOOD inventory',
      products: ['Casein Powder', 'Whey Isolate'],
      influencers: 3,
      budget: 450,
      expectedROI: '5.2x',
      urgency: 'High',
      inventoryBefore: { good: 2, neutral: 0, bad: 0 },
      inventoryAfter: { good: 2, neutral: 0, bad: 0 },
      demandIncrease: '+36%'
    },
    {
      id: 'camp2',
      name: 'Hyrox Ready Pack',
      type: 'Event Pre-Launch',
      trigger: 'Event in 10 days',
      products: ['Pre-Workout', 'Creatine', 'Energy Gel'],
      influencers: 2,
      budget: 320,
      expectedROI: '4.1x',
      urgency: 'High',
      inventoryBefore: { good: 3, neutral: 0, bad: 0 },
      inventoryAfter: { good: 3, neutral: 0, bad: 0 },
      demandIncrease: '+28%'
    },
    {
      id: 'camp3',
      name: 'RTD Chocolate Shake Clearance',
      type: 'Liquidation',
      trigger: 'BAD bet - 62 days shelf life',
      products: ['RTD Chocolate Shake'],
      influencers: 5,
      budget: 280,
      expectedROI: '3.8x',
      urgency: 'Critical',
      inventoryBefore: { good: 0, neutral: 0, bad: 1 },
      inventoryAfter: { good: 1, neutral: 0, bad: 0 },
      demandIncrease: '+125%'
    },
    {
      id: 'camp4',
      name: 'Office Athlete Wellness',
      type: 'Demand Smoothing',
      trigger: 'Demand spike predicted',
      products: ['Whey Protein', 'Multivitamin'],
      influencers: 4,
      budget: 380,
      expectedROI: '3.2x',
      urgency: 'Medium',
      inventoryBefore: { good: 1, neutral: 1, bad: 0 },
      inventoryAfter: { good: 2, neutral: 0, bad: 0 },
      demandIncrease: '+18%'
    },
  ];

  // Mock Data: Influencers
  const influencers = [
    {
      id: 1,
      name: 'Emma van Fitness',
      handle: '@emmavfit',
      platform: 'Instagram',
      followers: 45000,
      engagement: '6.8%',
      tier: 'Mid',
      niche: 'Fitness & Wellness',
      location: 'Amsterdam, NL',
      avgCost: 320,
      pastCampaigns: 3,
      avgROI: '4.2x',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Lars Athlete',
      handle: '@larsathlete',
      platform: 'Instagram',
      followers: 28000,
      engagement: '8.2%',
      tier: 'Micro',
      niche: 'CrossFit & HIIT',
      location: 'Berlin, DE',
      avgCost: 280,
      pastCampaigns: 5,
      avgROI: '5.1x',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Sophie Nutrition',
      handle: '@sophienutrition',
      platform: 'Instagram',
      followers: 67000,
      engagement: '5.4%',
      tier: 'Mid',
      niche: 'Nutrition & Recipes',
      location: 'Brussels, BE',
      avgCost: 420,
      pastCampaigns: 7,
      avgROI: '3.9x',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Max Endurance',
      handle: '@maxendurance',
      platform: 'YouTube',
      followers: 12000,
      engagement: '9.1%',
      tier: 'Micro',
      niche: 'Running & Endurance',
      location: 'Rotterdam, NL',
      avgCost: 180,
      pastCampaigns: 2,
      avgROI: '4.8x',
      status: 'Available'
    },
    {
      id: 5,
      name: 'Anna Strong',
      handle: '@annastrong',
      platform: 'Instagram',
      followers: 89000,
      engagement: '4.9%',
      tier: 'Mid',
      niche: 'Strength Training',
      location: 'Cologne, DE',
      avgCost: 550,
      pastCampaigns: 4,
      avgROI: '3.5x',
      status: 'In Campaign'
    },
    {
      id: 6,
      name: 'Tom Hyrox',
      handle: '@tomhyrox',
      platform: 'Instagram',
      followers: 34000,
      engagement: '7.3%',
      tier: 'Micro',
      niche: 'Hyrox & Functional',
      location: 'Amsterdam, NL',
      avgCost: 290,
      pastCampaigns: 6,
      avgROI: '5.4x',
      status: 'Available'
    },
  ];

  // Mock Data: Inventory Impact
  const inventoryPositions = [
    {
      sku: 'FIT-PRE-001',
      name: 'Pre-Workout Explosive',
      category: 'Pre-Workout',
      currentBet: 'GOOD',
      stockDays: 28,
      expectedReturn: 12.4,
      affectedBy: ['Hyrox Cologne event', 'Hyrox training trend'],
      campaignImpact: null
    },
    {
      sku: 'FIT-PRO-002',
      name: 'Whey Isolate Vanilla',
      category: 'Protein',
      currentBet: 'GOOD',
      stockDays: 35,
      expectedReturn: 11.2,
      affectedBy: ['Office Athlete trend'],
      campaignImpact: null
    },
    {
      sku: 'FIT-CAS-003',
      name: 'Casein Powder',
      category: 'Protein',
      currentBet: 'GOOD',
      stockDays: 42,
      expectedReturn: 10.8,
      affectedBy: ['Protein ice cream trend'],
      campaignImpact: 'Protein Ice Cream Challenge'
    },
    {
      sku: 'FIT-RTD-004',
      name: 'RTD Chocolate Shake',
      category: 'RTD',
      currentBet: 'BAD',
      stockDays: 65,
      expectedReturn: 2.1,
      affectedBy: ['Expiry in 62 days'],
      campaignImpact: 'RTD Chocolate Clearance'
    },
    {
      sku: 'FIT-ENG-005',
      name: 'Energy Gel Pack',
      category: 'Energy',
      currentBet: 'GOOD',
      stockDays: 18,
      expectedReturn: 15.2,
      affectedBy: ['Hyrox Cologne event', 'Marathon Rotterdam'],
      campaignImpact: 'Hyrox Ready Pack'
    },
    {
      sku: 'FIT-CRE-006',
      name: 'Creatine Monohydrate',
      category: 'Supplements',
      currentBet: 'NEUTRAL',
      stockDays: 45,
      expectedReturn: 7.8,
      affectedBy: ['Hyrox training trend'],
      campaignImpact: 'Hyrox Ready Pack'
    },
    {
      sku: 'FIT-BAR-007',
      name: 'Protein Bar Chocolate',
      category: 'Bars',
      currentBet: 'NEUTRAL',
      stockDays: 52,
      expectedReturn: 6.2,
      affectedBy: ['Low calorie snacks trend'],
      campaignImpact: null
    },
  ];

  const calculateTotalSpent = () => {
    const baseBudget = 800;
    const launchedBudget = launchedCampaigns.reduce((sum, camp) => sum + camp.budget, 0);
    return baseBudget + launchedBudget;
  };

  const handleLaunchCampaign = (campaign) => {
    const launched = {
      ...campaign,
      launchedAt: new Date().toISOString(),
      status: 'Active',
    };
    setLaunchedCampaigns([...launchedCampaigns, launched]);
  };

  const handleResetCampaigns = () => {
    if (confirm('Reset all launched campaigns? This will clear your demo data.')) {
      setLaunchedCampaigns([]);
    }
  };

  const isLaunched = (campaignId) => {
    return launchedCampaigns.some(c => c.id === campaignId);
  };

  const totalSpent = calculateTotalSpent();
  const activeCampaignsCount = 6 + launchedCampaigns.length;

  // Calculate inventory summary
  const inventorySummary = {
    good: inventoryPositions.filter(p => p.currentBet === 'GOOD').length,
    neutral: inventoryPositions.filter(p => p.currentBet === 'NEUTRAL').length,
    bad: inventoryPositions.filter(p => p.currentBet === 'BAD').length,
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.bg.primary, 
      color: theme.text.primary,
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Zap size={32} color={theme.accent.amber} />
          <h1 style={{ fontSize: '32px', fontWeight: '600', margin: 0 }}>
            Signal Intelligence & Demand Orchestration
          </h1>
        </div>
        <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
          Monitor market signals and orchestrate demand through influencer campaigns
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <StatCard 
          icon={<Target size={20} />}
          label="Active Campaigns"
          value={activeCampaignsCount}
          subtext={`${launchedCampaigns.length} launched today`}
          color={theme.accent.blue}
        />
        <StatCard 
          icon={<DollarSign size={20} />}
          label="Budget Spent"
          value={`€${totalSpent.toLocaleString()}`}
          subtext="This month"
          color={theme.accent.green}
        />
        <StatCard 
          icon={<TrendingUp size={20} />}
          label="Trending Topics"
          value={loadingTrends ? '...' : trends.length}
          subtext="High opportunity"
          color={theme.accent.amber}
        />
        <StatCard 
          icon={<Package size={20} />}
          label="Inventory Bets"
          value={`${inventorySummary.good}G / ${inventorySummary.neutral}N / ${inventorySummary.bad}B`}
          subtext="Good / Neutral / Bad"
          color={theme.accent.blue}
        />
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px',
        borderBottom: `1px solid ${theme.border.default}`,
        overflowX: 'auto',
      }}>
        <Tab active={activeTab === 'trends'} onClick={() => setActiveTab('trends')} label="Social Trends" />
        <Tab active={activeTab === 'events'} onClick={() => setActiveTab('events')} label="Events" />
        <Tab active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} label="Campaigns" badge={campaignRecommendations.length} />
        <Tab active={activeTab === 'launched'} onClick={() => setActiveTab('launched')} label="Launched" badge={launchedCampaigns.length} />
        <Tab active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Inventory Impact" />
        <Tab active={activeTab === 'influencers'} onClick={() => setActiveTab('influencers')} label="Influencers" />
      </div>

      {/* Content */}
      {activeTab === 'trends' && (
        loadingTrends ? (
          <div style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '8px',
            padding: '48px',
            textAlign: 'center',
          }}>
            <TrendingUp size={48} color={theme.text.muted} style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
              Loading Trends...
            </h3>
            <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
              Fetching market signals
            </p>
          </div>
        ) : (
          <TrendsView trends={trends} />
        )
      )}
      {activeTab === 'events' && <EventsView events={events} />}
      {activeTab === 'campaigns' && (
        <CampaignsView 
          campaigns={campaignRecommendations}
          onLaunch={handleLaunchCampaign}
          isLaunched={isLaunched}
        />
      )}
      {activeTab === 'launched' && (
        <LaunchedCampaignsView 
          campaigns={launchedCampaigns}
          onReset={handleResetCampaigns}
        />
      )}
      {activeTab === 'inventory' && (
        <InventoryImpactView 
          positions={inventoryPositions}
          launchedCampaigns={launchedCampaigns}
        />
      )}
      {activeTab === 'influencers' && <InfluencersView influencers={influencers} />}
    </div>
  );
}

// Components
function StatCard({ icon, label, value, subtext, color }) {
  return (
    <div style={{
      background: theme.bg.card,
      border: `1px solid ${theme.border.default}`,
      borderRadius: '8px',
      padding: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ color }}>{icon}</div>
        <span style={{ color: theme.text.secondary, fontSize: '14px' }}>{label}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '600', marginBottom: '4px' }}>{value}</div>
      {subtext && (
        <div style={{ fontSize: '12px', color: theme.text.muted }}>{subtext}</div>
      )}
    </div>
  );
}

function Tab({ active, onClick, label, badge }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: active ? theme.accent.blue : theme.text.secondary,
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
        cursor: 'pointer',
        borderBottom: active ? `2px solid ${theme.accent.blue}` : 'none',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {badge > 0 && (
        <span style={{
          background: theme.accent.blue,
          color: theme.bg.primary,
          fontSize: '12px',
          fontWeight: '600',
          padding: '2px 8px',
          borderRadius: '12px',
        }}>
          {badge}
        </span>
      )}
    </button>
  );
}

function TrendsView({ trends }) {
  // Handle empty trends
  if (!trends || trends.length === 0) {
    return (
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '8px',
        padding: '48px',
        textAlign: 'center',
      }}>
        <TrendingUp size={48} color={theme.text.muted} style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
          No Trends Available
        </h3>
        <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
          Check your API connection or try refreshing
        </p>
      </div>
    );
  }

  // Map the trends data to display format with safe fallbacks
  const mappedTrends = trends.map(trend => {
    // Calculate volume safely
    let volume = 0;
    if (trend.platforms?.googleTrends?.interestScore) {
      volume = trend.platforms.googleTrends.interestScore * 100;
    } else if (trend.currentVolume) {
      volume = trend.currentVolume;
    } else if (trend.volume) {
      volume = trend.volume;
    }

    // Calculate change safely
    let change = '+0%';
    if (trend.change) {
      change = trend.change;
    } else if (trend.weeklyChange !== undefined) {
      change = `${trend.weeklyChange > 0 ? '+' : ''}${Math.round(trend.weeklyChange)}%`;
    } else if (trend.platforms?.googleTrends?.growth7d !== undefined) {
      const growth = Math.round(trend.platforms.googleTrends.growth7d * 100);
      change = `${growth > 0 ? '+' : ''}${growth}%`;
    }

    // Get products safely
    let products = [];
    if (trend.productMatches) {
      products = trend.productMatches.map(p => p.productCategory).slice(0, 3);
    } else if (Array.isArray(trend.products)) {
      products = trend.products;
    }

    return {
      id: trend.id,
      keyword: trend.name || trend.keyword || 'Unknown Trend',
      volume: volume,
      change: change,
      category: trend.type || trend.category || 'Market Signal',
      opportunity: trend.urgency || trend.opportunity || 'Medium',
      products: products,
      inventoryImpact: trend.inventoryImpact || (
        trend.lifecycle === 'EMERGING' || trend.lifecycle === 'GROWING' ? 'GOOD' :
        trend.lifecycle === 'DECLINING' ? 'BAD' : 'NEUTRAL'
      )
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {mappedTrends.map(trend => (
        <div key={trend.id} style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', margin: 0 }}>
                  {trend.keyword}
                </h3>
                <span style={{
                  background: getBetColor(trend.inventoryImpact),
                  color: theme.bg.primary,
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}>
                  {trend.inventoryImpact}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: theme.text.secondary, marginBottom: '8px' }}>
                <span>Interest: {Math.round(trend.volume || 0).toLocaleString()}</span>
                <span>Category: {trend.category}</span>
                <span>Signal: {trend.opportunity}</span>
              </div>
              <div style={{ fontSize: '13px', color: theme.text.muted }}>
                Products: {trend.products.length > 0 ? trend.products.join(', ') : 'N/A'}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                color: trend.change.includes('+') ? theme.accent.green : theme.accent.red, 
                fontSize: '20px', 
                fontWeight: '600' 
              }}>
                {trend.change}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EventsView({ events }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {events.map(event => (
        <div key={event.id} style={{
          background: theme.bg.card,
          border: `1px solid ${theme.border.default}`,
          borderRadius: '8px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 8px 0' }}>
                {event.name}
              </h3>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: theme.text.secondary, marginBottom: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} />
                  {event.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  {event.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} />
                  {event.attendees.toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: theme.text.muted }}>
                Products: {event.products.join(', ')}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: '600', color: theme.accent.amber, marginBottom: '4px' }}>
                {event.daysUntil}
              </div>
              <div style={{ fontSize: '12px', color: theme.text.muted }}>
                days until
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CampaignsView({ campaigns, onLaunch, isLaunched }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {campaigns.map(campaign => {
        const launched = isLaunched(campaign.id);
        
        return (
          <div key={campaign.id} style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '8px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', margin: 0 }}>
                    {campaign.name}
                  </h3>
                  <span style={{
                    background: campaign.urgency === 'Critical' ? theme.accent.red : 
                               campaign.urgency === 'High' ? theme.accent.amber : 
                               theme.accent.blue,
                    color: theme.bg.primary,
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '4px 12px',
                    borderRadius: '12px',
                  }}>
                    {campaign.urgency}
                  </span>
                  {launched && (
                    <span style={{
                      background: theme.accent.green,
                      color: theme.bg.primary,
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '12px',
                    }}>
                      LAUNCHED
                    </span>
                  )}
                </div>
                <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '0 0 12px 0' }}>
                  {campaign.type} • {campaign.trigger}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div>
                    <span style={{ color: theme.text.muted }}>Products: </span>
                    <span style={{ color: theme.text.primary }}>{campaign.products.join(', ')}</span>
                  </div>
                  <div>
                    <span style={{ color: theme.text.muted }}>Influencers: </span>
                    <span style={{ color: theme.text.primary }}>{campaign.influencers}</span>
                    <span style={{ color: theme.text.muted, marginLeft: '16px' }}>Demand Increase: </span>
                    <span style={{ color: theme.accent.green }}>{campaign.demandIncrease}</span>
                  </div>
                  <div>
                    <span style={{ color: theme.text.muted }}>Inventory Impact: </span>
                    <span style={{ color: theme.text.primary }}>
                      {campaign.inventoryBefore.good}G/{campaign.inventoryBefore.neutral}N/{campaign.inventoryBefore.bad}B
                    </span>
                    <span style={{ margin: '0 8px' }}>→</span>
                    <span style={{ color: theme.accent.green }}>
                      {campaign.inventoryAfter.good}G/{campaign.inventoryAfter.neutral}N/{campaign.inventoryAfter.bad}B
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginLeft: '24px' }}>
                <div style={{ fontSize: '24px', fontWeight: '600', color: theme.accent.green, marginBottom: '4px' }}>
                  {campaign.expectedROI}
                </div>
                <div style={{ fontSize: '14px', color: theme.text.secondary, marginBottom: '12px' }}>
                  Expected ROI
                </div>
                <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '16px' }}>
                  €{campaign.budget}
                </div>
                {!launched && (
                  <button
                    onClick={() => onLaunch(campaign)}
                    style={{
                      background: theme.accent.blue,
                      color: theme.bg.primary,
                      border: 'none',
                      borderRadius: '6px',
                      padding: '10px 24px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => e.target.style.background = '#2563eb'}
                    onMouseOut={(e) => e.target.style.background = theme.accent.blue}
                  >
                    Launch Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LaunchedCampaignsView({ campaigns, onReset }) {
  if (campaigns.length === 0) {
    return (
      <div style={{
        background: theme.bg.card,
        border: `1px solid ${theme.border.default}`,
        borderRadius: '8px',
        padding: '48px',
        textAlign: 'center',
      }}>
        <Target size={48} color={theme.text.muted} style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
          No Campaigns Launched Yet
        </h3>
        <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
          Launch campaigns from the Campaigns tab to track them here
        </p>
      </div>
    );
  }

  const totalSpent = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalExpectedValue = campaigns.reduce((sum, c) => {
    const roi = parseFloat(c.expectedROI.replace('x', ''));
    return sum + (c.budget * roi);
  }, 0);

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
            {campaigns.length} Active Campaigns
          </h2>
          <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
            Total Budget: €{totalSpent.toLocaleString()} • Expected Value: €{Math.round(totalExpectedValue).toLocaleString()}
          </p>
        </div>
        <button
          onClick={onReset}
          style={{
            background: 'transparent',
            color: theme.accent.red,
            border: `1px solid ${theme.accent.red}`,
            borderRadius: '6px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          Reset Demo Data
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {campaigns.map(campaign => (
          <div key={campaign.id} style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                  {campaign.name}
                </h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: theme.text.secondary, flexWrap: 'wrap' }}>
                  <span>Type: {campaign.type}</span>
                  <span>Influencers: {campaign.influencers}</span>
                  <span>Launched: {new Date(campaign.launchedAt).toLocaleDateString()}</span>
                  <span style={{ color: theme.accent.green }}>Expected ROI: {campaign.expectedROI}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '20px', fontWeight: '600', color: theme.accent.green }}>
                  €{campaign.budget}
                </div>
                <div style={{ fontSize: '12px', color: theme.text.muted }}>
                  Campaign Budget
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryImpactView({ positions, launchedCampaigns }) {
  const launchedCampaignNames = launchedCampaigns.map(c => c.name);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
          Inventory Positions Affected by Signals
        </h2>
        <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
          How campaigns and market signals impact your inventory bets
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {positions.map(position => {
          const isAffectedByLaunchedCampaign = position.campaignImpact && 
            launchedCampaignNames.includes(position.campaignImpact);

          return (
            <div key={position.sku} style={{
              background: theme.bg.card,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '8px',
              padding: '20px',
              opacity: isAffectedByLaunchedCampaign ? 1 : 0.7,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '500', margin: 0 }}>
                      {position.name}
                    </h3>
                    <span style={{
                      background: getBetColor(position.currentBet),
                      color: theme.bg.primary,
                      fontSize: '12px',
                      fontWeight: '600',
                      padding: '4px 12px',
                      borderRadius: '12px',
                    }}>
                      {position.currentBet} BET
                    </span>
                    {isAffectedByLaunchedCampaign && (
                      <span style={{
                        background: theme.accent.blue,
                        color: theme.bg.primary,
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 12px',
                        borderRadius: '12px',
                      }}>
                        ACTIVE CAMPAIGN
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: theme.text.secondary, marginBottom: '8px' }}>
                    <span>SKU: {position.sku}</span>
                    <span>Category: {position.category}</span>
                    <span>Stock: {position.stockDays} days</span>
                    <span style={{ color: position.expectedReturn > 9.6 ? theme.accent.green : 
                                          position.expectedReturn > 4 ? theme.accent.amber : 
                                          theme.accent.red }}>
                      Return: {position.expectedReturn}%
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: theme.text.muted, marginBottom: '8px' }}>
                    Affected by: {position.affectedBy.join(', ')}
                  </div>
                  {position.campaignImpact && (
                    <div style={{ 
                      fontSize: '13px', 
                      color: isAffectedByLaunchedCampaign ? theme.accent.blue : theme.text.muted,
                      fontWeight: isAffectedByLaunchedCampaign ? '500' : 'normal'
                    }}>
                      {isAffectedByLaunchedCampaign ? '🎯 ' : ''}
                      Campaign: {position.campaignImpact}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  {position.currentBet === 'GOOD' && <CheckCircle size={32} color={theme.accent.green} />}
                  {position.currentBet === 'NEUTRAL' && <Clock size={32} color={theme.accent.amber} />}
                  {position.currentBet === 'BAD' && <AlertTriangle size={32} color={theme.accent.red} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InfluencersView({ influencers }) {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
          Influencer Database
        </h2>
        <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
          Your network of fitness and nutrition influencers in Benelux & DACH
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {influencers.map(influencer => (
          <div key={influencer.id} style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: theme.bg.secondary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '600',
              }}>
                {influencer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0' }}>
                  {influencer.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: theme.text.secondary }}>
                  {influencer.platform === 'Instagram' ? <Instagram size={14} /> : <Youtube size={14} />}
                  <span>{influencer.handle}</span>
                </div>
              </div>
              <span style={{
                background: influencer.status === 'Available' ? theme.accent.green : theme.accent.amber,
                color: theme.bg.primary,
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 8px',
                borderRadius: '8px',
              }}>
                {influencer.status}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.text.muted }}>Followers:</span>
                <span style={{ color: theme.text.primary, fontWeight: '500' }}>{influencer.followers.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.text.muted }}>Engagement:</span>
                <span style={{ color: theme.accent.green, fontWeight: '500' }}>{influencer.engagement}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.text.muted }}>Avg Cost:</span>
                <span style={{ color: theme.text.primary, fontWeight: '500' }}>€{influencer.avgCost}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.text.muted }}>Past Campaigns:</span>
                <span style={{ color: theme.text.primary, fontWeight: '500' }}>{influencer.pastCampaigns}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: theme.text.muted }}>Avg ROI:</span>
                <span style={{ color: theme.accent.green, fontWeight: '500' }}>{influencer.avgROI}</span>
              </div>
            </div>

            <div style={{ 
              padding: '8px 0',
              borderTop: `1px solid ${theme.border.default}`,
              fontSize: '12px',
              color: theme.text.muted,
            }}>
              <div>{influencer.niche}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <MapPin size={12} />
                {influencer.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getBetColor(bet) {
  switch (bet) {
    case 'GOOD': return theme.accent.green;
    case 'NEUTRAL': return theme.accent.amber;
    case 'BAD': return theme.accent.red;
    default: return theme.text.muted;
  }
}

export default App;
