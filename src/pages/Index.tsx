import React from 'react';
import HeroSection from '@/components/HeroSection';
import CrowdDashboard from '@/components/CrowdDashboard';
import PilgrimageSchedule from '@/components/PilgrimageSchedule';
import EmergencyInfo from '@/components/EmergencyInfo';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CrowdDashboard />
      <PilgrimageSchedule />
      <EmergencyInfo />
    </div>
  );
};

export default Index;