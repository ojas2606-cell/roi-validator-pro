-- Create investments table for ROI Validator
CREATE TABLE public.investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI & Tech', 'Crypto', 'Real Estate', 'E-commerce', 'Stocks')),
  cost NUMERIC NOT NULL DEFAULT 0,
  revenue NUMERIC NOT NULL DEFAULT 0,
  risk_score INTEGER NOT NULL DEFAULT 50 CHECK (risk_score >= 0 AND risk_score <= 100),
  market_trend TEXT NOT NULL DEFAULT 'Neutral' CHECK (market_trend IN ('Bullish', 'Bearish', 'Volatile', 'Stable', 'Neutral'))
);

-- Enable Row Level Security
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see/manage their own investments
CREATE POLICY "Users can view their own investments"
ON public.investments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investments"
ON public.investments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own investments"
ON public.investments
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own investments"
ON public.investments
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster user queries
CREATE INDEX idx_investments_user_id ON public.investments(user_id);