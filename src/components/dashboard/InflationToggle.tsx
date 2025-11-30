import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useDashboard } from '@/contexts/DashboardContext';

export const InflationToggle = () => {
  const { inflationEnabled, setInflationEnabled } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 transition-all duration-300 ${
        inflationEnabled ? 'saturate-50 border-neon-amber/30' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${
            inflationEnabled ? 'bg-neon-amber/20' : 'bg-primary/20'
          }`}>
            <TrendingDown className={`w-5 h-5 ${
              inflationEnabled ? 'text-neon-amber' : 'text-primary'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Inflation Reality Switch</h3>
            <p className="text-xs text-muted-foreground">
              Model 5% revenue reduction + 10% runway impact
            </p>
          </div>
        </div>
        
        <Switch
          checked={inflationEnabled}
          onCheckedChange={setInflationEnabled}
          className="data-[state=checked]:bg-neon-amber"
        />
      </div>
      
      {inflationEnabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <p className="text-sm text-neon-amber">
            ⚠️ Inflation adjustments active: Revenue -5%, Runway -10%
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
