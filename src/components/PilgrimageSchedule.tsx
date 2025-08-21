import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  Sun,
  Moon,
  Sunrise
} from 'lucide-react';

const PilgrimageSchedule = () => {
  const majorEvents = [
    {
      date: '2027-07-15',
      title: 'Kumbh Mela Begins',
      time: '04:00 AM',
      type: 'Shahi Snan',
      importance: 'high',
      location: 'Triveni Sangam'
    },
    {
      date: '2027-07-22',
      title: 'Makar Sankranti',
      time: '05:30 AM', 
      type: 'Royal Bath',
      importance: 'highest',
      location: 'Ramkund Ghat'
    },
    {
      date: '2027-08-05',
      title: 'Mauni Amavasya',
      time: '04:00 AM',
      type: 'Shahi Snan',
      importance: 'highest',
      location: 'All Major Ghats'
    },
    {
      date: '2027-08-19',
      title: 'Basant Panchami',
      time: '06:00 AM',
      type: 'Sacred Bath',
      importance: 'high',
      location: 'Godavari Ghat'
    },
    {
      date: '2027-09-02',
      title: 'Maghi Purnima',
      time: '05:00 AM',
      type: 'Royal Bath',
      importance: 'highest',
      location: 'Triveni Sangam'
    },
    {
      date: '2027-09-15',
      title: 'Maha Shivratri',
      time: 'All Day',
      type: 'Festival',
      importance: 'high',
      location: 'All Temples'
    }
  ];

  const dailySchedule = [
    {
      time: '04:00 - 06:00',
      activity: 'Brahma Muhurta - Most Auspicious Bathing Time',
      icon: Sunrise,
      crowd: 'Low'
    },
    {
      time: '06:00 - 10:00',
      activity: 'Morning Prayers & Temple Visits',
      icon: Sun,
      crowd: 'Medium'
    },
    {
      time: '10:00 - 16:00',
      activity: 'Satsang & Cultural Programs',
      icon: Clock,
      crowd: 'High'
    },
    {
      time: '16:00 - 19:00',
      activity: 'Evening Aarti & Sacred Baths',
      icon: Sun,
      crowd: 'Very High'
    },
    {
      time: '19:00 - 22:00',
      activity: 'Spiritual Discourses',
      icon: Moon,
      crowd: 'Medium'
    }
  ];

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'highest': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getCrowdColor = (crowd: string) => {
    switch (crowd) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Very High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-kumbh-saffron/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-kumbh-spiritual-blue mb-4">
            Sacred Schedule & Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plan your spiritual journey with our comprehensive schedule of rituals, ceremonies, and auspicious times
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Major Events */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kumbh-spiritual-blue">
                  <Calendar className="h-6 w-6" />
                  Major Events & Sacred Baths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {majorEvents.map((event, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-kumbh-spiritual-blue">{event.title}</h4>
                          <div className={`w-3 h-3 rounded-full ${getImportanceColor(event.importance)}`}></div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatDate(event.date)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-kumbh-saffron/10 text-kumbh-spiritual-blue">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-kumbh-saffron" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-kumbh-saffron" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="sacred" className="w-full mt-4">
                  <Star className="h-4 w-4 mr-2" />
                  Add to Personal Calendar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Daily Schedule */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-kumbh-spiritual-blue">
                  <Clock className="h-6 w-6" />
                  Daily Schedule & Crowd Forecast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailySchedule.map((schedule, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-kumbh-saffron/10 flex-shrink-0">
                        <schedule.icon className="h-5 w-5 text-kumbh-saffron" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-kumbh-spiritual-blue text-sm">
                            {schedule.time}
                          </h4>
                          <Badge className={`text-xs ${getCrowdColor(schedule.crowd)}`}>
                            {schedule.crowd} Crowd
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {schedule.activity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-kumbh-saffron/5 to-kumbh-gold/5 p-4 rounded-lg border-l-4 border-l-kumbh-saffron mt-6">
                  <h4 className="font-semibold text-kumbh-spiritual-blue mb-2">
                    Best Visiting Times
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    For the most peaceful experience, visit during early morning hours (4-6 AM) or late evening (after 8 PM).
                  </p>
                  <Button variant="golden" size="sm" className="w-full">
                    Get Personalized Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-kumbh-spiritual-blue/5 to-kumbh-river-blue/5 border-kumbh-spiritual-blue/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-kumbh-spiritual-blue mb-4">
                Plan Your Sacred Journey
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get personalized recommendations based on your preferences and crowd forecasts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="sacred" size="lg">
                  Create My Itinerary
                </Button>
                <Button variant="spiritual" size="lg">
                  Set Event Reminders
                </Button>
                <Button variant="golden" size="lg">
                  Download Schedule PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PilgrimageSchedule;