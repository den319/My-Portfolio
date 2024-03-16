"use client"

import Loader from "@/components/loaders/loader";
import { Canvas } from "@react-three/fiber";
import { useState, Suspense, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Popup from "@/components/homePage/popup";
import Image from "next/image";

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
  const [isPlayingMusic, setIsPlayingMusic]= useState(true);

  const [islandScale, setIslandScale]= useState([1,1,1]);
  const [islandPosition, setIslandPosition]= useState([0,-6.5,-43.4]);
  const [planeScale, setPlaneScale]= useState([3,3,3]);
  const [planePosition, setPlanePosition]= useState([0,-4,-4]);


  const audioRef= useRef(new Audio("/3D_assets/sakura.mp3"));
  audioRef.current.volume= 0.4;
  audioRef.current.loop= true; 

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

  useEffect(() => {
    const [scaleIsland, posIsland]= adjustIslandForScreenSize();
    const [scalePlane, posPlane]= adjustPlaneForScreenSize();

    setIslandScale(scaleIsland);
    setIslandPosition(posIsland);
    setPlaneScale(scalePlane);
    setPlanePosition(posPlane);

  }, [])

  useEffect(() => {
    if(isPlayingMusic) audioRef.current.play();

    return () => audioRef.current.pause();

  }, [isPlayingMusic]);

    // console.log(planeScale);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        <Popup currentStage={currentStage} />
      </div>    

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor= {"#b1e1ff"} groundColor= {"#000000"} intensity={1} />

          <Bird />
          <Sky isRotating= {isRotating} />
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
            scale={planeScale}
            position={planePosition}
            rotation={[0,20,0]} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2 w-10 h-10 cursor-pointerobject-contain"
          onClick= {() => setIsPlayingMusic(!isPlayingMusic)} >
        <Image
          src= {isPlayingMusic ? "/3D_assets/icons/soundon.png" : "/3D_assets/icons/soundoff.png"}
          alt= "sound"
          width= {50}
          height={50}
        />
      </div>
    </section>
  );
}

