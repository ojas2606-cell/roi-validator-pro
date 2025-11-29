import { Switch } from '@/components/ui/switch';
import { TrendingDown } from 'lucide-react';

interface InflationToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const InflationToggle = ({ enabled, onToggle }: InflationToggleProps) => {
  return (
    <div className="cyber-glass rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${enabled ? 'bg-cyber-red/20' : 'bg-secondary'} transition-colors`}>
          <TrendingDown className={`w-5 h-5 ${enabled ? 'text-cyber-red' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <p className="font-data text-sm font-semibold">Inflation Reality</p>
          <p className="text-xs text-muted-foreground">
            {enabled ? 'Active: -5% revenue adjustment' : 'Dormant'}
          </p>
        </div>
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
};
