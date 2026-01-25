import React, { useState, useMemo } from 'react';
import { BarChart3, Package, TrendingUp, TrendingDown, AlertTriangle, Check, Clock, Users, Target, Zap, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { products } from './data/products';
import { influencers } from './data/influencers';
import { events } from './data/events';

// =============================================================================
// INVENTORY-FIRST SENSAI PROTOTYPE
// =============================================================================
// This prototype starts with INVENTORY and recommends campaigns to move SKUs
// Flow: Inventory Status → Action Needed → Campaign Recommendations
// =============================================================================

export default function InventoryApp() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Categorize inventory by action needed
  const inventoryCategories = useMemo(() => {
    const critical = []; // Needs liquidation
    const amplify = [];  // Opportunity to push
    const stable = [];   // Healthy, no action needed

    products.forEach(product => {
      const analysis = analyzeInventoryStatus(product);

      if (analysis.action === 'LIQUIDATE') {
        critical.push({ ...product, analysis });
      } else if (analysis.action === 'AMPLIFY') {
        amplify.push({ ...product, analysis });
      } else {
        stable.push({ ...product, analysis });
      }
    });

    return { critical, amplify, stable };
  }, []);

  const currentInventory = useMemo(() => {
    if (selectedCategory === 'CRITICAL') return inventoryCategories.critical;
    if (selectedCategory === 'AMPLIFY') return inventoryCategories.amplify;
    if (selectedCategory === 'STABLE') return inventoryCategories.stable;
    return [...inventoryCategories.critical, ...inventoryCategories.amplify, ...inventoryCategories.stable];
  }, [selectedCategory, inventoryCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-7 h-7 text-indigo-600" />
                SensAI Inventory Command
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Inventory-first campaign intelligence
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Total SKUs</div>
              <div className="text-2xl font-bold text-slate-900">{products.length}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Inventory Status Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <InventoryStatusCard
            title="🔴 Critical"
            subtitle="Needs Liquidation"
            count={inventoryCategories.critical.length}
            color="red"
            isSelected={selectedCategory === 'CRITICAL'}
            onClick={() => setSelectedCategory('CRITICAL')}
            totalValue={calculateTotalValue(inventoryCategories.critical)}
          />
          <InventoryStatusCard
            title="🟡 Amplify"
            subtitle="Push Opportunity"
            count={inventoryCategories.amplify.length}
            color="amber"
            isSelected={selectedCategory === 'AMPLIFY'}
            onClick={() => setSelectedCategory('AMPLIFY')}
            totalValue={calculateTotalValue(inventoryCategories.amplify)}
          />
          <InventoryStatusCard
            title="🟢 Stable"
            subtitle="Healthy Stock"
            count={inventoryCategories.stable.length}
            color="green"
            isSelected={selectedCategory === 'STABLE'}
            onClick={() => setSelectedCategory('STABLE')}
            totalValue={calculateTotalValue(inventoryCategories.stable)}
          />
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 gap-6">
          {currentInventory.map(product => (
            <InventoryProductCard
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
              isSelected={selectedProduct?.id === product.id}
            />
          ))}
        </div>

        {/* Campaign Recommendations Modal */}
        {selectedProduct && (
          <CampaignRecommendationsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
}

// =============================================================================
// INVENTORY ANALYSIS ENGINE
// =============================================================================

function analyzeInventoryStatus(product) {
  const inv = product.inventory;
  const shelfLife = product.shelfLifeRemaining;
  const betQuality = product.betQuality;

  const reasons = [];
  let action = 'STABLE';
  let urgencyScore = 0;
  let recommendedCampaignBudget = 0;

  // Check for liquidation triggers
  if (betQuality === 'BAD') {
    reasons.push('Poor inventory bet');
    urgencyScore += 40;
  }

  if (shelfLife < 90) {
    reasons.push(`Only ${shelfLife} days shelf life`);
    urgencyScore += 35;
  }

  if (inv.daysOfSupply > 60) {
    reasons.push(`${inv.daysOfSupply} days of excess supply`);
    urgencyScore += 25;
  }

  // Determine action
  if (urgencyScore >= 40) {
    action = 'LIQUIDATE';
    recommendedCampaignBudget = calculateLiquidationBudget(product);
  } else if (betQuality === 'GOOD' && inv.daysOfSupply < 60 && shelfLife > 90) {
    // Good opportunity to amplify
    const velocity = inv.totalOnHand / inv.daysOfSupply;
    if (velocity > 50) { // High velocity product
      action = 'AMPLIFY';
      urgencyScore = 30;
      reasons.push('High-velocity product, amplify demand');
      recommendedCampaignBudget = calculateAmplifyBudget(product);
    }
  }

  return {
    action,
    urgencyScore,
    reasons,
    recommendedCampaignBudget,
    projectedRevenueLoss: action === 'LIQUIDATE' ? calculateRevenueLoss(product) : 0,
    recommendedDiscount: action === 'LIQUIDATE' ? calculateRecommendedDiscount(product) : 0,
  };
}

function calculateLiquidationBudget(product) {
  // Budget should be ~5-10% of inventory value to liquidate
  const inventoryValue = product.inventory.totalOnHand * product.pricing.costPrice;
  return Math.round(inventoryValue * 0.08);
}

function calculateAmplifyBudget(product) {
  // Budget based on potential revenue lift
  const dailyRevenue = product.inventory.avgDailyDemand * product.pricing.retailPrice;
  const campaignDuration = 14; // days
  const targetLift = 0.35; // 35% lift
  const expectedRevenueLift = dailyRevenue * campaignDuration * targetLift;

  // Budget at 25% of expected lift revenue
  return Math.round(expectedRevenueLift * 0.25);
}

function calculateRevenueLoss(product) {
  const excessUnits = Math.max(0, product.inventory.totalOnHand - (product.inventory.avgDailyDemand * 45));
  return Math.round(excessUnits * product.pricing.retailPrice);
}

function calculateRecommendedDiscount(product) {
  if (product.shelfLifeRemaining < 60) return 0.25; // 25% off
  if (product.shelfLifeRemaining < 90) return 0.20; // 20% off
  if (product.inventory.daysOfSupply > 60) return 0.15; // 15% off
  return 0.10;
}

function calculateTotalValue(products) {
  return products.reduce((sum, p) => {
    return sum + (p.inventory.totalOnHand * p.pricing.costPrice);
  }, 0);
}

// =============================================================================
// COMPONENTS
// =============================================================================

function InventoryStatusCard({ title, subtitle, count, color, isSelected, onClick, totalValue }) {
  const colorClasses = {
    red: 'border-red-200 bg-red-50 hover:bg-red-100',
    amber: 'border-amber-200 bg-amber-50 hover:bg-amber-100',
    green: 'border-green-200 bg-green-50 hover:bg-green-100',
  };

  const selectedClasses = {
    red: 'ring-2 ring-red-500',
    amber: 'ring-2 ring-amber-500',
    green: 'ring-2 ring-green-500',
  };

  return (
    <button
      onClick={onClick}
      className={`
        border-2 rounded-xl p-6 text-left transition-all
        ${colorClasses[color]}
        ${isSelected ? selectedClasses[color] : ''}
      `}
    >
      <div className="text-3xl mb-2">{title.split(' ')[0]}</div>
      <div className="text-lg font-bold text-slate-900">{title.split(' ')[1]}</div>
      <div className="text-sm text-slate-600 mb-3">{subtitle}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-slate-900">{count}</div>
        <div className="text-sm text-slate-600">SKUs</div>
      </div>
      <div className="text-xs text-slate-500 mt-2">
        €{Math.round(totalValue).toLocaleString()} inventory value
      </div>
    </button>
  );
}

function InventoryProductCard({ product, onClick, isSelected }) {
  const analysis = product.analysis;
  const inv = product.inventory;

  const actionColors = {
    LIQUIDATE: 'border-red-300 bg-red-50',
    AMPLIFY: 'border-amber-300 bg-amber-50',
    STABLE: 'border-green-300 bg-green-50',
  };

  const actionIcons = {
    LIQUIDATE: <AlertTriangle className="w-5 h-5 text-red-600" />,
    AMPLIFY: <TrendingUp className="w-5 h-5 text-amber-600" />,
    STABLE: <Check className="w-5 h-5 text-green-600" />,
  };

  return (
    <div
      className={`
        border-2 rounded-xl p-6 cursor-pointer transition-all
        ${actionColors[analysis.action]}
        ${isSelected ? 'ring-4 ring-indigo-500 shadow-lg' : 'hover:shadow-md'}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        {/* Product Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {actionIcons[analysis.action]}
            <div>
              <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
              <div className="text-sm text-slate-600">{product.sku}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {/* Inventory Stats */}
            <div>
              <div className="text-xs text-slate-600">On Hand</div>
              <div className="text-lg font-bold text-slate-900">
                {inv.totalOnHand.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">units</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Days of Supply</div>
              <div className={`text-lg font-bold ${inv.daysOfSupply > 60 ? 'text-red-600' : 'text-slate-900'}`}>
                {inv.daysOfSupply}
              </div>
              <div className="text-xs text-slate-500">days</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Shelf Life</div>
              <div className={`text-lg font-bold ${product.shelfLifeRemaining < 90 ? 'text-red-600' : 'text-slate-900'}`}>
                {product.shelfLifeRemaining}
              </div>
              <div className="text-xs text-slate-500">days left</div>
            </div>
            <div>
              <div className="text-xs text-slate-600">Bet Quality</div>
              <div className={`text-lg font-bold ${
                product.betQuality === 'GOOD' ? 'text-green-600' :
                product.betQuality === 'NEUTRAL' ? 'text-amber-600' : 'text-red-600'
              }`}>
                {product.betQuality}
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="mt-4 p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-xs font-semibold text-slate-700 mb-1">Action Required:</div>
            <div className="text-sm font-bold text-slate-900 mb-2">{analysis.action}</div>
            <ul className="text-xs text-slate-600 space-y-1">
              {analysis.reasons.map((reason, idx) => (
                <li key={idx}>• {reason}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="ml-6 text-right">
          <div className="text-xs text-slate-600">Recommended Budget</div>
          <div className="text-2xl font-bold text-indigo-600">
            €{Math.round(analysis.recommendedCampaignBudget).toLocaleString()}
          </div>
          {analysis.projectedRevenueLoss > 0 && (
            <div className="mt-2 text-xs text-red-600">
              €{Math.round(analysis.projectedRevenueLoss).toLocaleString()} at risk
            </div>
          )}
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
            View Campaigns
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CampaignRecommendationsModal({ product, onClose }) {
  const campaigns = useMemo(() => generateCampaignsForProduct(product), [product]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Campaign Recommendations</h2>
          <p className="text-indigo-100">{product.name} • {product.sku}</p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Product Status Summary */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Inventory Status</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-slate-600">Action Needed</div>
                <div className="text-xl font-bold text-slate-900">{product.analysis.action}</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Urgency Score</div>
                <div className="text-xl font-bold text-slate-900">{product.analysis.urgencyScore}/100</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Budget Recommended</div>
                <div className="text-xl font-bold text-indigo-600">
                  €{Math.round(product.analysis.recommendedCampaignBudget).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Days of Supply</div>
                <div className="text-xl font-bold text-slate-900">{product.inventory.daysOfSupply}</div>
              </div>
            </div>
          </div>

          {/* Campaign Recommendations */}
          <div className="space-y-4">
            {campaigns.map((campaign, idx) => (
              <CampaignCard key={idx} campaign={campaign} product={product} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Launch Selected Campaigns
          </button>
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ campaign, product }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
      {/* Campaign Header */}
      <div
        className="bg-white p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                campaign.type === 'INFLUENCER' ? 'bg-purple-100' :
                campaign.type === 'GOOGLE_ADS' ? 'bg-blue-100' :
                'bg-green-100'
              }`}>
                {campaign.type === 'INFLUENCER' ? <Users className="w-5 h-5 text-purple-600" /> :
                 campaign.type === 'GOOGLE_ADS' ? <Target className="w-5 h-5 text-blue-600" /> :
                 <Zap className="w-5 h-5 text-green-600" />}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">{campaign.name}</h4>
                <p className="text-sm text-slate-600">{campaign.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-4">
              <div>
                <div className="text-xs text-slate-600">Budget</div>
                <div className="text-lg font-bold text-slate-900">€{campaign.budget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Expected ROI</div>
                <div className="text-lg font-bold text-green-600">{campaign.expectedROI}x</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Reach</div>
                <div className="text-lg font-bold text-slate-900">
                  {campaign.reach >= 1000 ? `${Math.round(campaign.reach / 1000)}k` : campaign.reach}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Duration</div>
                <div className="text-lg font-bold text-slate-900">{campaign.duration} days</div>
              </div>
              <div>
                <div className="text-xs text-slate-600">Units to Move</div>
                <div className="text-lg font-bold text-indigo-600">{campaign.unitsToMove.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="ml-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Select
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="bg-slate-50 p-6 border-t border-slate-200">
          <div className="grid grid-cols-2 gap-6">
            {/* Influencer List or Ad Strategy */}
            {campaign.influencers && (
              <div>
                <h5 className="text-sm font-bold text-slate-900 mb-3">Selected Influencers ({campaign.influencers.length})</h5>
                <div className="space-y-2">
                  {campaign.influencers.slice(0, 5).map(inf => (
                    <div key={inf.id} className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{inf.handle}</div>
                        <div className="text-xs text-slate-600">{inf.followers.toLocaleString()} followers • {(inf.engagement * 100).toFixed(1)}% eng</div>
                      </div>
                      <div className="text-sm font-bold text-slate-900">€{inf.cost}</div>
                    </div>
                  ))}
                  {campaign.influencers.length > 5 && (
                    <div className="text-xs text-slate-500 text-center">
                      + {campaign.influencers.length - 5} more influencers
                    </div>
                  )}
                </div>
              </div>
            )}

            {campaign.adStrategy && (
              <div>
                <h5 className="text-sm font-bold text-slate-900 mb-3">Google Ads Strategy</h5>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600">Campaign Type</div>
                    <div className="text-sm font-semibold text-slate-900">{campaign.adStrategy.type}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600">Target Keywords</div>
                    <div className="text-sm font-semibold text-slate-900">{campaign.adStrategy.keywords.join(', ')}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="text-xs text-slate-600">Daily Budget</div>
                    <div className="text-sm font-semibold text-slate-900">€{campaign.adStrategy.dailyBudget}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div>
              <h5 className="text-sm font-bold text-slate-900 mb-3">Campaign Timeline</h5>
              <div className="space-y-2">
                {campaign.timeline.map((phase, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{phase.name}</div>
                        <div className="text-xs text-slate-600">{phase.description}</div>
                      </div>
                      <div className="text-xs text-slate-500">{phase.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Messaging Strategy */}
          {campaign.messaging && (
            <div className="mt-6">
              <h5 className="text-sm font-bold text-slate-900 mb-3">Messaging Strategy</h5>
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700 italic">"{campaign.messaging.angle}"</p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {campaign.messaging.hooks.map((hook, idx) => (
                    <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                      {hook}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CAMPAIGN GENERATION ENGINE - INVENTORY FIRST
// =============================================================================

function generateCampaignsForProduct(product) {
  const campaigns = [];
  const action = product.analysis.action;
  const budget = product.analysis.recommendedCampaignBudget;

  // 1. INFLUENCER CAMPAIGN
  const influencerCampaign = generateInfluencerCampaign(product, action, budget);
  if (influencerCampaign) campaigns.push(influencerCampaign);

  // 2. GOOGLE ADS CAMPAIGN
  const googleAdsCampaign = generateGoogleAdsCampaign(product, action, budget);
  if (googleAdsCampaign) campaigns.push(googleAdsCampaign);

  // 3. HYBRID CAMPAIGN (Influencer + Google Ads + Trending)
  const hybridCampaign = generateHybridCampaign(product, action, budget);
  if (hybridCampaign) campaigns.push(hybridCampaign);

  return campaigns;
}

function generateInfluencerCampaign(product, action, budget) {
  // Match influencers to product category
  const matchedInfluencers = influencers.filter(inf => {
    // Match by category specialty
    const categoryMatch =
      (product.category === 'protein' && inf.categories.some(c => ['nutrition', 'recipes', 'bodybuilding'].includes(c))) ||
      (product.category === 'preWorkout' && inf.categories.some(c => ['CrossFit', 'functional-fitness', 'competition'].includes(c))) ||
      (product.category === 'rtdShake' && inf.categories.some(c => ['convenience', 'beginner-fitness'].includes(c))) ||
      (product.category === 'energyDrink' && inf.categories.some(c => ['competition', 'running', 'hyrox'].includes(c)));

    return categoryMatch && inf.contractStatus === 'ACTIVE';
  });

  // Select best influencers by ROI
  const selectedInfluencers = matchedInfluencers
    .sort((a, b) => b.avgROI - a.avgROI)
    .slice(0, Math.min(8, Math.floor(budget / 250)))
    .map(inf => ({
      id: inf.id,
      handle: inf.handle,
      followers: inf.followers,
      engagement: inf.engagement,
      cost: inf.rates.singlePost || inf.rates.singleVideo || 250,
    }));

  if (selectedInfluencers.length === 0) return null;

  const totalCost = selectedInfluencers.reduce((sum, inf) => sum + inf.cost, 0);
  const totalReach = selectedInfluencers.reduce((sum, inf) => sum + inf.followers, 0);

  return {
    type: 'INFLUENCER',
    name: action === 'LIQUIDATE' ? 'Flash Influencer Liquidation' : 'Influencer Amplify Campaign',
    description: action === 'LIQUIDATE'
      ? 'Clear excess inventory through targeted influencer partnerships'
      : 'Drive demand with high-engagement influencer content',
    budget: Math.round(totalCost * 1.15), // Add 15% buffer
    expectedROI: action === 'LIQUIDATE' ? 5.2 : 3.8,
    reach: totalReach,
    duration: action === 'LIQUIDATE' ? 7 : 14,
    unitsToMove: Math.round(product.inventory.avgDailyDemand * (action === 'LIQUIDATE' ? 0.4 : 0.35) * (action === 'LIQUIDATE' ? 7 : 14)),
    influencers: selectedInfluencers,
    timeline: action === 'LIQUIDATE' ? [
      { name: 'Launch', description: 'Influencers post initial content', duration: 'Day 1-2' },
      { name: 'Amplify', description: 'Stories and engagement', duration: 'Day 3-5' },
      { name: 'Close', description: 'Last chance messaging', duration: 'Day 6-7' },
    ] : [
      { name: 'Awareness', description: 'Build anticipation', duration: 'Day 1-5' },
      { name: 'Engagement', description: 'Product integration', duration: 'Day 6-10' },
      { name: 'Conversion', description: 'Drive sales', duration: 'Day 11-14' },
    ],
    messaging: {
      angle: action === 'LIQUIDATE'
        ? 'Limited stock - my followers get exclusive early access'
        : 'Why I always have this in my routine',
      hooks: action === 'LIQUIDATE'
        ? ['Exclusivity', 'Scarcity', 'Insider Access']
        : ['Authenticity', 'Results', 'Community'],
    },
  };
}

function generateGoogleAdsCampaign(product, action, budget) {
  // Generate keywords based on product
  const keywords = generateKeywords(product);
  const dailyBudget = Math.round((budget * 0.7) / (action === 'LIQUIDATE' ? 7 : 14));

  return {
    type: 'GOOGLE_ADS',
    name: action === 'LIQUIDATE' ? 'Clearance Google Shopping' : 'Google Search + Shopping',
    description: action === 'LIQUIDATE'
      ? 'Aggressive Google Shopping + Search to clear inventory fast'
      : 'Capture high-intent search traffic with optimized campaigns',
    budget: Math.round(budget * 0.7),
    expectedROI: action === 'LIQUIDATE' ? 4.5 : 3.2,
    reach: Math.round(budget * 50), // Estimated impressions
    duration: action === 'LIQUIDATE' ? 7 : 14,
    unitsToMove: Math.round(product.inventory.avgDailyDemand * 0.3 * (action === 'LIQUIDATE' ? 7 : 14)),
    adStrategy: {
      type: action === 'LIQUIDATE' ? 'Shopping + Search (Aggressive)' : 'Search + Display',
      keywords: keywords,
      dailyBudget: dailyBudget,
      targetCPA: Math.round(product.pricing.retailPrice * 0.15),
      adCopy: action === 'LIQUIDATE'
        ? `${product.shortName} - Limited Time Offer | Up to ${Math.round(product.analysis.recommendedDiscount * 100)}% Off`
        : `Premium ${product.shortName} | Fast Shipping | Trusted Brand`,
    },
    timeline: [
      { name: 'Setup', description: 'Campaign creation & approval', duration: 'Day 1' },
      { name: 'Optimize', description: 'Monitor and adjust bids', duration: `Day 2-${action === 'LIQUIDATE' ? 5 : 10}` },
      { name: 'Scale', description: 'Increase budget on winners', duration: `Day ${action === 'LIQUIDATE' ? 6 : 11}-${action === 'LIQUIDATE' ? 7 : 14}` },
    ],
    messaging: {
      angle: action === 'LIQUIDATE'
        ? 'Flash sale - Limited inventory available'
        : 'Premium quality, fast delivery, trusted by athletes',
      hooks: action === 'LIQUIDATE'
        ? ['Price Discount', 'Limited Availability', 'Act Now']
        : ['Quality', 'Trust', 'Performance'],
    },
  };
}

function generateHybridCampaign(product, action, budget) {
  // Find relevant trends
  const relevantTrends = findRelevantTrends(product);
  const trendName = relevantTrends[0] || 'fitness trends';

  // Split budget: 60% influencers, 40% Google Ads
  const influencerBudget = Math.round(budget * 0.6);
  const adsBudget = Math.round(budget * 0.4);

  return {
    type: 'HYBRID',
    name: `${trendName} Convergence Campaign`,
    description: `Multi-channel campaign leveraging ${trendName} with influencers + Google Ads`,
    budget: budget,
    expectedROI: action === 'LIQUIDATE' ? 6.0 : 4.5,
    reach: Math.round(budget * 80),
    duration: action === 'LIQUIDATE' ? 10 : 14,
    unitsToMove: Math.round(product.inventory.avgDailyDemand * 0.5 * (action === 'LIQUIDATE' ? 10 : 14)),
    influencers: influencers
      .filter(inf => inf.contractStatus === 'ACTIVE')
      .sort((a, b) => b.avgROI - a.avgROI)
      .slice(0, 4)
      .map(inf => ({
        id: inf.id,
        handle: inf.handle,
        followers: inf.followers,
        engagement: inf.engagement,
        cost: inf.rates.singlePost || 250,
      })),
    adStrategy: {
      type: 'Search + Shopping + Display Retargeting',
      keywords: generateKeywords(product),
      dailyBudget: Math.round(adsBudget / (action === 'LIQUIDATE' ? 10 : 14)),
    },
    timeline: [
      { name: 'Launch Influencers', description: 'Influencer content goes live', duration: 'Day 1-3' },
      { name: 'Launch Google Ads', description: 'Capture search intent', duration: 'Day 2-5' },
      { name: 'Retarget', description: 'Display ads to engaged audience', duration: `Day 6-${action === 'LIQUIDATE' ? 10 : 14}` },
    ],
    messaging: {
      angle: `Ride the ${trendName} wave with ${product.shortName}`,
      hooks: ['Trending', 'FOMO', 'Social Proof', 'Authority'],
    },
  };
}

function generateKeywords(product) {
  const base = product.category === 'protein' ? ['protein powder', 'whey protein', 'protein supplement'] :
               product.category === 'preWorkout' ? ['pre workout', 'energy supplement', 'workout booster'] :
               product.category === 'creatine' ? ['creatine monohydrate', 'creatine supplement'] :
               product.category === 'rtdShake' ? ['protein shake', 'ready to drink protein', 'protein drink'] :
               product.category === 'energyDrink' ? ['energy drink', 'performance drink', 'sports drink'] :
               product.category === 'proteinBar' ? ['protein bar', 'protein snack', 'fitness bar'] :
               ['fitness supplement'];

  return [...base, `${product.name}`, 'sports nutrition', 'fitness supplements'];
}

function findRelevantTrends(product) {
  // Mock trending topics that match product
  const trendMap = {
    protein: ['Protein Ice Cream', 'Anabolic Recipes', 'Macro Tracking'],
    preWorkout: ['Morning Routine', 'Hyrox Training', 'Competition Prep'],
    creatine: ['Cognitive Health', 'Muscle Building', 'Performance'],
    rtdShake: ['Convenience', '75 Soft Challenge', 'Meal Replacement'],
    energyDrink: ['Energy Boost', 'Pre-Race Fuel', 'Competition'],
    proteinBar: ['Healthy Snacking', 'Office Nutrition', 'On-the-Go'],
  };

  return trendMap[product.category] || ['Fitness'];
}
