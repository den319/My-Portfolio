"use client"

import {useRef, useEffect} from "react";
import {useGLTF, useAnimations} from "@react-three/drei";
 
export default function Plane({isRotating, setIsRotating, setCurrentStage, ...props}) {
	const ref= useRef();
	const {scene, animations}= useGLTF("/3D_assets/3d/plane.glb");
	const {actions}= useAnimations(animations, ref);


	useEffect(() => {
		console.log(actions)
		if(isRotating) {
			actions["Take 001"]?.play();
		} else {
			actions["Take 001"]?.stop();
		}
	}, [actions, isRotating])

	return (
		<mesh {...props} ref={ref}>
			<primitive object={scene} />
		</mesh>
	)
}