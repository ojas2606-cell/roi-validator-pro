import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-5 hover:border-white/20 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{investment.project_name}</h3>
          <p className="text-sm text-muted-foreground">{investment.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${verdictInfo.className}`}>
          {verdictInfo.emoji} {verdictInfo.label}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Invested</p>
          <p className="text-lg font-bold">${Number(investment.cost).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Revenue</p>
          <p className="text-lg font-bold">${Number(investment.revenue).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">ROI</p>
          <p className={`text-lg font-bold ${roi >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
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
            <span className="text-xs text-muted-foreground">{investment.market_trend}</span>
          </div>
          
          {/* Risk */}
          <div className="flex items-center gap-1">
            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  investment.risk_score > 70 ? 'bg-neon-red' :
                  investment.risk_score > 40 ? 'bg-neon-amber' : 'bg-neon-green'
                }`}
                style={{ width: `${investment.risk_score}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{investment.risk_score}%</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(investment.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
