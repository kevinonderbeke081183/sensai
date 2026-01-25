import React, { useState, useMemo } from 'react';
import { Package, TrendingUp, AlertTriangle, Check, Users, Target, Zap, Calendar, DollarSign, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { products } from './data/products';
import { influencers } from './data/influencers';
import { events } from './data/events';

// =============================================================================
// THEME - Matching Prototype 1's Visual Style
// =============================================================================

const theme = {
  bg: {
    primary: '#0a0a0f',
    secondary: '#12121a',
    card: 'rgba(255,255,255,0.02)',
    elevated: 'rgba(255,255,255,0.04)',
  },
  border: {
    default: 'rgba(255,255,255,0.08)',
    hover: 'rgba(255,255,255,0.15)',
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
    emerald: '#059669',
  },
  gradient: {
    green: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    red: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    amber: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    blue: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  }
};

// =============================================================================
// INVENTORY-FIRST SENSAI PROTOTYPE
// =============================================================================

export default function InventoryApp() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Categorize inventory by action needed
  const inventoryCategories = useMemo(() => {
    const critical = [];
    const amplify = [];
    const stable = [];

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
    <div style={{
      minHeight: '100vh',
      background: theme.bg.primary,
      color: theme.text.primary,
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* PROTOTYPE INDICATOR */}
      <div style={{
        background: theme.gradient.green,
        color: '#fff',
        padding: '12px 24px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      }}>
        🎯 PROTOTYPE 2: INVENTORY-FIRST APPROACH 📦
      </div>

      {/* Header */}
      <div style={{
        background: theme.bg.secondary,
        borderBottom: `1px solid ${theme.border.default}`,
        padding: '24px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: theme.gradient.green,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Package size={24} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>
                SensAI Inventory Command
              </h1>
              <p style={{ color: theme.text.secondary, fontSize: '14px', margin: '4px 0 0 0' }}>
                Inventory-first campaign intelligence
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: theme.text.muted }}>Total SKUs</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: theme.text.primary }}>{products.length}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Inventory Status Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
          <InventoryStatusCard
            title="Critical"
            subtitle="Needs Liquidation"
            emoji="🔴"
            count={inventoryCategories.critical.length}
            gradient={theme.gradient.red}
            isSelected={selectedCategory === 'CRITICAL'}
            onClick={() => setSelectedCategory('CRITICAL')}
            totalValue={calculateTotalValue(inventoryCategories.critical)}
          />
          <InventoryStatusCard
            title="Amplify"
            subtitle="Push Opportunity"
            emoji="🟡"
            count={inventoryCategories.amplify.length}
            gradient={theme.gradient.amber}
            isSelected={selectedCategory === 'AMPLIFY'}
            onClick={() => setSelectedCategory('AMPLIFY')}
            totalValue={calculateTotalValue(inventoryCategories.amplify)}
          />
          <InventoryStatusCard
            title="Stable"
            subtitle="Healthy Stock"
            emoji="🟢"
            count={inventoryCategories.stable.length}
            gradient={theme.gradient.green}
            isSelected={selectedCategory === 'STABLE'}
            onClick={() => setSelectedCategory('STABLE')}
            totalValue={calculateTotalValue(inventoryCategories.stable)}
          />
        </div>

        {/* Inventory Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
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
// COMPONENTS
// =============================================================================

function InventoryStatusCard({ title, subtitle, emoji, count, gradient, isSelected, onClick, totalValue }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isSelected ? theme.bg.elevated : theme.bg.card,
        border: `2px solid ${isSelected ? theme.accent.green : theme.border.default}`,
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '16px',
      }}>
        {emoji}
      </div>
      <div style={{ fontSize: '18px', fontWeight: '700', color: theme.text.primary, marginBottom: '4px' }}>
        {title}
      </div>
      <div style={{ fontSize: '13px', color: theme.text.secondary, marginBottom: '16px' }}>
        {subtitle}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <div style={{ fontSize: '36px', fontWeight: '700', color: theme.text.primary }}>{count}</div>
        <div style={{ fontSize: '14px', color: theme.text.muted }}>SKUs</div>
      </div>
      <div style={{ marginTop: '12px', fontSize: '12px', color: theme.text.muted }}>
        €{Math.round(totalValue).toLocaleString()} inventory value
      </div>
    </div>
  );
}

function InventoryProductCard({ product, onClick, isSelected }) {
  const [isHovered, setIsHovered] = useState(false);
  const analysis = product.analysis;
  const inv = product.inventory;

  const actionGradients = {
    LIQUIDATE: theme.gradient.red,
    AMPLIFY: theme.gradient.amber,
    STABLE: theme.gradient.green,
  };

  const actionIcons = {
    LIQUIDATE: <AlertTriangle size={20} color="#fff" />,
    AMPLIFY: <TrendingUp size={20} color="#fff" />,
    STABLE: <Check size={20} color="#fff" />,
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isSelected ? theme.bg.elevated : theme.bg.card,
        border: `2px solid ${isSelected ? theme.accent.purple : theme.border.default}`,
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered || isSelected ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered || isSelected ? '0 12px 32px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Left: Product Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: actionGradients[analysis.action],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {actionIcons[analysis.action]}
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: theme.text.primary }}>
                {product.name}
              </h3>
              <div style={{ fontSize: '12px', color: theme.text.muted, marginTop: '2px' }}>{product.sku}</div>
            </div>
          </div>

          {/* Inventory Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
            <StatBox
              label="On Hand"
              value={inv.totalOnHand.toLocaleString()}
              unit="units"
              highlight={false}
            />
            <StatBox
              label="Days of Supply"
              value={inv.daysOfSupply}
              unit="days"
              highlight={inv.daysOfSupply > 60}
              highlightColor={theme.accent.red}
            />
            <StatBox
              label="Shelf Life"
              value={product.shelfLifeRemaining}
              unit="days left"
              highlight={product.shelfLifeRemaining < 90}
              highlightColor={theme.accent.red}
            />
            <StatBox
              label="Bet Quality"
              value={product.betQuality}
              unit=""
              highlight={product.betQuality === 'BAD'}
              highlightColor={product.betQuality === 'GOOD' ? theme.accent.green : product.betQuality === 'BAD' ? theme.accent.red : theme.accent.amber}
            />
          </div>

          {/* Analysis */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: theme.bg.elevated,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '12px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: theme.text.muted, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Action Required
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: theme.text.primary, marginBottom: '12px' }}>
              {analysis.action}
            </div>
            <div style={{ fontSize: '13px', color: theme.text.secondary }}>
              {analysis.reasons.map((reason, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>• {reason}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Budget & CTA */}
        <div style={{ marginLeft: '32px', textAlign: 'right', minWidth: '200px' }}>
          <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Recommended Budget
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: theme.accent.green, marginBottom: '8px' }}>
            €{Math.round(analysis.recommendedCampaignBudget).toLocaleString()}
          </div>
          {analysis.projectedRevenueLoss > 0 && (
            <div style={{ fontSize: '12px', color: theme.accent.red, marginBottom: '20px' }}>
              €{Math.round(analysis.projectedRevenueLoss).toLocaleString()} at risk
            </div>
          )}
          <button
            style={{
              padding: '12px 24px',
              background: theme.gradient.purple,
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.2s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            View Campaigns
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, highlight, highlightColor }) {
  return (
    <div>
      <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '4px' }}>{label}</div>
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: highlight ? highlightColor : theme.text.primary,
      }}>
        {value}
      </div>
      {unit && <div style={{ fontSize: '11px', color: theme.text.muted }}>{unit}</div>}
    </div>
  );
}

