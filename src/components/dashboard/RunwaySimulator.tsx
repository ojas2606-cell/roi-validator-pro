import { motion } from 'framer-motion';
import { Gauge, AlertTriangle, CheckCircle, ArrowDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useDashboard } from '@/contexts/DashboardContext';
import { Investment } from '@/types/investment';

interface RunwaySimulatorProps {
  investments: Investment[];
}

export const RunwaySimulator = ({ investments }: RunwaySimulatorProps) => {
  const [cashOnHand, setCashOnHand] = useState<string>('50000');
  const { inflationEnabled, applyInflation } = useDashboard();
  
  const totalMonthlyCosts = investments.reduce((sum, inv) => sum + Number(inv.cost) / 12, 0);
  const baseRunway = totalMonthlyCosts > 0 ? Number(cashOnHand) / totalMonthlyCosts : 0;
  const adjustedRunway = applyInflation(baseRunway);
  
  const isInflationAdjusted = inflationEnabled && baseRunway !== adjustedRunway;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 transition-all duration-300 ${
        adjustedRunway < 3 ? 'border-neon-red/50 animate-glow-pulse' : 
        adjustedRunway > 12 ? 'border-neon-green/50' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Survival Widget</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="cash" className="text-sm text-muted-foreground">
            Cash on Hand ($)
          </Label>
          <Input
            id="cash"
            type="number"
            value={cashOnHand}
            onChange={(e) => setCashOnHand(e.target.value)}
            className="mt-1"
            placeholder="50000"
          />
        </div>
        
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Monthly Burn Rate</span>
            <span className="font-semibold">
              ${totalMonthlyCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Runway {isInflationAdjusted && '(Inflation Adjusted)'}
            </span>
            <div className="flex items-center gap-1">
              {isInflationAdjusted && (
                <ArrowDown className="w-4 h-4 text-neon-amber" />
              )}
              <span className={`text-2xl font-bold ${
                adjustedRunway < 3 ? 'text-neon-red' : 
                adjustedRunway > 12 ? 'text-neon-green' : 
                'text-foreground'
              }`}>
                {adjustedRunway.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground ml-1">months</span>
            </div>
          </div>
        </div>
        
        {adjustedRunway < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-neon-red/20 border border-neon-red/30"
          >
            <AlertTriangle className="w-4 h-4 text-neon-red" />
            <span className="text-sm text-neon-red font-semibold">
              🚨 INSOLVENCY IMMINENT
            </span>
          </motion.div>
        )}
        
        {adjustedRunway > 12 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-neon-green/20 border border-neon-green/30"
          >
            <CheckCircle className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-neon-green font-semibold">
              ✅ CAPITAL SECURE
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
