import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Navigation, 
  Clock,
  MapPin,
  Users
} from 'lucide-react';

const EmergencyInfo = () => {
  const emergencyContacts = [
    { title: 'Police Control Room', number: '100', icon: Shield, color: 'bg-blue-500' },
    { title: 'Medical Emergency', number: '108', icon: Heart, color: 'bg-red-500' },
    { title: 'Fire Brigade', number: '101', icon: AlertTriangle, color: 'bg-orange-500' },
    { title: 'Kumbh Mela Helpline', number: '1800-123-4567', icon: Users, color: 'bg-kumbh-saffron' }
  ];

  const safetyGuidelines = [
    {
      title: 'Stay with your group',
      description: 'Always move in groups and designate meeting points',
      icon: Users
    },
    {
      title: 'Follow designated routes',
      description: 'Use marked pathways and follow crowd control directions',
      icon: Navigation
    },
    {
      title: 'Keep emergency contacts handy',
      description: 'Save important numbers and carry identification',
      icon: Phone
    },
    {
      title: 'Stay hydrated',
      description: 'Drink water regularly and take breaks in shade',
      icon: Heart
    }
  ];

  const currentAlerts = [
    {
      type: 'High Crowd Density',
      location: 'Triveni Sangam',
      time: '10 mins ago',
      severity: 'high'
    },
    {
      type: 'Route Diversion',
      location: 'Ramkund Approach Road',
      time: '25 mins ago',
      severity: 'medium'
    },
    {
      type: 'Weather Update',
      location: 'All Areas',
      time: '1 hour ago',
      severity: 'low'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-accent/30 to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-kumbh-spiritual-blue mb-4">
            Safety & Emergency Information
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your safety is our priority. Stay informed and prepared during your pilgrimage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Contacts */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kumbh-spiritual-blue">
                  <Phone className="h-6 w-6" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg border bg-card/50">
                    <div className={`p-2 rounded-full ${contact.color}`}>
                      <contact.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{contact.title}</p>
                      <p className="text-lg font-bold text-kumbh-spiritual-blue">{contact.number}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Safety Guidelines */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kumbh-spiritual-blue">
                  <Shield className="h-6 w-6" />
                  Safety Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {safetyGuidelines.map((guideline, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card/50">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-kumbh-saffron/10">
                        <guideline.icon className="h-5 w-5 text-kumbh-saffron" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{guideline.title}</h4>
                        <p className="text-sm text-muted-foreground">{guideline.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Live Alerts */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kumbh-spiritual-blue">
                  <AlertTriangle className="h-6 w-6" />
                  Live Alerts
                  <Badge variant="destructive" className="ml-auto">
                    {currentAlerts.length} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{alert.type}</h4>
                      <span className="text-xs">{alert.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{alert.location}</span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-kumbh-saffron/5 to-kumbh-gold/5 border-kumbh-saffron/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-kumbh-spiritual-blue mb-4">
                Need Immediate Help?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our emergency response team is available 24/7 during Kumbh Mela. 
                Don't hesitate to reach out if you need assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="sacred" size="lg" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Helpline
                </Button>
                <Button variant="spiritual" size="lg" className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Find Nearest Help Point
                </Button>
                <Button variant="golden" size="lg" className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Safe Route Guidance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmergencyInfo;