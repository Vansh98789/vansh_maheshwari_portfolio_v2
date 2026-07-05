import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Trail, Float } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

/* ---- Mouse tracker → camera parallax ---- */
function MouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const on = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  useFrame((state) => {
    state.camera.position.x += (mouse.current.x * 0.6 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-mouse.current.y * 0.4 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---- Detailed Moon with subtle atmosphere ---- */
function Moon() {
  const group = useRef();
  const meshRef = useRef();
  const atmoRef = useRef();
  const texture = useLoader(
    THREE.TextureLoader,
    "https://images.unsplash.com/photo-1686861453864-9b2a22a97fc9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxtb29uJTIwc3VyZmFjZSUyMHRleHR1cmV8ZW58MHx8fHwxNzgzMTQ0OTQ1fDA&ixlib=rb-4.1.0&q=85&w=1600"
  );

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.18;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
    }
    if (atmoRef.current)
      atmoRef.current.material.opacity =
        0.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
  });

  return (
    <group ref={group} position={[3.6, 0.3, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.85, 128, 128]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.95}
          metalness={0.05}
          emissive={"#F4B961"}
          emissiveIntensity={0.03}
        />
      </mesh>
      {/* Atmospheric glow */}
      <mesh ref={atmoRef} scale={1.08}>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color="#F4B961"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Elliptical ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0.35]}>
        <torusGeometry args={[2.8, 0.03, 16, 200]} />
        <meshBasicMaterial color="#F4B961" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0.35]}>
        <torusGeometry args={[3.2, 0.015, 16, 200]} />
        <meshBasicMaterial color="#F4B961" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ---- Orbiting asteroid ---- */
function Asteroid({ radius = 5, speed = 0.4, size = 0.08, color = "#ffffff", offset = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius + 3.6;
      ref.current.position.z = Math.sin(t) * radius * 0.4;
      ref.current.position.y = Math.sin(t * 1.3) * 0.4 + 0.3;
      ref.current.rotation.x += 0.02;
      ref.current.rotation.y += 0.03;
    }
  });
  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

/* ---- Colored nebula clouds ---- */
function Nebula({ color = "#F4B961", radius = 20, count = 700, opacity = 0.35, size = 0.09 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.5 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);
  useFrame((state, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.015;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ---- Shooting star with trail ---- */
function ShootingStar({ delay = 0, startX = 15, startY = 6 }) {
  const ref = useRef();
  const state = useRef({ x: startX, y: startY, active: false, t: -delay });
  useFrame((_, dt) => {
    const s = state.current;
    s.t += dt;
    if (!s.active && s.t > 0) {
      s.active = true;
      s.x = startX;
      s.y = startY + (Math.random() - 0.5) * 4;
    }
    if (s.active && ref.current) {
      s.x -= dt * 26;
      s.y -= dt * 10;
      ref.current.position.set(s.x, s.y, -3);
      if (s.x < -18) {
        s.active = false;
        s.t = -3 - Math.random() * 6;
      }
    }
  });
  return (
    <Trail width={2.2} length={5} color={"#F4B961"} attenuation={(t) => t * t}>
      <mesh ref={ref} position={[startX, startY, -3]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </Trail>
  );
}

/* ---- Distant planet (Saturn-like) ---- */
function DistantPlanet() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
      ref.current.position.x = -8 + Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={[-8, -3, -12]}>
        <mesh>
          <sphereGeometry args={[0.8, 64, 64]} />
          <meshStandardMaterial color="#7a4ed8" roughness={0.7} emissive="#3a1e6a" emissiveIntensity={0.15} />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0, 0.1]}>
          <torusGeometry args={[1.4, 0.05, 12, 128]} />
          <meshBasicMaterial color="#b58aff" transparent opacity={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <MouseParallax />
      <ambientLight intensity={0.18} />
      <directionalLight position={[5, 3, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-6, -3, -5]} intensity={0.7} color="#F4B961" />
      <pointLight position={[6, 4, -3]} intensity={0.35} color="#a366ff" />

      <Stars radius={100} depth={60} count={7000} factor={4.5} saturation={0} fade speed={0.6} />

      <Nebula color="#F4B961" radius={22} count={600} opacity={0.32} size={0.09} />
      <Nebula color="#8b5cf6" radius={28} count={400} opacity={0.22} size={0.11} />
      <Nebula color="#22d3ee" radius={35} count={250} opacity={0.14} size={0.08} />

      <Suspense fallback={null}>
        <Moon />
      </Suspense>

      <Asteroid radius={4} speed={0.35} size={0.09} color="#e5c893" offset={0} />
      <Asteroid radius={4.5} speed={-0.28} size={0.06} color="#F4B961" offset={2.5} />
      <Asteroid radius={5.2} speed={0.42} size={0.05} color="#a1a1aa" offset={4.2} />
      <Asteroid radius={3.6} speed={-0.5} size={0.07} color="#ffffff" offset={1.5} />

      <DistantPlanet />

      <ShootingStar delay={2} startX={15} startY={7} />
      <ShootingStar delay={9} startX={14} startY={5} />
      <ShootingStar delay={17} startX={16} startY={8} />
      <ShootingStar delay={26} startX={13} startY={4} />
    </>
  );
}

export default function SpaceScene() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      data-testid="space-scene"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
      {/* Vignette + colored nebula CSS layer */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 35%, rgba(244,185,97,0.10) 0%, transparent 45%), radial-gradient(ellipse at 15% 80%, rgba(139,92,246,0.08) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(3,3,5,0.6) 100%)",
        }}
      />
    </div>
  );
}
