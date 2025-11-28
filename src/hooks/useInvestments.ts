import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Investment, InvestmentFormData, getTrendFromCategory, Category } from '@/types/investment';
import { useToast } from '@/hooks/use-toast';

export const useInvestments = (userId: string | undefined) => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInvestments = async () => {
    if (!userId) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching investments',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setInvestments(data as Investment[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvestments();
  }, [userId]);

  const addInvestment = async (formData: InvestmentFormData) => {
    if (!userId) return { error: new Error('Not authenticated') };

    const market_trend = getTrendFromCategory(formData.category as Category);

    const { data, error } = await supabase
      .from('investments')
      .insert({
        user_id: userId,
        project_name: formData.project_name,
        category: formData.category,
        cost: formData.cost,
        revenue: formData.revenue,
        risk_score: formData.risk_score,
        market_trend,
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Error adding investment',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setInvestments(prev => [data as Investment, ...prev]);
      toast({
        title: 'Investment Added',
        description: `"${formData.project_name}" has been added to your portfolio.`,
      });
    }

    return { error };
  };

  const deleteInvestment = async (id: string) => {
    const { error } = await supabase
      .from('investments')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting investment',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setInvestments(prev => prev.filter(inv => inv.id !== id));
      toast({
        title: 'Investment Deleted',
        description: 'The investment has been removed from your portfolio.',
      });
    }

    return { error };
  };

  return {
    investments,
    loading,
    addInvestment,
    deleteInvestment,
    refetch: fetchInvestments,
  };
};
