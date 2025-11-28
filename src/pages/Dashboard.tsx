import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, LayoutGrid } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useInvestments } from '@/hooks/useInvestments';
import { Header } from '@/components/dashboard/Header';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { Charts } from '@/components/dashboard/Charts';
import { InvestmentForm } from '@/components/dashboard/InvestmentForm';
import { InvestmentCard } from '@/components/dashboard/InvestmentCard';

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { investments, loading: investmentsLoading, addInvestment, deleteInvestment } = useInvestments(user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header userEmail={user.email} onSignOut={handleSignOut} />

        <div className="space-y-6">
          {/* Stats Overview */}
          <StatsOverview investments={investments} />

          {/* Charts Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-primary" />
              Market Overview
            </h2>
            <Charts investments={investments} />
          </section>

          {/* Form and Investments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Investment Form */}
            <div className="lg:col-span-1">
              <InvestmentForm onSubmit={addInvestment} />
            </div>

            {/* Investments List */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">
                Your Investments ({investments.length})
              </h2>
              
              {investmentsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : investments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <p className="text-muted-foreground mb-2">No investments yet</p>
                  <p className="text-sm text-muted-foreground">
                    Add your first investment to get started with the analytics
                  </p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {investments.map((investment, index) => (
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
