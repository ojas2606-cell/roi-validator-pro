import { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardContextType {
  stressTestValue: number;
  setStressTestValue: (value: number) => void;
  inflationEnabled: boolean;
  setInflationEnabled: (enabled: boolean) => void;
  applyStressTest: (value: number) => number;
  applyInflation: (value: number) => number;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [stressTestValue, setStressTestValue] = useState(0);
  const [inflationEnabled, setInflationEnabled] = useState(false);

  const applyStressTest = (value: number) => {
    return value * (1 + stressTestValue / 100);
  };

  const applyInflation = (value: number) => {
    return inflationEnabled ? value * 0.9 : value;
  };

  return (
    <DashboardContext.Provider
      value={{
        stressTestValue,
        setStressTestValue,
        inflationEnabled,
        setInflationEnabled,
        applyStressTest,
        applyInflation,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};
