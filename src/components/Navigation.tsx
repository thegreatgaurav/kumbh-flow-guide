import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  MapPin, 
  Activity, 
  Users, 
  Shield, 
  Settings,
  Play,
  Pause 
} from 'lucide-react';

interface NavigationProps {
  isSimulationRunning: boolean;
  onToggleSimulation: () => void;
}

const Navigation = ({ isSimulationRunning, onToggleSimulation }: NavigationProps) => {
  return (
    <nav className="bg-card border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-sacred rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-kumbh-spiritual-blue">
                  Kumbh Mela 2027 Digital Twin
                </h1>
                <p className="text-xs text-muted-foreground">Nashik Crowd Management System</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-kumbh-saffron/10 text-kumbh-deep-saffron">
              Live Simulation
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <MapPin className="h-4 w-4" />
              Heat Map
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Activity className="h-4 w-4" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Users className="h-4 w-4" />
              Crowd Flow
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              Risk Zones
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={onToggleSimulation}
              variant={isSimulationRunning ? "destructive" : "sacred"}
              size="sm"
              className="gap-2"
            >
              {isSimulationRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;