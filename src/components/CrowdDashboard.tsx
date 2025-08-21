import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Users, MapPin, Clock } from 'lucide-react';

interface CrowdData {
  location: string;
  density: 'Low' | 'Medium' | 'High' | 'Critical';
  count: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

const CrowdDashboard = () => {
  const [crowdData, setCrowdData] = useState<CrowdData[]>([
    { location: 'Ramkund Ghat', density: 'High', count: 45000, trend: 'increasing' },
    { location: 'Triveni Sangam', density: 'Critical', count: 78000, trend: 'stable' },
    { location: 'Sita Gufha', density: 'Medium', count: 22000, trend: 'decreasing' },
    { location: 'Kalaram Temple', density: 'High', count: 38000, trend: 'increasing' },
    { location: 'Godavari Ghat', density: 'Medium', count: 31000, trend: 'stable' },
    { location: 'Panchavati', density: 'Low', count: 12000, trend: 'decreasing' }
  ]);

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(prev => prev.map(item => ({
        ...item,
        count: item.count + Math.floor(Math.random() * 2000 - 1000)
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const totalPilgrims = crowdData.reduce((sum, item) => sum + item.count, 0);
  const criticalAreas = crowdData.filter(item => item.density === 'Critical').length;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-kumbh-spiritual-blue mb-4">
            Real-Time Crowd Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Live monitoring of pilgrim density across key locations for your safety and convenience
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-l-4 border-l-kumbh-saffron">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Pilgrims</p>
                  <p className="text-3xl font-bold text-kumbh-spiritual-blue">
                    {totalPilgrims.toLocaleString()}
                  </p>
                </div>
                <Users className="h-12 w-12 text-kumbh-saffron" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Areas</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {criticalAreas}
                  </p>
                </div>
                <AlertTriangle className="h-12 w-12 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-kumbh-river-blue">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-lg font-semibold text-kumbh-river-blue">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-kumbh-river-blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crowdData.map((location, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-kumbh-saffron" />
                    {location.location}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={`${getDensityColor(location.density)} text-white`}
                  >
                    {location.density}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-kumbh-spiritual-blue">
                      {location.count.toLocaleString()}
                    </span>
                    <span className="text-lg">
                      {getTrendIcon(location.trend)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current pilgrims • {location.trend}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getDensityColor(location.density)}`}
                      style={{ 
                        width: `${Math.min((location.count / 80000) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Center */}
        <div className="text-center mt-12">
          <div className="bg-card rounded-lg p-8 border">
            <h3 className="text-2xl font-bold text-kumbh-spiritual-blue mb-4">
              Need Assistance?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our crowd management team is here to help you navigate safely
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="sacred">
                Request Route Guidance
              </Button>
              <Button variant="spiritual">
                Report Crowd Issue
              </Button>
              <Button variant="golden">
                Emergency Assistance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrowdDashboard;