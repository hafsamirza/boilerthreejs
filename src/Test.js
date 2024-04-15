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
import { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { LinearEncoding } from "@react-three/drei/helpers/deprecated";

export default function Experience() {
  var modelOne = "/models/02/charlotte_wall.glb";
  var modelTwo =
    "https://boytchev.github.io/suica/assets/models/cars/tractor.glb";
  const gltf = useGLTF(modelOne);
  const groundRef = useRef();
  useEffect(() => {
    let ground = groundRef.current;
    ground.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(ground.geometry),
        new THREE.LineBasicMaterial({ color: "red" })
      )
    );

    const gltf = useGLTF(modelOne);
    gltf.scene.traverse((c) => {
      if (c.isMesh) c.material.metalness = 0;
    });
    var model = new THREE.Group();
    gltf.scene.rotation.x = Math.PI * 2;
    // gltf.scene.rotation.z = Math.PI * 2;
    model.add(gltf.scene);
    console.log(model);

    const pos = ground.geometry.attributes.position;
    // ground.add(pos);
    for (var i = 0; i < pos.count; i += 3) {
      var x = (pos.getX(i) + pos.getX(i + 1) + pos.getX(i + 2)) / 3,
        y = (pos.getY(i) + pos.getY(i + 1) + pos.getY(i + 2)) / 3,
        z = (pos.getZ(i) + pos.getZ(i + 1) + pos.getZ(i + 2)) / 3;

      var clone = model.clone();
      clone.name = "racer";
      clone.lookAt(x, y, z);
      clone.position.set(x, y, z);
      clone.rotation.z = THREE.MathUtils.randFloat(0, 2 * Math.PI);
      clone.position.setX = 20;
      clone.scale.setScalar(THREE.MathUtils.randFloat(0.5, 0.5));

      ground.add(clone);
    }

    console.log(pos);
  }, []);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <color args={["gray"]} attach="background" />
      <ambientLight intensity={2.1} />

      {/* <Model url={modelOne} /> */}
      <group name="my_group">
        <mesh position={[2, 0, 0]} ref={groundRef}>
          <planeGeometry />
          <meshPhongMaterial
            color="navy"
            shininess={10}
            flatShading={true}
            // wireframe
          />
        </mesh>
      </group>
    </>
  );
}
function Model({ url, ground }) {
  const groupRef = useRef();
  const gltf = useGLTF(url);

  // Callback function to handle loaded model
  const loaded = (gltfScene) => {
    // Fix material (metalness must be 0)
    gltfScene.traverse((child) => {
      if (child.isMesh) child.material.metalness = 0;
    });

    // Fix orientation of the model
    // gltfScene.rotation.x = Math.PI / 2;

    // Add loaded model to the group
    groupRef.current.add(gltfScene);

    // Add clones to each side of the ground
    const pos = ground.geometry.attributes.position;
    const count = pos.count;
    const positions = pos.array;
    for (let i = 0; i < count; i += 3) {
      const x = (positions[i] + positions[i + 1] + positions[i + 2]) / 3;
      const y = (positions[i + 1] + positions[i + 2] + positions[i + 3]) / 3;
      const z = (positions[i + 2] + positions[i + 3] + positions[i + 4]) / 3;

      const clone = gltfScene.clone();
      clone.name = "racer";
      clone.lookAt(x, y, z);
      clone.position.set(x, y, z);
      clone.rotation.z = THREE.MathUtils.randFloat(0, -20 * Math.PI);
      clone.scale.setScalar(THREE.MathUtils.randFloat(0.05, 0.6));
      ground.add(clone);
    }
  };

  return <group ref={groupRef} />;
}
