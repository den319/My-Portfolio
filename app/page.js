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
  const [isPlayingMusic, setIsPlayingMusic]= useState(false);

  const [islandScale, setIslandScale]= useState([1,1,1]);
  const [islandPosition, setIslandPosition]= useState([0,-6.5,-43.4]);
  const [planeScale, setPlaneScale]= useState([3,3,3]);
  const [planePosition, setPlanePosition]= useState([0,-4,-4]);


  const audioRef= useRef(null);
  

  const adjustIslandForScreenSize= () => {
    let screenScale= null;
    const screenPosition= [0, -6.5, -43.4];

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

   const handlePlay = () => {
    if (audioRef.current) {
      if(!isPlayingMusic) {
        setIsPlayingMusic(true);
        audioRef.current.play()
        .catch(error => {
          // Handle any errors that occur while attempting to play the audio
          console.error('Failed to play audio:', error);
        });
      } else {
        setIsPlayingMusic(false);
        audioRef.current.pause();
      }
    }
  };


  useEffect(() => {
    const [scaleIsland, posIsland]= adjustIslandForScreenSize();
    const [scalePlane, posPlane]= adjustPlaneForScreenSize();

    setIslandScale(scaleIsland);
    setIslandPosition(posIsland);
    setPlaneScale(scalePlane);
    setPlanePosition(posPlane);

  }, []);

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-20 left-0 right-0 z-10 flex items-center justify-center">
        <Popup currentStage={currentStage} />
      </div>    
        

      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}>
        
        <Suspense fallback={<Loader />}> 
          <directionalLight position={[1,1,1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight 
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
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
            rotation={[0,20.1,0]} />
        </Suspense>
      </Canvas>

      <audio 
        ref= {audioRef} 
        src="/3D_assets/sakura.mp3" 
        loop= {true} >
      </audio>
      <div className="absolute bottom-2 left-2 w-10 h-10 cursor-pointer object-contain"
          onClick= {handlePlay} >
        <Image
          src= {isPlayingMusic ? "/3D_assets/icons/soundon.svg" : "/3D_assets/icons/soundoff.svg"}
          alt= "sound"
          width= {50}
          height={50}
        />
      </div>
    </section>
  );
}

