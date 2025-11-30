import { motion } from 'framer-motion';
import { Activity, TrendingUp, Scale, Hexagon, Triangle, Circle, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-purple rounded-lg" />
            <span className="font-bold text-lg tracking-tight">ROI Validator Nexus</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#nexus" className="text-slate-400 hover:text-white transition-colors">The Nexus</a>
            <a href="#methodology" className="text-slate-400 hover:text-white transition-colors">Methodology</a>
            <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-slate-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/auth">
              <Button className="bg-white text-black hover:bg-white/90 font-semibold">
                Launch Nexus
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Financial Nexus for Modern Founders.
          </motion.h1>
          
          <motion.p 
            className="text-xl text-slate-400 leading-relaxed mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Validate business models against real-world economic conditions. Simulate runway, 
            adjust for inflation, and eliminate emotional bias.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/auth">
              <Button 
                className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-6 glow-purple"
              >
                Initialize Nexus
              </Button>
            </Link>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div 
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="glass-card p-8 relative"
              style={{ transform: 'rotateX(15deg)' }}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Mock Dashboard Content */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glass-card p-4">
                  <div className="text-sm text-slate-400 mb-2">Total Investments</div>
                  <div className="text-3xl font-bold text-neon-purple">$2.4M</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-slate-400 mb-2">Expected ROI</div>
                  <div className="text-3xl font-bold text-neon-green">+156%</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-sm text-slate-400 mb-2">Risk Score</div>
                  <div className="text-3xl font-bold text-neon-amber">42</div>
                </div>
              </div>
              
              {/* Mock Chart */}
              <div className="glass-card p-6 h-48 flex items-end gap-2">
                {[60, 80, 45, 90, 70, 85, 65].map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-purple rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Reflection Effect */}
            <div 
              className="absolute inset-x-0 -bottom-20 h-40 opacity-20"
              style={{
                background: 'linear-gradient(to bottom, rgba(124, 58, 237, 0.3), transparent)',
                filter: 'blur(40px)'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-y border-white/10 py-12 bg-zinc-900/20">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-slate-500 font-semibold tracking-widest mb-8">
            TRUSTED STRATEGIC INFRASTRUCTURE
          </p>
          <div className="flex items-center justify-center gap-12 opacity-50 grayscale">
            <Hexagon className="w-12 h-12" />
            <Triangle className="w-12 h-12" />
            <Circle className="w-12 h-12" />
            <Square className="w-12 h-12" />
          </div>
        </div>
      </section>

      {/* Value Proposition - Bento Grid */}
      <section id="nexus" className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="glass-card p-8 hover:border-primary/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Activity className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold tracking-tight mb-3">Liquidity Nexus</h3>
            <p className="text-slate-400 leading-relaxed">
              Real-time Runway Simulator to prevent insolvency events.
            </p>
          </motion.div>

          <motion.div 
            className="glass-card p-8 hover:border-primary/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TrendingUp className="w-12 h-12 text-neon-green mb-4" />
            <h3 className="text-2xl font-semibold tracking-tight mb-3">Economic Adjustments</h3>
            <p className="text-slate-400 leading-relaxed">
              Automatic inflation indexing to reveal true purchasing power.
            </p>
          </motion.div>

          <motion.div 
            className="glass-card p-8 hover:border-primary/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Scale className="w-12 h-12 text-neon-cyan mb-4" />
            <h3 className="text-2xl font-semibold tracking-tight mb-3">Rational Verdicts</h3>
            <p className="text-slate-400 leading-relaxed">
              AI-driven logic to bypass sunk-cost fallacies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Strip */}
      <section id="methodology" className="bg-zinc-900/40 border-y border-white/10 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">Risk Modeling.</h2>
            <p className="text-slate-400 mb-12">
              Adjust parameters to stress-test revenue projections.
            </p>
            
            {/* Static Slider Representation */}
            <div className="glass-card p-12">
              <div className="relative h-4 rounded-full bg-gradient-to-r from-neon-green via-neon-amber to-neon-red">
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg"
                  style={{ left: '60%', marginLeft: '-12px' }}
                />
              </div>
              <div className="flex justify-between mt-4 text-sm text-slate-400">
                <span>0% Risk</span>
                <span>100% Risk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="pricing" className="border-t border-white/10 bg-black py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 tracking-tight">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
            © 2024 ROI Validator Nexus. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
