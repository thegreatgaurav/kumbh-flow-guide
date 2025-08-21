import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Settings, 
  Cpu, 
  Clock,
  Users,
  Activity
} from 'lucide-react';

interface SimulationControlProps {
  isRunning: boolean;
  onToggle: () => void;
}

const SimulationControl = ({ isRunning, onToggle }: SimulationControlProps) => {
  const [speed, setSpeed] = useState([1]);
  const [totalPilgrims, setTotalPilgrims] = useState([50000]);
  const [timeOfDay, setTimeOfDay] = useState([14]); // 14:00 (2 PM)
  const [weatherIntensity, setWeatherIntensity] = useState([70]);

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const getWeatherDescription = (intensity: number) => {
    if (intensity < 30) return 'Clear';
    if (intensity < 60) return 'Partly Cloudy';
    if (intensity < 85) return 'Overcast';
    return 'Heavy Rain';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-kumbh-saffron" />
            Simulation Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <Badge variant={isRunning ? "default" : "secondary"} className={isRunning ? "bg-green-600" : ""}>
              {isRunning ? 'Running' : 'Stopped'}
            </Badge>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              onClick={onToggle}
              variant={isRunning ? "destructive" : "sacred"}
              size="sm"
              className="flex flex-col gap-1 h-auto py-3"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-xs">{isRunning ? 'Pause' : 'Start'}</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col gap-1 h-auto py-3"
            >
              <Square className="h-4 w-4" />
              <span className="text-xs">Stop</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col gap-1 h-auto py-3"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-xs">Reset</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col gap-1 h-auto py-3"
            >
              <Settings className="h-4 w-4" />
              <span className="text-xs">Config</span>
            </Button>
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Simulation Speed
              </label>
              <span className="text-sm text-muted-foreground">{speed[0]}x</span>
            </div>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Environment Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-kumbh-saffron" />
            Environment Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total Pilgrims */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Pilgrims
              </label>
              <span className="text-sm text-muted-foreground">
                {totalPilgrims[0].toLocaleString()}
              </span>
            </div>
            <Slider
              value={totalPilgrims}
              onValueChange={setTotalPilgrims}
              max={200000}
              min={10000}
              step={5000}
              className="w-full"
            />
          </div>

          {/* Time of Day */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time of Day
              </label>
              <span className="text-sm text-muted-foreground">
                {formatTime(timeOfDay[0])}
              </span>
            </div>
            <Slider
              value={timeOfDay}
              onValueChange={setTimeOfDay}
              max={23}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          {/* Weather Conditions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Weather Conditions</label>
              <span className="text-sm text-muted-foreground">
                {getWeatherDescription(weatherIntensity[0])}
              </span>
            </div>
            <Slider
              value={weatherIntensity}
              onValueChange={setWeatherIntensity}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Scenarios</label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                Peak Hours
              </Button>
              <Button variant="outline" size="sm">
                Emergency
              </Button>
              <Button variant="outline" size="sm">
                Normal Day
              </Button>
              <Button variant="outline" size="sm">
                Festival Day
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationControl;