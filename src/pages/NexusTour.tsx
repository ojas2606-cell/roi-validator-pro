import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, TrendingDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NexusTour() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'Runway Simulator',
      description: 'Real-time cash flow projections. Know exactly when you run out of money.',
      gradient: 'from-cyber-violet to-cyber-cyan',
    },
    {
      icon: TrendingDown,
      title: 'Inflation Logic',
      description: 'Toggle economic reality. See your wealth erode in real-time.',
      gradient: 'from-cyber-red to-cyber-violet',
    },
    {
      icon: Shield,
      title: 'Risk Engine',
      description: 'Stress-test portfolios. Simulate crashes and booms instantly.',
      gradient: 'from-cyber-lime to-cyber-cyan',
    },
  ];

  return (
    <div className="min-h-screen nexus-bg flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-command tracking-tight mb-4">
            STRATEGY <span className="text-cyber-violet">PERFECTED</span>.
          </h1>
          <p className="text-xl text-muted-foreground font-data">
            Command your financial universe with precision intelligence.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="cyber-glass rounded-2xl p-8 hover:border-cyber-violet/50 transition-all group"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-2xl font-command mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="glitch-hover text-lg font-command px-12 py-6 bg-cyber-violet hover:bg-cyber-violet/80 text-white relative overflow-hidden group"
            data-text="INITIALIZE NEXUS"
          >
            <span className="relative z-10">INITIALIZE NEXUS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-lime/20 to-cyber-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
