import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, LayoutGrid, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useInvestments } from '@/hooks/useInvestments';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/dashboard/Header';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { Charts } from '@/components/dashboard/Charts';
import { InvestmentForm } from '@/components/dashboard/InvestmentForm';
import { InvestmentCard } from '@/components/dashboard/InvestmentCard';
import { InflationToggle } from '@/components/dashboard/InflationToggle';
import { SurvivalWidget } from '@/components/dashboard/SurvivalWidget';
import { ScenarioSimulator } from '@/components/dashboard/ScenarioSimulator';

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { investments, loading: investmentsLoading, addInvestment, deleteInvestment } = useInvestments(user?.id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [inflationEnabled, setInflationEnabled] = useState(false);
  const [scenarioAdjustment, setScenarioAdjustment] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleExport = () => {
    toast({
      title: 'Report Generated',
      description: '🔐 Encrypted Report Downloaded.',
    });
  };

  // Calculate total monthly costs for survival widget
  const totalMonthlyCosts = investments.reduce((sum, inv) => sum + Number(inv.cost) / 12, 0);

  // Apply adjustments to investments
  const adjustedInvestments = investments.map(inv => ({
    ...inv,
    revenue: Number(inv.revenue) * (1 + scenarioAdjustment / 100) * (inflationEnabled ? 0.95 : 1),
  }));

  if (authLoading) {
    return (
      <div className="min-h-screen nexus-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyber-violet" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={`min-h-screen nexus-bg p-4 md:p-6 lg:p-8 ${inflationEnabled ? 'saturate-75' : ''} transition-all duration-500`}>
      <div className="max-w-7xl mx-auto">
        <Header userEmail={user.email} onSignOut={handleSignOut} />

        <div className="space-y-6">
          {/* Top Bar Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InflationToggle enabled={inflationEnabled} onToggle={setInflationEnabled} />
            
            <div className="cyber-glass rounded-xl p-4 flex items-center justify-center">
              <Button
                variant="ghost"
                onClick={handleExport}
                className="flex items-center gap-2 hover:bg-cyber-violet/20"
              >
                <Download className="w-5 h-5" />
                <span className="font-data">Export Dossier</span>
              </Button>
            </div>

            <SurvivalWidget totalMonthlyCosts={totalMonthlyCosts} />
          </div>

          {/* Scenario Simulator */}
          <ScenarioSimulator value={scenarioAdjustment} onChange={setScenarioAdjustment} />

          {/* Stats Overview */}
          <StatsOverview investments={adjustedInvestments} />

          {/* Charts Section */}
          <section>
            <h2 className="text-lg font-command mb-4 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-cyber-violet" />
              MARKET INTELLIGENCE
            </h2>
            <Charts investments={adjustedInvestments} />
          </section>

          {/* Form and Investments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investment Form */}
            <div className="lg:col-span-1">
              <InvestmentForm onSubmit={addInvestment} />
            </div>

            {/* Investments List */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-command mb-4">
                PORTFOLIO ({investments.length})
              </h2>
              
              {investmentsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-cyber-violet" />
                </div>
              ) : investments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="cyber-glass p-8 text-center rounded-xl"
                >
                  <p className="text-muted-foreground mb-2 font-data">No investments detected</p>
                  <p className="text-sm text-muted-foreground">
                    Initialize your first investment to activate analytics
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {adjustedInvestments.map((investment, index) => (
                      <InvestmentCard
                        key={investment.id}
                        investment={investment}
                        onDelete={deleteInvestment}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
