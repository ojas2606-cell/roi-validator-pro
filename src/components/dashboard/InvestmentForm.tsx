import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { InvestmentFormData, Category, getTrendFromCategory, trendConfig } from '@/types/investment';

interface InvestmentFormProps {
  onSubmit: (data: InvestmentFormData) => Promise<{ error: Error | null }>;
}

const categories: Category[] = ['AI & Tech', 'Crypto', 'Real Estate', 'Retail', 'Stocks'];

export const InvestmentForm = ({ onSubmit }: InvestmentFormProps) => {
  const [formData, setFormData] = useState<InvestmentFormData>({
    project_name: '',
    category: 'AI & Tech',
    cost: 0,
    revenue: 0,
    risk_score: 50,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentTrend = getTrendFromCategory(formData.category);
  const trendInfo = trendConfig[currentTrend];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project_name.trim()) return;

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      project_name: '',
      category: 'AI & Tech',
      cost: 0,
      revenue: 0,
      risk_score: 50,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cyber-glass p-6 rounded-xl"
    >
      <h3 className="text-lg font-command mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-cyber-violet" />
        INITIALIZE INVESTMENT
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project_name" className="font-data text-xs uppercase tracking-wide">Project Name</Label>
            <Input
              id="project_name"
              placeholder="e.g., Tesla Shares"
              value={formData.project_name}
              onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
              className="bg-secondary/50 border-white/10 font-data"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="font-data text-xs uppercase tracking-wide">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value as Category })}
            >
              <SelectTrigger className="bg-secondary/50 border-white/10 font-data">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="font-data">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground font-data">
              Auto-trend: <span className={trendInfo.color}>{trendInfo.emoji} {currentTrend}</span>
            </p>
          </div>

          {/* Cost */}
          <div className="space-y-2">
            <Label htmlFor="cost" className="font-data text-xs uppercase tracking-wide">Investment Cost ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="cost"
                type="number"
                min={0}
                placeholder="10000"
                value={formData.cost || ''}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                className="pl-10 bg-secondary/50 border-white/10 font-data"
                required
              />
            </div>
          </div>

          {/* Revenue */}
          <div className="space-y-2">
            <Label htmlFor="revenue" className="font-data text-xs uppercase tracking-wide">Expected Revenue ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="revenue"
                type="number"
                min={0}
                placeholder="25000"
                value={formData.revenue || ''}
                onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                className="pl-10 bg-secondary/50 border-white/10 font-data"
                required
              />
            </div>
          </div>
        </div>

        {/* Risk Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="font-data text-xs uppercase tracking-wide">Risk Score</Label>
            <span className={`text-sm font-bold font-data ${
              formData.risk_score > 70 ? 'text-cyber-red' : 
              formData.risk_score > 40 ? 'text-cyber-violet' : 'text-cyber-lime'
            }`}>
              <Percent className="inline w-3 h-3 mr-1" />
              {formData.risk_score}%
            </span>
          </div>
          <Slider
            value={[formData.risk_score]}
            onValueChange={([value]) => setFormData({ ...formData, risk_score: value })}
            max={100}
            step={1}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-data">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-cyber-violet hover:bg-cyber-violet/80 font-command"
          disabled={isSubmitting || !formData.project_name.trim()}
        >
          {isSubmitting ? 'PROCESSING...' : 'DEPLOY INVESTMENT'}
        </Button>
      </form>
    </motion.div>
  );
};
