import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SurvivalWidgetProps {
  totalMonthlyCosts: number;
}

export const SurvivalWidget = ({ totalMonthlyCosts }: SurvivalWidgetProps) => {
  const [cashOnHand, setCashOnHand] = useState<number>(0);
  
  const runway = totalMonthlyCosts > 0 ? cashOnHand / totalMonthlyCosts : 0;
  const isCritical = runway < 3;
  const isSecure = runway >= 12;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`cyber-glass rounded-xl p-6 ${isCritical ? 'border-cyber-red animate-pulse-red' : isSecure ? 'border-cyber-lime' : ''} transition-all`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${isCritical ? 'bg-cyber-red/20' : isSecure ? 'bg-cyber-lime/20' : 'bg-secondary'}`}>
          {isCritical ? (
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
          ) : isSecure ? (
            <CheckCircle className="w-5 h-5 text-cyber-lime" />
          ) : (
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <h3 className="font-command text-lg">SURVIVAL ANALYSIS</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cash" className="text-xs font-data mb-2 block">
            Cash on Hand ($)
          </Label>
          <Input
            id="cash"
            type="number"
            placeholder="0"
            value={cashOnHand || ''}
            onChange={(e) => setCashOnHand(Number(e.target.value))}
            className="font-data text-lg"
          />
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Monthly Burn Rate</span>
            <span className="font-data text-sm">${totalMonthlyCosts.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Runway</span>
            <span className={`font-data text-2xl font-bold ${isCritical ? 'text-cyber-red' : isSecure ? 'text-cyber-lime' : 'text-foreground'}`}>
              {runway.toFixed(1)} <span className="text-sm">months</span>
            </span>
          </div>
        </div>

        {isCritical && runway > 0 && (
          <div className="p-3 rounded-lg bg-cyber-red/10 border border-cyber-red/30">
            <p className="text-xs font-data text-cyber-red">
              🚨 INSOLVENCY IMMINENT
            </p>
          </div>
        )}

        {isSecure && (
          <div className="p-3 rounded-lg bg-cyber-lime/10 border border-cyber-lime/30">
            <p className="text-xs font-data text-cyber-lime">
              ✅ CAPITAL SECURE
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
