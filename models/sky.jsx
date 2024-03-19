"use client"

import {useGLTF} from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";
 
export default function Sky({isRotatingForDrag}) {
	const sky= useGLTF("/3D_assets/3d/sky.glb");
	const skyRef= useRef();

	useFrame((_, delta) => {
		if(isRotatingForDrag) {
			skyRef.current.rotation.y += 0.09*delta;
		}

		skyRef.current.rotation.y += 0.005*delta;
	});
	
	return (
		<mesh ref={skyRef}>
			<primitive object= {sky.scene} />
		</mesh>
	)
}