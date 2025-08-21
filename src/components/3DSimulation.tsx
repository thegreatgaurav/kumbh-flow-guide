import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Eye, 
  Cpu,
  Users
} from 'lucide-react';
import * as THREE from 'three';

// Animated crowd particles
const CrowdParticle = ({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * speed) * 0.001;
      meshRef.current.position.z += Math.cos(state.clock.elapsedTime * speed) * 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.02, 8, 8]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};

// Temple/Location markers
const LocationMarker = ({ position, label, riskLevel }: { 
  position: [number, number, number], 
  label: string, 
  riskLevel: string 
}) => {
  const getColor = () => {
    switch (riskLevel) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#f97316';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <group position={position}>
      <Box args={[0.1, 0.2, 0.1]}>
        <meshStandardMaterial color={getColor()} />
      </Box>
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.05}
        color={getColor()}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// Heat zone visualization
const HeatZone = ({ center, radius, intensity }: { 
  center: [number, number, number], 
  radius: number, 
  intensity: number 
}) => {
  const getColor = () => {
    if (intensity < 0.25) return '#10b981';
    if (intensity < 0.5) return '#f59e0b';
    if (intensity < 0.75) return '#f97316';
    return '#ef4444';
  };

  return (
    <Sphere position={center} args={[radius, 16, 16]}>
      <meshStandardMaterial 
        color={getColor()} 
        transparent 
        opacity={0.3}
        wireframe
      />
    </Sphere>
  );
};

// Main 3D Scene
const Scene3D = () => {
  // Sample data for visualization
  const locations = [
    { position: [-1, 0, -1] as [number, number, number], label: 'Ramkund', riskLevel: 'high' },
    { position: [1, 0, -1] as [number, number, number], label: 'Triveni', riskLevel: 'critical' },
    { position: [0, 0, 1] as [number, number, number], label: 'Kalaram', riskLevel: 'medium' },
    { position: [-1.5, 0, 0.5] as [number, number, number], label: 'Sita Gufha', riskLevel: 'low' }
  ];

  const heatZones = [
    { center: [-1, 0, -1] as [number, number, number], radius: 0.3, intensity: 0.8 },
    { center: [1, 0, -1] as [number, number, number], radius: 0.4, intensity: 0.95 },
    { center: [0, 0, 1] as [number, number, number], radius: 0.25, intensity: 0.6 },
    { center: [-1.5, 0, 0.5] as [number, number, number], radius: 0.2, intensity: 0.3 }
  ];

  // Generate crowd particles
  const crowdParticles = [];
  for (let i = 0; i < 200; i++) {
    const x = (Math.random() - 0.5) * 4;
    const z = (Math.random() - 0.5) * 4;
    const y = 0.02;
    const intensity = Math.abs(x) + Math.abs(z) < 1.5 ? 0.8 : 0.3;
    const color = intensity > 0.6 ? '#ef4444' : '#10b981';
    crowdParticles.push({
      position: [x, y, z] as [number, number, number],
      color,
      speed: Math.random() * 2 + 1
    });
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>

      {/* Location markers */}
      {locations.map((location, index) => (
        <LocationMarker
          key={index}
          position={location.position}
          label={location.label}
          riskLevel={location.riskLevel}
        />
      ))}

      {/* Heat zones */}
      {heatZones.map((zone, index) => (
        <HeatZone
          key={index}
          center={zone.center}
          radius={zone.radius}
          intensity={zone.intensity}
        />
      ))}

      {/* Crowd particles */}
      {crowdParticles.map((particle, index) => (
        <CrowdParticle
          key={index}
          position={particle.position}
          color={particle.color}
          speed={particle.speed}
        />
      ))}

      {/* Camera controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={8}
        minDistance={2}
      />
    </>
  );
};

const Simulation3D = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [view, setView] = useState<'overview' | 'heatmap' | 'crowd'>('overview');

  return (
    <Card className={isFullscreen ? 'fixed inset-4 z-50' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-kumbh-saffron" />
            3D Crowd Simulation
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-kumbh-saffron/10">
              Real-time
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* View Controls */}
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant={view === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('overview')}
          >
            <Eye className="h-4 w-4 mr-1" />
            Overview
          </Button>
          <Button
            variant={view === 'heatmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('heatmap')}
          >
            Heat Map
          </Button>
          <Button
            variant={view === 'crowd' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('crowd')}
          >
            <Users className="h-4 w-4 mr-1" />
            Crowd Flow
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* 3D Canvas */}
        <div className={`bg-gradient-to-br from-background to-accent/20 rounded-lg border overflow-hidden ${
          isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-96'
        }`}>
          <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Critical Risk</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-kumbh-spiritual-blue">226K</div>
            <div className="text-sm text-muted-foreground">Total Simulated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-kumbh-deep-saffron">8</div>
            <div className="text-sm text-muted-foreground">Active Zones</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-kumbh-river-blue">92%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Simulation3D;