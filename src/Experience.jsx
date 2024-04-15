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

export default function Experience() {
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
  const textures = useTexture({
    map: "/sandstone/textures/old_sandstone_02_diff_2k.jpg",
    displacementMap: "/sandstone/textures/old_sandstone_02_disp_2k.png",
    aoMap: "/sandstone/textures/old_sandstone_02_arm_2k.jpg",
    roughnessMap: "/sandstone/textures/old_sandstone_02_arm_2k.jpg",
    normalMap: "/sandstone/textures/old_sandstone_02_nor_gl_2k.jpg",
  });
  const texturesOne = useTexture({
    map: "/textures/rock_wall_07_diff_2k.jpg",
    displacementMap: "/textures/rock_wall_07_disp_2k.jpg",
    aoMap: "/textures/rock_wall_07_arm_2k.jpg",
    roughnessMap: "/textures/rock_wall_07_arm_2k.jpg",
    normalMap: "/textures/rock_wall_07_nor_gl_2k.jpg",
  });
  const texturesTwo = useTexture({
    map: "/textures/rock_wall_10_diff_2k.jpg",
    displacementMap: "/textures/rock_wall_10_disp_2k.jpg",
    aoMap: "/textures/rock_wall_10_arm_2k.jpg",
    roughnessMap: "/textures/rock_wall_10_arm_2k.jpg",
    normalMap: "/textures/rock_wall_10_nor_gl_2k.jpg",
  });
  const grassTexture = useTexture({
    map: "/textures/coast_sand_rocks_02_diff_2k.jpg",
    displacementMap: "/textures/coast_sand_rocks_02_disp_2k.jpg",
    aoMap: "/textures/coast_sand_rocks_02_arm_2k.jpg",
    roughnessMap: "/textures/coast_sand_rocks_02_arm_2k.jpg",
    normalMap: "/textures/coast_sand_rocks_02_nor_gl_2k.jpg",
  });

  textures.map.repeat.set(4, 4);
  textures.displacementMap.repeat.set(4, 4);
  textures.aoMap.repeat.set(4, 4);
  textures.roughnessMap.repeat.set(4, 4);
  textures.normalMap.repeat.set(4, 4);

  textures.map.wrapS = THREE.RepeatWrapping;
  textures.map.wrapT = THREE.RepeatWrapping;
  textures.displacementMap.wrapS = THREE.RepeatWrapping;
  textures.displacementMap.wrapT = THREE.RepeatWrapping;
  textures.aoMap.wrapS = THREE.RepeatWrapping;
  textures.aoMap.wrapT = THREE.RepeatWrapping;
  textures.roughnessMap.wrapS = THREE.RepeatWrapping;
  textures.roughnessMap.wrapT = THREE.RepeatWrapping;

  textures.normalMap.wrapS = THREE.RepeatWrapping;
  textures.normalMap.wrapT = THREE.RepeatWrapping;
  textures.map.rotation = Math.PI / 2;
  textures.displacementMap.rotation = Math.PI / 2;
  textures.aoMap.rotation = Math.PI / 2;
  textures.roughnessMap.rotation = Math.PI / 2;
  textures.normalMap.rotation = Math.PI / 2;

  texturesTwo.map.repeat.set(5, 5);
  texturesTwo.displacementMap.repeat.set(5, 5);
  texturesTwo.aoMap.repeat.set(5, 5);
  texturesTwo.roughnessMap.repeat.set(5, 5);
  texturesTwo.normalMap.repeat.set(5, 5);

  texturesTwo.map.wrapS = THREE.RepeatWrapping;
  texturesTwo.map.wrapT = THREE.RepeatWrapping;
  texturesTwo.displacementMap.wrapS = THREE.RepeatWrapping;
  texturesTwo.displacementMap.wrapT = THREE.RepeatWrapping;
  texturesTwo.aoMap.wrapS = THREE.RepeatWrapping;
  texturesTwo.aoMap.wrapT = THREE.RepeatWrapping;
  texturesTwo.roughnessMap.wrapS = THREE.RepeatWrapping;
  texturesTwo.roughnessMap.wrapT = THREE.RepeatWrapping;

  texturesTwo.normalMap.wrapS = THREE.RepeatWrapping;
  texturesTwo.normalMap.wrapT = THREE.RepeatWrapping;
  texturesTwo.map.rotation = Math.PI / 2;
  texturesTwo.displacementMap.rotation = Math.PI / 2;
  texturesTwo.aoMap.rotation = Math.PI / 2;
  texturesTwo.roughnessMap.rotation = Math.PI / 2;
  texturesTwo.normalMap.rotation = Math.PI / 2;

  return (
    <>
      <Suspense fallback={<Box />}>
        {/* <color args={["ivory"]} attach="background" /> */}
        <ambientLight intensity={1.1} />
        <BakeShadows />
        <color args={["#000"]} attach={"background"} />
        <group
          ref={cubeRef}
          // scale={5}
          position={[0, 0.2, 0]}
          onClick={() => {
            setMesh(charlotte);
          }}
          castShadow
        >
          <meshStandardMaterial
            {...textures}
            // wireframe
          />
        </group>

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
        {/* 
        <directionalLight
          ref={directionalLight2}
          // position={sunPosition}
          position={[2, 1, 2]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-top={5}
          shadow-camera-right={5}
          shadow-camera-bottom={-5}
          shadow-camera-left={-5}
        /> */}
        {/* <Stage preset="soft"> */}
        <Model textures={textures} />
        {/* </Stage> */}
        <mesh receiveShadow castShadow position={[1.2, 1, 2]}>
          <planeGeometry args={[2, 2, 360, 180]} />
          <meshPhysicalMaterial displacementScale={0.054} {...textures} />
        </mesh>
        <mesh receiveShadow castShadow position={[3.2, 1, 2]}>
          <planeGeometry args={[2, 2, 360, 180]} />
          <meshPhysicalMaterial
            displacementScale={0.07}
            // displacementBias={0.1}
            {...texturesTwo}
            color={"#fff"}
          />
        </mesh>
        <mesh
          receiveShadow
          rotation-x={-Math.PI / 2}
          castShadow
          position={[1.5, 2.5, 3]}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial />
        </mesh>
        <mesh receiveShadow castShadow position={[3.7, 2.5, 3]}>
          <boxGeometry />
          <meshPhysicalMaterial color={"#fff"} />
        </mesh>
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
  const cubeRef = useRef();
  // useFrame((state, delta) => {
  // console.log(delta);
  // cubeRef.current.rotation.y += state.clock.elapsedTime * 0.01;
  // const time = state.clock.elapsedTime;
  // cubeRef.current.position.x = 2 + Math.sin(time);
  // });

  const colorMap = useTexture("/models/02/charlotte3_baseColor.png");
  const normalMap = useTexture("/models/02/charlotte3_normal.png");
  const mixMap = useTexture(
    "/models/02/charlotte3_occlusionRoughnessMetallic.png"
  );

  colorMap.repeat.set(8, 8);
  normalMap.repeat.set(8, 8);
  mixMap.repeat.set(8, 8);
  // normalMap.repeat.set(8, 8);

  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  const { nodes, materials } = useGLTF("/models/charlote-transformed.glb");
  const [replaceCube, setReplaceCube] = useState(false);

  return (
    <group {...props} dispose={null}>
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
      <mesh
        castShadow
        // receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials.stone1}
        position={[0.027, 1.402, -0.154]}
      />
      <mesh
        // castShadow
        // receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.004"]}
        position={[0.016, 0.214, -0.81]}
      >
        {/* <meshStandardMaterial {...props.textures} /> */}
      </mesh>
    </group>
  );
}
useGLTF.preload("/models/charlotte-transformed.glb");
