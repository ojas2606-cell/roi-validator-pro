import { motion } from 'framer-motion';
import { TrendingUp, LogOut, User } from 'lucide-react';
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
        <div className="p-2 rounded-xl bg-primary/20 glow-purple animate-glow-pulse">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            ROI Validator <span className="text-primary">3.0</span>
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block">
            Smart Investment Analytics
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[150px] truncate">
            {userEmail}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </motion.header>
  );
};
