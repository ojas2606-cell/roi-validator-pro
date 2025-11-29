import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Target, AlertTriangle } from 'lucide-react';
import { Investment, calculateROI } from '@/types/investment';

interface StatsOverviewProps {
  investments: Investment[];
}

export const StatsOverview = ({ investments }: StatsOverviewProps) => {
  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.cost), 0);
  const totalRevenue = investments.reduce((sum, inv) => sum + Number(inv.revenue), 0);
  const avgRisk = investments.length > 0 
    ? investments.reduce((sum, inv) => sum + inv.risk_score, 0) / investments.length 
    : 0;
  const totalROI = calculateROI(totalInvested, totalRevenue);

  const stats = [
    {
      label: 'Total Invested',
      value: `$${totalInvested.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-foreground',
      bgColor: 'bg-secondary',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: totalRevenue >= totalInvested ? 'text-cyber-lime' : 'text-cyber-red',
      bgColor: totalRevenue >= totalInvested ? 'bg-cyber-lime/10' : 'bg-cyber-red/10',
    },
    {
      label: 'Average Risk',
      value: `${avgRisk.toFixed(1)}%`,
      icon: AlertTriangle,
      color: avgRisk > 70 ? 'text-cyber-red' : avgRisk > 40 ? 'text-cyber-violet' : 'text-cyber-lime',
      bgColor: avgRisk > 70 ? 'bg-cyber-red/10' : avgRisk > 40 ? 'bg-cyber-violet/10' : 'bg-cyber-lime/10',
    },
    {
      label: 'Total ROI',
      value: `${totalROI >= 0 ? '+' : ''}${totalROI.toFixed(1)}%`,
      icon: Target,
      color: totalROI >= 0 ? 'text-cyber-lime' : 'text-cyber-red',
      bgColor: totalROI >= 0 ? 'bg-cyber-lime/10' : 'bg-cyber-red/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="cyber-glass p-5 rounded-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-data uppercase tracking-wide">
            {stat.label}
          </p>
          <p className={`text-2xl md:text-3xl font-bold font-data ${stat.color}`}>
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
