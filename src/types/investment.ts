export type Category = 'AI & Tech' | 'Crypto' | 'Real Estate' | 'Retail' | 'Stocks';
export type MarketTrend = 'Bullish' | 'Bearish' | 'Stagnant' | 'Stable' | 'Neutral';
export type Verdict = 'unicorn' | 'gem' | 'killer' | 'gamble' | 'validated';

export interface Investment {
  id: string;
  created_at: string;
  user_id: string;
  project_name: string;
  category: Category;
  cost: number;
  revenue: number;
  risk_score: number;
  market_trend: MarketTrend;
}

export interface InvestmentFormData {
  project_name: string;
  category: Category;
  cost: number;
  revenue: number;
  risk_score: number;
}

// Auto-calculate market trend based on category
export const getTrendFromCategory = (category: Category): MarketTrend => {
  switch (category) {
    case 'AI & Tech':
    case 'Stocks':
      return 'Bullish';
    case 'Crypto':
      return 'Stagnant';
    case 'Real Estate':
      return 'Stable';
    default:
      return 'Neutral';
  }
};

// Calculate ROI percentage
export const calculateROI = (cost: number, revenue: number): number => {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
};

// Determine verdict based on multi-variable logic
export const getVerdict = (investment: Investment): Verdict => {
  const roi = calculateROI(investment.cost, investment.revenue);
  const { risk_score, market_trend } = investment;

  // Priority order matters!
  if (risk_score > 80) return 'gamble';
  if (roi < 0 && risk_score > 70) return 'killer';
  if (roi > 200 && risk_score < 40) return 'unicorn';
  if (roi > 50 && market_trend === 'Bullish') return 'gem';
  return 'validated';
};

// Verdict display config
export const verdictConfig: Record<Verdict, { emoji: string; label: string; className: string }> = {
  unicorn: { emoji: '🦄', label: 'POTENTIAL UNICORN', className: 'badge-unicorn' },
  gem: { emoji: '💎', label: 'HIDDEN GEM', className: 'badge-gem' },
  killer: { emoji: '💀', label: 'WEALTH KILLER', className: 'badge-killer' },
  gamble: { emoji: '🎰', label: 'GAMBLE', className: 'badge-gamble' },
  validated: { emoji: '✅', label: 'VALIDATED', className: 'badge-validated' },
};

// Trend config
export const trendConfig: Record<MarketTrend, { emoji: string; color: string }> = {
  Bullish: { emoji: '📈', color: 'text-cyber-lime' },
  Bearish: { emoji: '📉', color: 'text-cyber-red' },
  Stagnant: { emoji: '⚡', color: 'text-cyber-violet' },
  Stable: { emoji: '🛡️', color: 'text-cyber-cyan' },
  Neutral: { emoji: '➖', color: 'text-muted-foreground' },
};
