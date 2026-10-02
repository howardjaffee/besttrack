import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ArcPoint {
  start: THREE.Vector3;
  end: THREE.Vector3;
  midPoint: THREE.Vector3;
}

const routes: [number, number, number, number][] = [
  [40.71, -74.0, 43.65, -79.38],
  [41.88, -87.63, 43.65, -79.38],
  [42.33, -83.05, 42.32, -83.04],
  [40.71, -74.0, 41.5, -87.4],
  [34.05, -118.24, 40.71, -74.0],
];

function latLongToVec3(lat: number, long: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return new THREE.Vector3(x, y, z);
}

function GlobeMesh({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (!reduced) {
        groupRef.current.rotation.y += delta * 0.08;
      }
      groupRef.current.rotation.y += (mouseRef.current.x * 0.3 - groupRef.current.rotation.y) * 0.02;
      groupRef.current.rotation.x += (mouseRef.current.y * 0.2 - groupRef.current.rotation.x) * 0.02;
    }
  });

  const dotsGeometry = useMemo(() => {
    const positions: number[] = [];
    const radius = 2;
    const dotCount = 800;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      positions.push(x * radius, y * radius, z * radius);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const arcs = useMemo<ArcPoint[]>(() => {
    return routes.map(([lat1, lon1, lat2, lon2]) => {
      const start = latLongToVec3(lat1, lon1, 2);
      const end = latLongToVec3(lat2, lon2, 2);
      const midPoint = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(2.6);
      return { start, end, midPoint };
    });
  }, []);

  const arcLines = useMemo(() => {
    return arcs.map((arc) => {
      const curve = new THREE.QuadraticBezierCurve3(arc.start, arc.midPoint, arc.end);
      const points = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: '#00F2FE', transparent: true, opacity: 0.5 });
      return new THREE.Line(geo, mat);
    });
  }, [arcs]);

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    routes.forEach(([lat1, lon1, lat2, lon2]) => {
      positions.push(latLongToVec3(lat1, lon1, 2));
      positions.push(latLongToVec3(lat2, lon2, 2));
    });
    return positions;
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
    >
      {/* Dot sphere */}
      <points ref={dotRef} geometry={dotsGeometry}>
        <pointsMaterial
          size={0.018}
          color="#1e3a5f"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#0a1929" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Latitude/longitude lines */}
      <lineSegments>
        <sphereGeometry args={[2.005, 16, 12]} />
        <meshBasicMaterial color="#00F2FE" wireframe transparent opacity={0.08} />
      </lineSegments>

      {/* Route arcs */}
      {arcLines.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}

      {/* Route nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#00F2FE" />
        </mesh>
      ))}

      {/* Glow on key nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={`glow-${i}`} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#1683FF" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Particle({ curve }: { curve: THREE.QuadraticBezierCurve3 }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useRef(Math.random() * 0.3 + 0.15);

  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * speed.current) % 1;
      const point = curve.getPoint(t);
      ref.current.position.copy(point);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#00F2FE" />
    </mesh>
  );
}

function AnimatedParticles({ reduced }: { reduced: boolean }) {
  const curves = useMemo(() => {
    return routes.map(([lat1, lon1, lat2, lon2]) => {
      const start = latLongToVec3(lat1, lon1, 2);
      const end = latLongToVec3(lat2, lon2, 2);
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(2.6);
      return new THREE.QuadraticBezierCurve3(start, mid, end);
    });
  }, []);

  if (reduced) return null;

  return (
    <>
      {curves.map((curve, i) => (
        <Particle key={i} curve={curve} />
      ))}
    </>
  );
}

export function LogisticsGlobe() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <GlobeMesh reduced={reduced} />
        <AnimatedParticles reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
