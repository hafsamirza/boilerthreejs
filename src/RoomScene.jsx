import {
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
  Html,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  Sky,
  Stage,
  useGLTF,
  useHelper,
  useTexture,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { LinearEncoding } from "@react-three/drei/helpers/deprecated";

export default function RoomScene() {
  const cubeRef = useRef();
  const charlotte = useGLTF("/models/charlote.glb");

  const cubeMesh = charlotte.nodes.Cube001;
  console.log(cubeMesh.geometry);

  const geometry = cubeMesh.geometry;

  const walls = useGLTF("/models/walls.glb");
  const [Mesh, setMesh] = useState(walls);
  useFrame((state, delta) => {
    // console.log(delta);
    // cubeRef.current.rotation.y += delta * 0.5;
    // const time = state.clock.elapsedTime;
    // cubeRef.current.position.x = 2 + Math.sin(time);
  });
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  const directionalLight2 = useRef();
  useHelper(directionalLight2, THREE.DirectionalLightHelper, 1);
  // console.log(nodes);

  return (
    <>
      <Suspense fallback={<Box />}>
        <ambientLight intensity={1.1} />
        <BakeShadows />

        <directionalLight
          ref={directionalLight}
          // position={sunPosition}
          position={[4, 3, 4]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={5}
          shadow-camera-right={5}
          shadow-camera-bottom={-5}
          shadow-camera-left={-5}
        />

        <Model />
        <group rotation-y={Math.PI} position={[0.5, 0, 3]}>
          <primitive object={charlotte.scene} />
        </group>
        <mesh
          receiveShadow
          position={[0, -0.1, 0]}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </Suspense>
    </>
  );
}

function Box() {
  return (
    <>
      <Html>Loading...</Html>
    </>
  );
}
export function Model(props) {
  const kitchen = useGLTF("/kitchen-transformed.glb");
  const [replaceCube, setReplaceCube] = useState(false);

  return (
    <group {...props} dispose={null}>
      <primitive object={kitchen.scene} />

      {/* <mesh
          // castShadow
          receiveShadow
          geometry={nodes.Plane008.geometry}
          material={materials.Material}
          position={[-0.675, 0.214, 0.221]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.68}
        /> */}
      {/* <mesh
          // castShadow
          receiveShadow
          geometry={nodes.Plane010.geometry}
          material={materials.Material}
          position={[1.029, 0.214, -0.183]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.68}
        /> */}
    </group>
  );
}
useGLTF.preload("/models/charlotte-transformed.glb");
