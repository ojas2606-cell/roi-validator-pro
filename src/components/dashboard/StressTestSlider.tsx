import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useDashboard } from '@/contexts/DashboardContext';

export const StressTestSlider = () => {
  const { stressTestValue, setStressTestValue } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Scenario Simulator</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Stress Test</span>
          <span className={`text-lg font-bold ${
            stressTestValue > 0 ? 'text-neon-green' : stressTestValue < 0 ? 'text-neon-red' : 'text-foreground'
          }`}>
            {stressTestValue > 0 ? '+' : ''}{stressTestValue}%
          </span>
        </div>
        
        <Slider
          value={[stressTestValue]}
          onValueChange={(value) => setStressTestValue(value[0])}
          min={-50}
          max={50}
          step={5}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-50% Crash</span>
          <span>Baseline</span>
          <span>+50% Boom</span>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Adjust the slider to simulate market scenarios and see real-time impact on all metrics.
        </p>
      </div>
    </motion.div>
  );
};
