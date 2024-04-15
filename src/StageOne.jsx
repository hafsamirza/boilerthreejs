import {
  BakeShadows,
  ContactShadows,
  CycleRaycast,
  useCursor,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function StageOne() {
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 });
  return (
    <>
      {/* CycleRaycast's status data can now be turned into informative HTML */}

      {/* <Canvas shadows dpr={1.5} camera={{ position: [-10, 10, 5], fov: 50 }}> */}
      <Stage />
      {Array.from({ length: 2 }, (_, i) => (
        <Stair
          key={i}
          name={"stair-" + (i + 1)}
          rotation={[-Math.PI / 2, 0, i / Math.PI / 2]}
          position={[2 - Math.sin(i / 5) * 5, i * 0.5, 2 - Math.cos(i / 5) * 5]}
        />
      ))}
      {/* This component cycles through the raycast intersections, combine it with event.stopPropagation! */}
      <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} />
      {/* </Canvas> */}
    </>
  );
}
function Stair(props) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  useFrame((state) =>
    ref.current.scale.setScalar(
      hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 50 : 1
    )
  );
  // Sets document.body.style.cursor: useCursor(flag, onPointerOver = 'pointer', onPointerOut = 'auto')
  useCursor(hovered);
  return (
    <mesh
      {...props}
      ref={ref}
      receiveShadow
      castShadow
      onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}
    >
      <boxGeometry args={[2, 6, 0.075]} />
      <meshStandardMaterial
        roughness={1}
        transparent
        opacity={0.6}
        color={clicked ? "lightblue" : hovered ? "aquamarine" : "white"}
      />
    </mesh>
  );
}
function Stage() {
  return (
    <>
      <ContactShadows position={[0, 0, 0]} scale={120} />
      {/* Fill */}
      <ambientLight intensity={0.5} />
      {/* Main */}
      {/* <directionalLight
        position={[1, 10, -2]}
        intensity={1}
        shadow-camera-far={70}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[512, 512]}
        castShadow
      /> */}
      {/* Strip */}
      {/* <directionalLight position={[-10, -10, 2]} intensity={3} /> */}
      {/* Ground */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -2.75, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      {/* This freezes the shadow map, which is fast, but the model has to be static  */}
      <BakeShadows />
    </>
  );
}
