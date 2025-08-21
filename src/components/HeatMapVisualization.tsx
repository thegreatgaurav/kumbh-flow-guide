import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Thermometer, AlertTriangle, TrendingUp } from 'lucide-react';

interface HeatZone {
  id: string;
  name: string;
  x: number;
  y: number;
  intensity: number; // 0-100
  risk: 'low' | 'medium' | 'high' | 'critical';
  crowd: number;
  trend: 'up' | 'down' | 'stable';
}

const HeatMapVisualization = () => {
  const [zones, setZones] = useState<HeatZone[]>([
    { id: '1', name: 'Ramkund Ghat', x: 25, y: 30, intensity: 85, risk: 'high', crowd: 45000, trend: 'up' },
    { id: '2', name: 'Triveni Sangam', x: 60, y: 20, intensity: 95, risk: 'critical', crowd: 78000, trend: 'up' },
    { id: '3', name: 'Sita Gufha', x: 40, y: 60, intensity: 45, risk: 'medium', crowd: 22000, trend: 'down' },
    { id: '4', name: 'Kalaram Temple', x: 70, y: 50, intensity: 70, risk: 'high', crowd: 38000, trend: 'stable' },
    { id: '5', name: 'Godavari Ghat', x: 30, y: 80, intensity: 55, risk: 'medium', crowd: 31000, trend: 'down' },
    { id: '6', name: 'Panchavati', x: 80, y: 75, intensity: 30, risk: 'low', crowd: 12000, trend: 'stable' },
  ]);

  const [selectedZone, setSelectedZone] = useState<HeatZone | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev => prev.map(zone => ({
        ...zone,
        intensity: Math.max(0, Math.min(100, zone.intensity + (Math.random() - 0.5) * 10)),
        crowd: Math.max(1000, zone.crowd + Math.floor((Math.random() - 0.5) * 5000))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 25) return 'rgba(34, 197, 94, 0.6)'; // green
    if (intensity < 50) return 'rgba(234, 179, 8, 0.6)'; // yellow
    if (intensity < 75) return 'rgba(249, 115, 22, 0.6)'; // orange
    return 'rgba(239, 68, 68, 0.6)'; // red
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Heat Map Visualization */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-kumbh-saffron" />
              Real-Time Crowd Density Heat Map
            </CardTitle>
            <Badge variant="secondary" className="bg-kumbh-saffron/10">
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-gradient-to-br from-background to-accent/20 rounded-lg border overflow-hidden">
            {/* Background map overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-kumbh-river-blue/10 to-kumbh-spiritual-blue/5" />
            
            {/* Heat zones */}
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                }}
                onClick={() => setSelectedZone(zone)}
              >
                {/* Heat blob */}
                <div
                  className="w-16 h-16 rounded-full blur-sm animate-pulse"
                  style={{
                    backgroundColor: getIntensityColor(zone.intensity),
                    transform: `scale(${0.8 + zone.intensity / 200})`,
                  }}
                />
                {/* Center marker */}
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-kumbh-spiritual-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg" />
                
                {/* Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-medium text-kumbh-spiritual-blue bg-white/90 px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {zone.name}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
              <h4 className="text-sm font-semibold mb-2">Density Level</h4>
              <div className="flex gap-2 items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Low</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">Medium</span>
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs">High</span>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs">Critical</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-kumbh-saffron" />
            Zone Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedZone ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-kumbh-spiritual-blue">
                  {selectedZone.name}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${getRiskColor(selectedZone.risk)} text-white mt-2`}
                >
                  {selectedZone.risk.toUpperCase()} RISK
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Crowd</p>
                  <p className="text-2xl font-bold text-kumbh-spiritual-blue">
                    {selectedZone.crowd.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Density</p>
                  <p className="text-2xl font-bold text-kumbh-deep-saffron">
                    {Math.round(selectedZone.intensity)}%
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Trend</p>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className={`h-4 w-4 ${
                    selectedZone.trend === 'up' ? 'text-red-500' : 
                    selectedZone.trend === 'down' ? 'text-green-500' : 'text-gray-500'
                  }`} />
                  <span className="capitalize">{selectedZone.trend}</span>
                </div>
              </div>

              {selectedZone.risk === 'critical' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-semibold text-red-800">Critical Alert</span>
                  </div>
                  <p className="text-sm text-red-700">
                    This zone requires immediate crowd management intervention.
                  </p>
                  <Button size="sm" variant="destructive" className="mt-2 w-full">
                    Deploy Emergency Response
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Click on a zone in the heat map to view detailed information
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HeatMapVisualization;