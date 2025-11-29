import { motion } from 'framer-motion';
import { Activity, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  userEmail?: string;
  onSignOut: () => void;
}

export const Header = ({ userEmail, onSignOut }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-cyber-violet/20 animate-glow-pulse">
          <Activity className="w-6 h-6 text-cyber-violet" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-command">
            ROI VALIDATOR <span className="text-cyber-violet">NEXUS</span>
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block font-data">
            Strategic Command Center
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg cyber-glass">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[150px] truncate font-data">
            {userEmail}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          className="text-muted-foreground hover:text-cyber-red hover:bg-cyber-red/10"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </motion.header>
  );
};