function CampaignRecommendationsModal({ product, onClose }) {
  const campaigns = useMemo(() => generateCampaignsForProduct(product), [product]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.bg.secondary,
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          maxWidth: '1200px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          border: `1px solid ${theme.border.default}`,
        }}
      >
        {/* Header */}
        <div style={{
          background: theme.gradient.purple,
          color: '#fff',
          padding: '32px',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>Campaign Recommendations</h2>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>{product.name} • {product.sku}</p>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', overflowY: 'auto', maxHeight: 'calc(90vh - 220px)' }}>
          {/* Product Status Summary */}
          <div style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: theme.text.primary }}>
              Inventory Status
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <StatBox label="Action Needed" value={product.analysis.action} unit="" highlight={false} />
              <StatBox label="Urgency Score" value={`${product.analysis.urgencyScore}/100`} unit="" highlight={false} />
              <StatBox label="Budget Recommended" value={`€${Math.round(product.analysis.recommendedCampaignBudget).toLocaleString()}`} unit="" highlight={false} highlightColor={theme.accent.green} />
              <StatBox label="Days of Supply" value={product.inventory.daysOfSupply} unit="" highlight={false} />
            </div>
          </div>

          {/* Campaign Recommendations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {campaigns.map((campaign, idx) => (
              <CampaignCard key={idx} campaign={campaign} product={product} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${theme.border.default}`,
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          background: theme.bg.card,
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              background: theme.bg.elevated,
              border: `1px solid ${theme.border.default}`,
              borderRadius: '10px',
              color: theme.text.primary,
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
          <button
            style={{
              padding: '12px 24px',
              background: theme.gradient.purple,
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Launch Selected Campaigns
          </button>
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ campaign, product }) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const typeGradients = {
    INFLUENCER: theme.gradient.purple,
    GOOGLE_ADS: theme.gradient.blue,
    HYBRID: theme.gradient.green,
  };

  const typeIcons = {
    INFLUENCER: <Users size={20} color="#fff" />,
    GOOGLE_ADS: <Target size={20} color="#fff" />,
    HYBRID: <Zap size={20} color="#fff" />,
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.bg.card,
        border: `2px solid ${theme.border.default}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Campaign Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: '24px',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: typeGradients[campaign.type],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {typeIcons[campaign.type]}
              </div>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: theme.text.primary }}>
                  {campaign.name}
                </h4>
                <p style={{ fontSize: '13px', color: theme.text.secondary, margin: '4px 0 0 0' }}>
                  {campaign.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginTop: '20px' }}>
              <StatBox label="Budget" value={`€${campaign.budget.toLocaleString()}`} unit="" highlight={false} />
              <StatBox label="Expected ROI" value={`${campaign.expectedROI}x`} unit="" highlight={false} highlightColor={theme.accent.green} />
              <StatBox label="Reach" value={campaign.reach >= 1000 ? `${Math.round(campaign.reach / 1000)}k` : campaign.reach} unit="" highlight={false} />
              <StatBox label="Duration" value={campaign.duration} unit="days" highlight={false} />
              <StatBox label="Units to Move" value={campaign.unitsToMove.toLocaleString()} unit="" highlight={false} highlightColor={theme.accent.purple} />
            </div>
          </div>

          <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
            <button
              style={{
                padding: '10px 20px',
                background: theme.gradient.purple,
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Select
            </button>
            <div style={{ fontSize: '12px', color: theme.text.muted }}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{
          padding: '0 24px 24px 24px',
          borderTop: `1px solid ${theme.border.default}`,
          paddingTop: '24px',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {/* Influencers or Ad Strategy */}
            {campaign.influencers && (
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: theme.text.primary, marginBottom: '12px' }}>
                  Selected Influencers ({campaign.influencers.length})
                </h5>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {campaign.influencers.slice(0, 5).map(inf => (
                    <div key={inf.id} style={{
                      background: theme.bg.elevated,
                      padding: '12px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.border.default}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: theme.text.primary }}>{inf.handle}</div>
                        <div style={{ fontSize: '11px', color: theme.text.muted }}>
                          {inf.followers.toLocaleString()} followers • {(inf.engagement * 100).toFixed(1)}% eng
                        </div>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: theme.text.primary }}>€{inf.cost}</div>
                    </div>
                  ))}
                  {campaign.influencers.length > 5 && (
                    <div style={{ fontSize: '11px', color: theme.text.muted, textAlign: 'center', marginTop: '8px' }}>
                      + {campaign.influencers.length - 5} more influencers
                    </div>
                  )}
                </div>
              </div>
            )}

            {campaign.adStrategy && (
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: theme.text.primary, marginBottom: '12px' }}>
                  Google Ads Strategy
                </h5>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <InfoBox label="Campaign Type" value={campaign.adStrategy.type} />
                  <InfoBox label="Target Keywords" value={campaign.adStrategy.keywords.join(', ')} />
                  <InfoBox label="Daily Budget" value={`€${campaign.adStrategy.dailyBudget}`} />
                </div>
              </div>
            )}

            {/* Timeline */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: '700', color: theme.text.primary, marginBottom: '12px' }}>
                Campaign Timeline
              </h5>
              <div style={{ display: 'grid', gap: '8px' }}>
                {campaign.timeline.map((phase, idx) => (
                  <div key={idx} style={{
                    background: theme.bg.elevated,
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border.default}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: theme.text.primary }}>{phase.name}</div>
                        <div style={{ fontSize: '11px', color: theme.text.muted, marginTop: '2px' }}>{phase.description}</div>
                      </div>
                      <div style={{ fontSize: '11px', color: theme.text.muted }}>{phase.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Messaging Strategy */}
          {campaign.messaging && (
            <div style={{ marginTop: '24px' }}>
              <h5 style={{ fontSize: '14px', fontWeight: '700', color: theme.text.primary, marginBottom: '12px' }}>
                Messaging Strategy
              </h5>
              <div style={{
                background: theme.bg.elevated,
                padding: '16px',
                borderRadius: '8px',
                border: `1px solid ${theme.border.default}`,
              }}>
                <p style={{ fontSize: '13px', color: theme.text.secondary, fontStyle: 'italic', margin: '0 0 12px 0' }}>
                  "{campaign.messaging.angle}"
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {campaign.messaging.hooks.map((hook, idx) => (
                    <span key={idx} style={{
                      padding: '4px 12px',
                      background: 'rgba(139, 92, 246, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: theme.accent.purple,
                      fontWeight: '600',
                    }}>
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

function InfoBox({ label, value }) {
  return (
    <div style={{
      background: theme.bg.elevated,
      padding: '12px',
      borderRadius: '8px',
      border: `1px solid ${theme.border.default}`,
    }}>
      <div style={{ fontSize: '11px', color: theme.text.muted, marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '13px', fontWeight: '600', color: theme.text.primary }}>{value}</div>
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

  if (urgencyScore >= 40) {
    action = 'LIQUIDATE';
    recommendedCampaignBudget = calculateLiquidationBudget(product);
  } else if (betQuality === 'GOOD' && inv.daysOfSupply < 60 && shelfLife > 90) {
    const velocity = inv.totalOnHand / inv.daysOfSupply;
    if (velocity > 50) {
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
  const inventoryValue = product.inventory.totalOnHand * product.pricing.costPrice;
  return Math.round(inventoryValue * 0.08);
}

function calculateAmplifyBudget(product) {
  const dailyRevenue = product.inventory.avgDailyDemand * product.pricing.retailPrice;
  const campaignDuration = 14;
  const targetLift = 0.35;
  const expectedRevenueLift = dailyRevenue * campaignDuration * targetLift;
  return Math.round(expectedRevenueLift * 0.25);
}

function calculateRevenueLoss(product) {
  const excessUnits = Math.max(0, product.inventory.totalOnHand - (product.inventory.avgDailyDemand * 45));
  return Math.round(excessUnits * product.pricing.retailPrice);
}

function calculateRecommendedDiscount(product) {
  if (product.shelfLifeRemaining < 60) return 0.25;
  if (product.shelfLifeRemaining < 90) return 0.20;
  if (product.inventory.daysOfSupply > 60) return 0.15;
  return 0.10;
}

function calculateTotalValue(products) {
  return products.reduce((sum, p) => {
    return sum + (p.inventory.totalOnHand * p.pricing.costPrice);
  }, 0);
}

// =============================================================================
// CAMPAIGN GENERATION ENGINE
// =============================================================================

function generateCampaignsForProduct(product) {
  const campaigns = [];
  const action = product.analysis.action;
  const budget = product.analysis.recommendedCampaignBudget;

  const influencerCampaign = generateInfluencerCampaign(product, action, budget);
  if (influencerCampaign) campaigns.push(influencerCampaign);

  const googleAdsCampaign = generateGoogleAdsCampaign(product, action, budget);
  if (googleAdsCampaign) campaigns.push(googleAdsCampaign);

  const hybridCampaign = generateHybridCampaign(product, action, budget);
  if (hybridCampaign) campaigns.push(hybridCampaign);

  return campaigns;
}

function generateInfluencerCampaign(product, action, budget) {
  const matchedInfluencers = influencers.filter(inf => {
    const categoryMatch =
      (product.category === 'protein' && inf.categories.some(c => ['nutrition', 'recipes', 'bodybuilding'].includes(c))) ||
      (product.category === 'preWorkout' && inf.categories.some(c => ['CrossFit', 'functional-fitness', 'competition'].includes(c))) ||
      (product.category === 'rtdShake' && inf.categories.some(c => ['convenience', 'beginner-fitness'].includes(c))) ||
      (product.category === 'energyDrink' && inf.categories.some(c => ['competition', 'running', 'hyrox'].includes(c)));

    return categoryMatch && inf.contractStatus === 'ACTIVE';
  });

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
    budget: Math.round(totalCost * 1.15),
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
    reach: Math.round(budget * 50),
    duration: action === 'LIQUIDATE' ? 7 : 14,
    unitsToMove: Math.round(product.inventory.avgDailyDemand * 0.3 * (action === 'LIQUIDATE' ? 7 : 14)),
    adStrategy: {
      type: action === 'LIQUIDATE' ? 'Shopping + Search (Aggressive)' : 'Search + Display',
      keywords: keywords,
      dailyBudget: dailyBudget,
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
  const relevantTrends = findRelevantTrends(product);
  const trendName = relevantTrends[0] || 'fitness trends';

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
      dailyBudget: Math.round((budget * 0.4) / (action === 'LIQUIDATE' ? 10 : 14)),
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
