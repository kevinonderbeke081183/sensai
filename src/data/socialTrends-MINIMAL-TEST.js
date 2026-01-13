// MINIMAL TEST VERSION - socialTrends.js
// This is a super simple version that definitely works

export async function getSocialTrends() {
  console.log('📦 getSocialTrends called');
  
  // Return simple, guaranteed-to-work data
  const trends = [
    {
      id: 'test-1',
      name: 'Protein Ice Cream',
      keyword: 'Protein Ice Cream',
      volume: 8200,
      weeklyChange: 156,
      change: '+156%',
      category: 'Recipes',
      opportunity: 'High',
      products: ['Casein Powder', 'Whey Isolate'],
      inventoryImpact: 'GOOD',
      lifecycle: 'GROWING'
    },
    {
      id: 'test-2',
      name: 'Pre-Workout Supplements',
      keyword: 'Pre-Workout',
      volume: 6500,
      weeklyChange: 89,
      change: '+89%',
      category: 'Supplements',
      opportunity: 'High',
      products: ['Pre-Workout Powder', 'Energy Gel'],
      inventoryImpact: 'GOOD',
      lifecycle: 'RISING'
    }
  ];
  
  console.log('✅ Returning trends:', trends);
  return trends;
}

// Default export for backward compatibility
export default [];
