"use client"

import Loader from "@/components/loaders/loader";
import { Canvas } from "@react-three/fiber";
import { useState, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";

import Sky from "@/models/sky";
import Bird from "@/models/bird";
import Plane from "@/models/plane";

// lazy loading
const Island= dynamic(() => import("@/models/island"), {
  ssr:false,
})

export default function Home() {

  const [isRotating, setIsRotating]= useState(false);
  const [currentStage, setCurrentStage]= useState(1);

  const adjustIslandForScreenSize= () => {
    let screenScale= null;
    const screenPosition= [0, -6.5, -43.4];
    // const rotation= [0.1, 4.7, 0];

    if(window.innerWidth < 768) {
      screenScale= [0.9, 0.9, 0.9];
    } else {
      screenScale= [1, 1, 1];
    }

    return [screenScale, screenPosition];
  }

  const adjustPlaneForScreenSize= () => {
    let screenScale, screenPosition;
    if(window.innerWidth < 768) {
      screenScale= [1.5, 1.5, 1.5];
      screenPosition= [0, -1.5, 0];
    } else {
      screenScale= [3, 3, 3];
      screenPosition= [0, -4, -4];
    }

    return [screenScale, screenPosition];
  }

  let [islandScale, islandPosition]= [[1,1,1], [0,-6.5,-43.4]];
  let [planeScale, planePosition]= [[3,3,3],[0,-4,-4]];

  useEffect(() => {
    [islandScale, islandPosition]= adjustIslandForScreenSize();
    [planeScale, planePosition]= adjustPlaneForScreenSize();
  }, [])


  return (
    <section className="w-full h-screen relative">
      {/* <Header /> */}

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor= {"#b1e1ff"} groundColor= {"#000000"} intensity={1} />

          <Bird />
          <Sky />
          <Island 
            position= {islandPosition} 
            scale= {islandScale} 
            rotation={[0.1, 4.7077, 0]}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage= {setCurrentStage}
          />
          <Plane 
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0,20,0]} />
        </Suspense>
      </Canvas>
    </section>
  );
}

