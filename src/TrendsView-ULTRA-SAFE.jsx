function TrendsView({ trends }) {
  // Debug: Log what we received
  console.log('🔍 TrendsView received:', trends);
  console.log('🔍 Is array?', Array.isArray(trends));
  console.log('🔍 Length:', trends?.length);
  
  // Handle null/undefined trends
  if (!trends) {
    console.log('❌ Trends is null or undefined');
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
          No Trends Data
        </h3>
        <p style={{ color: theme.text.secondary, fontSize: '14px' }}>
          Trends data is null or undefined
        </p>
      </div>
    );
  }

  // Handle empty array
  if (!Array.isArray(trends) || trends.length === 0) {
    console.log('❌ Trends is empty or not an array');
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
          No trend data loaded
        </p>
      </div>
    );
  }

  console.log('✅ Processing', trends.length, 'trends');

  // Map trends with MAXIMUM safety
  const mappedTrends = trends.map((trend, index) => {
    console.log(`🔍 Processing trend ${index}:`, trend);
    
    try {
      // Safe get with fallbacks
      const safeGet = (obj, path, defaultVal) => {
        try {
          return path.split('.').reduce((o, p) => o?.[p], obj) ?? defaultVal;
        } catch {
          return defaultVal;
        }
      };

      const keyword = safeGet(trend, 'name', null) || 
                     safeGet(trend, 'keyword', null) || 
                     'Unknown Trend';
      
      const volume = safeGet(trend, 'platforms.googleTrends.interestScore', 0) * 100 ||
                    safeGet(trend, 'currentVolume', 0) ||
                    safeGet(trend, 'volume', 0) ||
                    0;

      const weeklyChange = safeGet(trend, 'weeklyChange', null);
      const growth7d = safeGet(trend, 'platforms.googleTrends.growth7d', null);
      const existingChange = safeGet(trend, 'change', null);
      
      let change = '+0%';
      if (existingChange) {
        change = existingChange;
      } else if (weeklyChange !== null && weeklyChange !== undefined) {
        change = `${weeklyChange > 0 ? '+' : ''}${Math.round(weeklyChange)}%`;
      } else if (growth7d !== null && growth7d !== undefined) {
        const growth = Math.round(growth7d * 100);
        change = `${growth > 0 ? '+' : ''}${growth}%`;
      }

      const category = safeGet(trend, 'type', null) || 
                      safeGet(trend, 'category', null) || 
                      'Market Signal';

      const opportunity = safeGet(trend, 'urgency', null) || 
                         safeGet(trend, 'opportunity', null) || 
                         'Medium';

      let products = [];
      const productMatches = safeGet(trend, 'productMatches', null);
      const existingProducts = safeGet(trend, 'products', null);
      
      if (Array.isArray(productMatches)) {
        products = productMatches.map(p => p?.productCategory || 'Unknown').slice(0, 3);
      } else if (Array.isArray(existingProducts)) {
        products = existingProducts;
      }

      const lifecycle = safeGet(trend, 'lifecycle', null);
      const existingImpact = safeGet(trend, 'inventoryImpact', null);
      
      let inventoryImpact = 'NEUTRAL';
      if (existingImpact) {
        inventoryImpact = existingImpact;
      } else if (lifecycle === 'EMERGING' || lifecycle === 'GROWING') {
        inventoryImpact = 'GOOD';
      } else if (lifecycle === 'DECLINING') {
        inventoryImpact = 'BAD';
      }

      const mapped = {
        id: safeGet(trend, 'id', `trend-${index}`),
        keyword,
        volume,
        change,
        category,
        opportunity,
        products,
        inventoryImpact
      };

      console.log(`✅ Mapped trend ${index}:`, mapped);
      return mapped;
      
    } catch (error) {
      console.error(`❌ Error mapping trend ${index}:`, error, trend);
      // Return safe default
      return {
        id: `error-${index}`,
        keyword: 'Error Loading Trend',
        volume: 0,
        change: '+0%',
        category: 'Error',
        opportunity: 'Low',
        products: [],
        inventoryImpact: 'NEUTRAL'
      };
    }
  });

  console.log('✅ All trends mapped:', mappedTrends);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {mappedTrends.map((trend, index) => {
        console.log(`🎨 Rendering trend ${index}:`, trend);
        
        return (
          <div key={trend.id || index} style={{
            background: theme.bg.card,
            border: `1px solid ${theme.border.default}`,
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '500', margin: 0 }}>
                    {String(trend.keyword || 'Unknown')}
                  </h3>
                  <span style={{
                    background: getBetColor(trend.inventoryImpact || 'NEUTRAL'),
                    color: theme.bg.primary,
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
                    {String(trend.inventoryImpact || 'NEUTRAL')}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: theme.text.secondary, marginBottom: '8px' }}>
                  <span>Interest: {Math.round(Number(trend.volume) || 0).toLocaleString()}</span>
                  <span>Category: {String(trend.category || 'Unknown')}</span>
                  <span>Signal: {String(trend.opportunity || 'Medium')}</span>
                </div>
                <div style={{ fontSize: '13px', color: theme.text.muted }}>
                  Products: {Array.isArray(trend.products) && trend.products.length > 0 ? trend.products.join(', ') : 'N/A'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  color: String(trend.change || '').includes('+') ? theme.accent.green : theme.accent.red, 
                  fontSize: '20px', 
                  fontWeight: '600' 
                }}>
                  {String(trend.change || '+0%')}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
