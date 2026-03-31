"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
}

export default function ModelViewer({
  url,
  scale = 1,
  className = "",
  autoRotate = true,
}: {
  url: string;
  scale?: number;
  className?: string;
  autoRotate?: boolean;
}) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="night" />
          <Model url={url} scale={scale} />
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableZoom={false}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
