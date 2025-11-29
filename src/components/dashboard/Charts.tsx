import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Investment, calculateROI, Category } from '@/types/investment';

interface ChartsProps {
  investments: Investment[];
}

const CATEGORY_COLORS: Record<Category, string> = {
  'AI & Tech': '#8b5cf6',
  'Crypto': '#f59e0b',
  'Real Estate': '#10b981',
  'Retail': '#3b82f6',
  'Stocks': '#ec4899',
};

export const Charts = ({ investments }: ChartsProps) => {
  if (investments.length === 0) {
    return (
      <div className="cyber-glass p-8 text-center rounded-xl">
        <p className="text-muted-foreground font-data">Add investments to see analytics</p>
      </div>
    );
  }

  // ROI Distribution data
  const roiData = investments.map((inv) => ({
    name: inv.project_name.length > 12 ? inv.project_name.slice(0, 12) + '...' : inv.project_name,
    roi: calculateROI(Number(inv.cost), Number(inv.revenue)),
    fill: calculateROI(Number(inv.cost), Number(inv.revenue)) >= 0 ? '#a3e635' : '#ff4444',
  }));

  // Risk vs Reward data
  const scatterData = investments.map((inv) => ({
    x: inv.risk_score,
    y: Number(inv.revenue),
    name: inv.project_name,
  }));

  // Portfolio Allocation data
  const categoryTotals = investments.reduce((acc, inv) => {
    const cat = inv.category as Category;
    acc[cat] = (acc[cat] || 0) + Number(inv.cost);
    return acc;
  }, {} as Record<Category, number>);

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    fill: CATEGORY_COLORS[name as Category],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="cyber-glass p-3 text-sm rounded-lg">
          <p className="font-command">{label || payload[0].payload.name}</p>
          <p className="text-muted-foreground font-data">
            {payload[0].name === 'roi' && `ROI: ${payload[0].value.toFixed(1)}%`}
            {payload[0].name === 'y' && `Revenue: $${payload[0].value.toLocaleString()}`}
            {payload[0].name === 'value' && `Investment: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* ROI Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="cyber-glass p-5 rounded-xl"
      >
        <h4 className="text-sm font-data uppercase tracking-wide text-muted-foreground mb-4">ROI Distribution</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roiData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#888', fontSize: 10, fontFamily: 'Space Grotesk' }}
                axisLine={{ stroke: '#333' }}
              />
              <YAxis 
                tick={{ fill: '#888', fontSize: 10, fontFamily: 'Space Grotesk' }}
                axisLine={{ stroke: '#333' }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="roi" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Risk vs Reward */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="cyber-glass p-5 rounded-xl"
      >
        <h4 className="text-sm font-data uppercase tracking-wide text-muted-foreground mb-4">Risk vs Reward</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis 
                dataKey="x" 
                name="Risk"
                tick={{ fill: '#888', fontSize: 10, fontFamily: 'Space Grotesk' }}
                axisLine={{ stroke: '#333' }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis 
                dataKey="y" 
                name="Revenue"
                tick={{ fill: '#888', fontSize: 10, fontFamily: 'Space Grotesk' }}
                axisLine={{ stroke: '#333' }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={scatterData} fill="#8b5cf6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Portfolio Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="cyber-glass p-5 rounded-xl"
      >
        <h4 className="text-sm font-data uppercase tracking-wide text-muted-foreground mb-4">Portfolio Allocation</h4>
        <div className="h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-xs text-muted-foreground font-data">{entry.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
