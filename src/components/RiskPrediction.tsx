import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Shield, 
  Brain, 
  TrendingUp, 
  Clock, 
  MapPin,
  Users,
  Activity
} from 'lucide-react';

interface RiskPrediction {
  id: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  timeToRisk: number; // minutes
  predictedCrowd: number;
  factors: string[];
}

interface MLMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

const RiskPrediction = () => {
  const [predictions, setPredictions] = useState<RiskPrediction[]>([
    {
      id: '1',
      location: 'Triveni Sangam',
      riskLevel: 'critical',
      confidence: 94,
      timeToRisk: 15,
      predictedCrowd: 85000,
      factors: ['High inflow rate', 'Weather conditions', 'Historical patterns']
    },
    {
      id: '2',
      location: 'Ramkund Ghat',
      riskLevel: 'high',
      confidence: 87,
      timeToRisk: 45,
      predictedCrowd: 52000,
      factors: ['Peak bathing time', 'Limited exit routes']
    },
    {
      id: '3',
      location: 'Kalaram Temple',
      riskLevel: 'medium',
      confidence: 76,
      timeToRisk: 120,
      predictedCrowd: 38000,
      factors: ['Ongoing ceremony', 'Moderate crowd buildup']
    }
  ]);

  const [mlMetrics, setMlMetrics] = useState<MLMetrics>({
    accuracy: 92.4,
    precision: 89.7,
    recall: 91.2,
    f1Score: 90.4
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(prediction => ({
        ...prediction,
        confidence: Math.max(70, Math.min(100, prediction.confidence + (Math.random() - 0.5) * 5)),
        timeToRisk: Math.max(5, prediction.timeToRisk + Math.floor((Math.random() - 0.5) * 10))
      })));

      setMlMetrics(prev => ({
        accuracy: Math.max(85, Math.min(100, prev.accuracy + (Math.random() - 0.5) * 2)),
        precision: Math.max(80, Math.min(100, prev.precision + (Math.random() - 0.5) * 3)),
        recall: Math.max(80, Math.min(100, prev.recall + (Math.random() - 0.5) * 3)),
        f1Score: Math.max(80, Math.min(100, prev.f1Score + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'border-l-green-500';
      case 'medium': return 'border-l-yellow-500';
      case 'high': return 'border-l-orange-500';
      case 'critical': return 'border-l-red-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-kumbh-saffron" />
            AI Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-kumbh-spiritual-blue">
                {mlMetrics.accuracy.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <Progress value={mlMetrics.accuracy} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-kumbh-deep-saffron">
                {mlMetrics.precision.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Precision</div>
              <Progress value={mlMetrics.precision} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-kumbh-river-blue">
                {mlMetrics.recall.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Recall</div>
              <Progress value={mlMetrics.recall} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-kumbh-gold">
                {mlMetrics.f1Score.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">F1-Score</div>
              <Progress value={mlMetrics.f1Score} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Predictions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-kumbh-saffron" />
              Predictive Risk Analysis
            </CardTitle>
            <Badge variant="secondary" className="bg-kumbh-saffron/10">
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className={`border-l-4 ${getRiskBorderColor(prediction.riskLevel)}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-kumbh-saffron" />
                        {prediction.location}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className={getRiskColor(prediction.riskLevel)}
                      >
                        {prediction.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-kumbh-spiritual-blue">
                        {prediction.confidence}%
                      </div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{prediction.timeToRisk}min</div>
                        <div className="text-xs text-muted-foreground">Time to Risk</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{prediction.predictedCrowd.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Predicted Crowd</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">+12%</div>
                        <div className="text-xs text-muted-foreground">Growth Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Contributing Factors:</h4>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {prediction.riskLevel === 'critical' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-red-600" />
                        <span className="font-semibold text-red-800">Immediate Action Required</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive">
                          Deploy Response Team
                        </Button>
                        <Button size="sm" variant="outline">
                          Alternative Routes
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskPrediction;