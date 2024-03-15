"use client"

import {useRef, useEffect} from "react";
import {useGLTF, useAnimations} from "@react-three/drei";
 
export default function Plane({isRotating, ...props}) {
	const planeRef= useRef();
	const {scene, animations}= useGLTF("/3D_assets/3d/plane.glb");
	const {actions}= useAnimations(animations, planeRef);

	function handleArrowMove(e) {
		if(e.key === "ArrowLeft") {
			planeRef.current.rotation.y= -1.5;
		} else if(e.key === "ArrowRight") {
			planeRef.current.rotation.y= 1.3;
		} 
	}

	// console.log(animations);

	useEffect(() => {
		if(isRotating) {
			actions["Take 001"]?.play();
		} else {
			actions["Take 001"]?.stop();
		}
	}, [actions, isRotating])

	useEffect(() => {
		if(typeof document !== "undefined") {
			document.addEventListener("keydown", handleArrowMove);
		}

		return () => {
			document.removeEventListener("keydown", handleArrowMove);
		}
	}, [handleArrowMove])

	return (
		<mesh {...props} ref={planeRef}>
			<primitive object={scene} />
		</mesh>
	)
}