import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
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
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Navigation = ({ isSimulationRunning, onToggleSimulation, activeTab, onTabChange }: NavigationProps) => {
  const navigate = useNavigate();

  const handleHeaderClick = () => {
    navigate('/');
  };

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <nav className="bg-card border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleHeaderClick}
            >
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
            <Button 
              variant={activeTab === "heatmap" ? "default" : "ghost"} 
              size="sm" 
              className="gap-2"
              onClick={() => handleTabClick("heatmap")}
            >
              <MapPin className="h-4 w-4" />
              Heat Map
            </Button>
            <Button 
              variant={activeTab === "overview" ? "default" : "ghost"} 
              size="sm" 
              className="gap-2"
              onClick={() => handleTabClick("overview")}
            >
              <Activity className="h-4 w-4" />
              Analytics
            </Button>
            <Button 
              variant={activeTab === "simulation" ? "default" : "ghost"} 
              size="sm" 
              className="gap-2"
              onClick={() => handleTabClick("simulation")}
            >
              <Users className="h-4 w-4" />
              Crowd Flow
            </Button>
            <Button 
              variant={activeTab === "prediction" ? "default" : "ghost"} 
              size="sm" 
              className="gap-2"
              onClick={() => handleTabClick("prediction")}
            >
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