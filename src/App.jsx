import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import Experience from "./Experience";
import { Bvh, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import StageOne from "./StageOne";
import RoomScene from "./RoomScene";
import { useState } from "react";

function App() {
  const [position, setPosition] = useState([10, 2, 8]);
  const [showCameraRig, setShowCameraRig] = useState(true);

  return (
    <>
      <div id="canvas">
        <Canvas
          shadows
          dpr={1.5}
          flat
          // camera={{ fov: 55 }}

          camera={{
            position: [-10, 10, 5],
            fov: 35,
            near: 0.1,
            far: 100,
            // position: [0, 0.2, 1],
          }}
        >
          {showCameraRig && <CameraRig position={position} />}
          <color args={["#070707"]} attach="background" />
          <Bvh firstHitOnly>
            <Perf position="top-left" />

            <OrbitControls makeDefault />
            <ambientLight />

            <Experience />
            {/* <StageOne /> */}
            <group position={[12, 0, 0]} rotation-y={Math.PI / 2}>
              <RoomScene />
            </group>
          </Bvh>
        </Canvas>
        <div
          onClick={() => setShowCameraRig(!showCameraRig)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "200px",
            right: "200px",
            background: "orange",
          }}
        >
          ~ .& Disable Rig
        </div>
      </div>
    </>
  );
}
function CameraRig({ position: [x, y, z] }) {
  const camera = useThree((state) => state.camera);

  useFrame((state) => {
    state.camera.position.lerp({ x, y, z }, 0.1);
    state.camera.lookAt(12, 1, 0);
  });
}
export default App;
