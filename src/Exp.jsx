import {
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
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
import { useRef, useState } from "react";
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
  // const [displacementMap, colorMap] = useLoader(TextureLoader, [
  //   "/textures/disp.png",
  // ]);
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  // console.log(nodes);
  const textures = useTexture({
    map: "/sandstone/textures/old_sandstone_02_diff_2k.jpg",
    bumpMap: "/sandstone/textures/old_sandstone_02_disp_2k.png",
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
  textures.bumpMap.repeat.set(4, 4);
  textures.aoMap.repeat.set(4, 4);
  textures.roughnessMap.repeat.set(4, 4);
  textures.normalMap.repeat.set(4, 4);

  textures.map.wrapS = THREE.RepeatWrapping;
  textures.map.wrapT = THREE.RepeatWrapping;
  textures.bumpMap.wrapS = THREE.RepeatWrapping;
  textures.bumpMap.wrapT = THREE.RepeatWrapping;
  textures.aoMap.wrapS = THREE.RepeatWrapping;
  textures.aoMap.wrapT = THREE.RepeatWrapping;
  textures.roughnessMap.wrapS = THREE.RepeatWrapping;
  textures.roughnessMap.wrapT = THREE.RepeatWrapping;

  textures.normalMap.wrapS = THREE.RepeatWrapping;
  textures.normalMap.wrapT = THREE.RepeatWrapping;
  textures.map.rotation = Math.PI / 2;
  textures.bumpMap.rotation = Math.PI / 2;
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
  // c
  // const normalM = useTexture(
  //   "/sandstone/textures/old_sandstone_02_nor_dx_2k.jpg"
  // );  textures.map.rotation = Math.PI;

  // colorMap.repeat.set(8, 8);
  // aoMap.repeat.set(8, 8);
  // roughnesMap.repeat.set(8, 8);
  // normalMap.repeat.set(8, 8);

  // colorMap.wrapS = THREE.RepeatWrapping;
  // colorMap.wrapT = THREE.RepeatWrapping;

  // normalMap.wrapS = THREE.RepeatWrapping;
  // normalMap.wrapT = THREE.RepeatWrapping;

  // roughnesMap.wrapS = THREE.RepeatWrapping;
  // roughnesMap.wrapT = THREE.RepeatWrapping;

  // aoMap.wrapS = THREE.RepeatWrapping;
  // aoMap.wrapT = THREE.RepeatWrapping;
  // const existingGeometry = nodes.Cube001.geometry.clone();
  charlotte.scene.traverse((child) => {
    if (child.isMesh && child.name === "Plane008") {
      child.material.metalness = 0.4;
      child.material.roughness = 0.2;

      // (child.material.color = new THREE.Color(0xff3000)); // Change color to red
    }
  });
  return (
    <>
      {/* <color args={["ivory"]} attach="background" /> */}
      <ambientLight intensity={1.1} />
      <BakeShadows />

      {/* <mesh
          position={[1.05, 0.7, -0.5]}
          scale={[1.5, 1.5, 1]}
          rotation-y={Math.PI / 2}
        >
          <planeGeometry args={[1, 1, 300, 180]} />
          <meshPhysicalMaterial
            {...textures}
            // wireframe
  
            // displacementBias={-0.01}
            // metalness={0.5}
            displacementScale={0.04}
            // roughness={0}
          />
        </mesh> */}

      {/* <mesh position={[1.05, 0.7, 0.5]} scale={[1.5, 1.5, 1]}>
          <planeGeometry args={[1, 1, 300, 180]} />
          <meshPhysicalMaterial
            {...textures}
            // wireframe
  
            // displacementBias={-0.01}
            // metalness={0.5}
            displacementScale={0.04}
            // roughness={0}
          />
        </mesh> */}
      {/* <mesh position={[3, 1, 1]} scale={1}>
          <planeGeometry args={[1, 1, 300, 180]} />
          <meshStandardMaterial
            {...texturesOne}
            // wireframe
  
            // displacementBias={-0.01}
            // metalness={0.5}
            displacementScale={0.04}
            // roughness={0}
          />
        </mesh>
        <mesh position={[0, 1, 1]} scale={1}>
          <planeGeometry args={[1.2, 1.6, 360, 180]} />
          <meshStandardMaterial
            {...texturesTwo}
            // wireframe
            envMapIntensity={10}
            // displacementBias={-0.01}
            // metalness={0.5}
            displacementScale={0.05}
            // roughness={0}
          />
        </mesh> */}
      <color args={["#000"]} attach={"background"} />

      <Perf position="top-left" />
      {/* <Environment
          preset="city"
          background
          resolution={300}
          environmentIntensity={1.45}
        /> */}
      {/* <mesh position-z={-5} scale={10}>
            <planeGeometry />
  
            <meshBasicMaterial color={"red"} />
          </mesh> */}
      {/* <Lightformer
            position={[0, 0, -5]}
            scale={5}
            color={"#999999"}
            intensity={5}
            form={"ring"}
          /> */}

      <OrbitControls makeDefault />
      {/* <Sky sunPosition={1} /> */}
      {/* <hemisphereLight
          position={[0, 1, 5]}
          color={"blue"}
          groundColor={"red"}
          intensity={4.15}
        /> */}
      {/* <ContactShadows position={[0, 0, -0.05]} scale={40} /> */}
      <group
        ref={cubeRef}
        // scale={5}
        position={[0, 0.2, 0]}
        onClick={() => {
          setMesh(charlotte);
        }}
        castShadow
      >
        {/* <primitive object={Mesh.nodes.Plane008}> */}
        {/* <meshStandardMaterial
              {...textures}
              // wireframe
              displacementScale={0.01}
            /> */}
        {/* </primitive> */}
        {/* <primitive object={Mesh.nodes.Plane010} /> */}
        {/* <pointLight
            castShadow
            position={[0.1, 1.35, 0.4]}
            color={"orange"}
            intensity={0.5}
            shadow-mapSize={[1024, 1024]}
          /> */}
        {/* 
          <mesh
            geometry={charlotte.nodes.Cube001}
            material={charlotte.material}
          /> */}

        {/* <primitive receiveShadows object={charlotte.nodes.Cube001}> */}
        <meshStandardMaterial
          {...textures}
          // wireframe
        />
        {/* </primitive> */}
        {/* <primitive castShadow object={charlotte.nodes.Cube004}> */}
        {/* <meshStandardMaterial
              // {...texturesTwo}
              // wireframe
              displacementScale={0}
            /> */}
        {/* </primitive> */}
      </group>

      <directionalLight
        ref={directionalLight}
        // position={sunPosition}
        position={[1, 2, 2]}
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

      {/* <directionalLight
          ref={directionalLight}
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
      <Model />
      {/* </Stage> */}
      {/* <mesh castShadow position={[2, 0.5, 0]}>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh> */}
      {/* <mesh position={[0, 2, 0]}>
          <planeGeometry args={[5, 5, 20, 20]} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            bumpMap={bumpMap}
            aoMap={aoMap}
            metalnessMap={metalnessMap}
            displacementMap={bumpMap}
            displacementScale={0.2}
            roughnessMap={roughnesMap}
          />
        </mesh> */}
      <mesh
        // receiveShadow
        position={[0, -0.1, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial
          // {...grassTexture}
          // // wireframe
          // displacementScale={0.02}
          // displacementBias={-0.1}
          // side={THREE.BackSide}
          // map={useTexture("/sandstone/textures/old_sandstone_02_diff_2k.jpg")}
          color={"orange"}
        />
      </mesh>

      {/* <mesh geometry={existingGeometry}>
          <meshStandardMaterial
            position={[0, 0, 0.1]}
            map={colorMap}
            args={[{ wireframe: false }]}
            aoMap={aoMap}
            aoMapIntensity={1}
            normalMap={normalM}
            roughnessMap={roughnesMap}
            displacementMap={displacementMap}
            displacementScale={0.05}
            metalnessMap={metalnessMap}
            displacementBias={-0.04}
          />
        </mesh> */}
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
  const { nodes, materials } = useGLTF("/public/models/charlote.glb");
  const [replaceCube, setReplaceCube] = useState(false);

  return (
    <group {...props} dispose={null}>
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials.Material}
        position={[-0.675, 0.214, 0.221]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.68}
      />
      <mesh
        // castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials.Material}
        position={[1.029, 0.214, -0.183]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={0.68}
      />
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
      />
    </group>
  );
}
useGLTF.preload("/models/charlotte.glb");
