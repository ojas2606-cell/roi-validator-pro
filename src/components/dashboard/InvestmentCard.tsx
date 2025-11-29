import { motion } from 'framer-motion';
import { Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Investment, calculateROI, getVerdict, verdictConfig, trendConfig } from '@/types/investment';

interface InvestmentCardProps {
  investment: Investment;
  onDelete: (id: string) => void;
  index: number;
}

export const InvestmentCard = ({ investment, onDelete, index }: InvestmentCardProps) => {
  const roi = calculateROI(Number(investment.cost), Number(investment.revenue));
  const verdict = getVerdict(investment);
  const verdictInfo = verdictConfig[verdict];
  const trendInfo = trendConfig[investment.market_trend];

  // AI Verdict recommendation based on verdict type
  const getAIRecommendation = () => {
    switch (verdict) {
      case 'unicorn':
        return { text: 'Strong Buy Signal. Scale aggressively.', colorClass: 'text-cyber-violet' };
      case 'killer':
        return { text: 'Critical Warning. Liquidate assets.', colorClass: 'text-cyber-red' };
      default:
        return { text: 'Hold position and monitor.', colorClass: 'text-muted-foreground' };
    }
  };

  const aiRecommendation = getAIRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="cyber-glass p-5 hover:border-cyber-violet/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 group rounded-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-command text-lg">{investment.project_name}</h3>
          <p className="text-sm text-muted-foreground font-data">{investment.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium font-data ${verdictInfo.className}`}>
          {verdictInfo.emoji} {verdictInfo.label}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-data uppercase">Invested</p>
          <p className="text-lg font-bold font-data">${Number(investment.cost).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-data uppercase">Revenue</p>
          <p className="text-lg font-bold font-data">${Number(investment.revenue).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1 font-data uppercase">ROI</p>
          <p className={`text-lg font-bold font-data ${roi >= 0 ? 'text-cyber-lime' : 'text-cyber-red'}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-4">
          {/* Trend */}
          <div className="flex items-center gap-1">
            <span className={trendInfo.color}>{trendInfo.emoji}</span>
            <span className="text-xs text-muted-foreground font-data">{investment.market_trend}</span>
          </div>
          
          {/* Risk */}
          <div className="flex items-center gap-1">
            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  investment.risk_score > 70 ? 'bg-cyber-red' :
                  investment.risk_score > 40 ? 'bg-cyber-violet' : 'bg-cyber-lime'
                }`}
                style={{ width: `${investment.risk_score}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-data">{investment.risk_score}%</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(investment.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-cyber-red hover:bg-cyber-red/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* AI Verdict Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyber-violet" />
        <span className="text-xs text-muted-foreground font-data">AI Verdict:</span>
        <span className={`text-xs font-medium font-data ${aiRecommendation.colorClass}`}>
          {aiRecommendation.text}
        </span>
      </div>
    </motion.div>
  );
};
