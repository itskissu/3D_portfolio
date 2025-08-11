import { Canvas, useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom portal shader material
const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#00ffff"),
    uColorEnd: new THREE.Color("#0000ff"),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  `
    uniform float uTime;
    uniform vec3 uColorStart;
    uniform vec3 uColorEnd;
    varying vec2 vUv;

    void main() {
      float alpha = 1.0 - length(vUv - 0.5) * 2.0;
      float pulse = 0.5 + 0.5 * sin(uTime * 3.0 + vUv.y * 10.0);
      vec3 color = mix(uColorStart, uColorEnd, vUv.y + pulse * 0.2);
      gl_FragColor = vec4(color, alpha * pulse);
      if(gl_FragColor.a < 0.01) discard;
    }
  `
);

extend({ PortalMaterial });

function Portal() {
  const ref = useRef();

  useFrame(({ clock }) => {
    ref.current.uTime = clock.getElapsedTime();
    ref.current.rotation.z += 0.002;
  });

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.5, 64]} />
      <portalMaterial ref={ref} />
    </mesh>
  );
}

export default function Home() {
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(135deg, #000010 0%, #000033 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        color: "white",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        padding: 20,
        textAlign: "center",
      }}
    >
      <Canvas style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <Portal />
      </Canvas>

      {/* Overlay UI */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          Amarjeet Patel
        </h1>
        <div style={{ fontSize: "1.25rem" }}>
          <a
            href="https://your-first-link.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#00ffff",
              textDecoration: "none",
              marginRight: 20,
            }}
          >
            Link One
          </a>
          <a
            href="https://your-second-link.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00ffff", textDecoration: "none" }}
          >
            Link Two
          </a>
        </div>
      </div>
    </section>
  );
}
