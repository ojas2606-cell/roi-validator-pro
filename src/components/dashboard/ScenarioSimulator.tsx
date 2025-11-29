import { Slider } from '@/components/ui/slider';
import { BarChart3 } from 'lucide-react';

interface ScenarioSimulatorProps {
  value: number;
  onChange: (value: number) => void;
}

export const ScenarioSimulator = ({ value, onChange }: ScenarioSimulatorProps) => {
  const getScenarioLabel = () => {
    if (value < -30) return '🔥 MARKET CRASH';
    if (value < 0) return '📉 DOWNTURN';
    if (value === 0) return '⚖️ BASELINE';
    if (value < 30) return '📈 GROWTH';
    return '🚀 BOOM CYCLE';
  };

  const getScenarioColor = () => {
    if (value < 0) return 'text-cyber-red';
    if (value === 0) return 'text-muted-foreground';
    return 'text-cyber-lime';
  };

  return (
    <div className="cyber-glass rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-cyber-violet/20">
          <BarChart3 className="w-5 h-5 text-cyber-violet" />
        </div>
        <div className="flex-1">
          <h3 className="font-command text-lg">SCENARIO SIMULATOR</h3>
          <p className="text-xs text-muted-foreground">Stress-test your portfolio in real-time</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-data text-muted-foreground">Market Condition</span>
          <span className={`font-data text-sm font-semibold ${getScenarioColor()}`}>
            {getScenarioLabel()}
          </span>
        </div>

        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={-50}
          max={50}
          step={5}
          className="cursor-pointer"
        />

        <div className="flex items-center justify-between text-xs font-data">
          <span className="text-cyber-red">-50% Crash</span>
          <span className={`text-xl font-bold ${getScenarioColor()}`}>
            {value > 0 ? '+' : ''}{value}%
          </span>
          <span className="text-cyber-lime">+50% Boom</span>
        </div>
      </div>
    </div>
  );
};
