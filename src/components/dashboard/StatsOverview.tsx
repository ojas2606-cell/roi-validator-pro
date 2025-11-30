import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Wallet, ArrowUp, ArrowDown } from 'lucide-react';
import { Investment, calculateROI } from '@/types/investment';
import { useDashboard } from '@/contexts/DashboardContext';

interface StatsOverviewProps {
  investments: Investment[];
}

export const StatsOverview = ({ investments }: StatsOverviewProps) => {
  const { stressTestValue, inflationEnabled, applyStressTest, applyInflation } = useDashboard();
  
  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.cost), 0);
  
  // Apply stress test and inflation to revenue
  const baseRevenue = investments.reduce((sum, inv) => sum + Number(inv.revenue), 0);
  const stressedRevenue = applyStressTest(baseRevenue);
  const adjustedRevenue = applyInflation(stressedRevenue);
  
  const totalProfit = adjustedRevenue - totalInvested;
  const isAdjusted = stressTestValue !== 0 || inflationEnabled;
  
  const avgROI = investments.length > 0
    ? investments.reduce((sum, inv) => {
        const adjustedRev = applyInflation(applyStressTest(Number(inv.revenue)));
        return sum + calculateROI(Number(inv.cost), adjustedRev);
      }, 0) / investments.length
    : 0;
  const avgRisk = investments.length > 0
    ? investments.reduce((sum, inv) => sum + inv.risk_score, 0) / investments.length
    : 0;

  const stats = [
    {
      label: 'Total Invested',
      value: `$${totalInvested.toLocaleString()}`,
      icon: Wallet,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
    },
    {
      label: 'Total Profit',
      value: `${totalProfit >= 0 ? '+' : ''}$${totalProfit.toLocaleString()}`,
      icon: totalProfit >= 0 ? TrendingUp : TrendingDown,
      color: totalProfit >= 0 ? 'text-neon-green' : 'text-neon-red',
      bgColor: totalProfit >= 0 ? 'bg-neon-green/20' : 'bg-neon-red/20',
      showTrend: isAdjusted,
    },
    {
      label: 'Avg. ROI',
      value: `${avgROI >= 0 ? '+' : ''}${avgROI.toFixed(1)}%`,
      icon: TrendingUp,
      color: avgROI >= 0 ? 'text-neon-green' : 'text-neon-red',
      bgColor: avgROI >= 0 ? 'bg-neon-green/20' : 'bg-neon-red/20',
      showTrend: isAdjusted,
    },
    {
      label: 'Avg. Risk',
      value: `${avgRisk.toFixed(0)}%`,
      icon: AlertTriangle,
      color: avgRisk > 60 ? 'text-neon-red' : avgRisk > 40 ? 'text-neon-amber' : 'text-neon-green',
      bgColor: avgRisk > 60 ? 'bg-neon-red/20' : avgRisk > 40 ? 'bg-neon-amber/20' : 'bg-neon-green/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className={`stat-number ${stat.color}`}>{stat.value}</p>
            {stat.showTrend && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center"
              >
                {stressTestValue > 0 ? (
                  <ArrowUp className="w-5 h-5 text-neon-green" />
                ) : stressTestValue < 0 ? (
                  <ArrowDown className="w-5 h-5 text-neon-red" />
                ) : inflationEnabled ? (
                  <ArrowDown className="w-5 h-5 text-neon-amber" />
                ) : null}
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
