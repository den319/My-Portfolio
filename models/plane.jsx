"use client"

import {useRef, useEffect} from "react";
import {useGLTF, useAnimations} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
 
export default function Plane({isRotatingForDrag, ...props}) {
	const planeRef= useRef();
	const {scene, animations}= useGLTF("/3D_assets/3d/plane.glb");
	const {gl}= useThree();
	const {actions}= useAnimations(animations, planeRef);

	const lastX= useRef(0);


	function handleArrowMove(e) {
		if(e.key === "ArrowLeft") {
			planeRef.current.rotation.y= -1.5;
		} else if(e.key === "ArrowRight") {
			planeRef.current.rotation.y= 1.3;
		} 
	}

	const handlePointerMove= (e) => {
		e.stopPropagation();
        e.preventDefault();
		
		if(isRotatingForDrag) {
			const clientX= e.touches
			? e.touches[0].clientX
			: e.clientX;
			
			if(lastX.current > clientX) {
				planeRef.current.rotation.y= 1.3;
			} else {
				planeRef.current.rotation.y= -1.5;
			}
			lastX.current= clientX;
		}
    }

	const handleMouseWheel= (e) => {
			if(e.deltaY > 0) {
				planeRef.current.rotation.y= 1.3;
			} else {
				planeRef.current.rotation.y= -1.5;
			}
    }

	useEffect(() => {
		actions["Take 001"]?.play();
	}, [])

	useEffect(() => {
		const canvas= gl.domElement;
		if(typeof document !== "undefined") {
			document.addEventListener("keydown", handleArrowMove);
			document.addEventListener("wheel", handleMouseWheel);
			canvas.addEventListener("pointermove", handlePointerMove);
		}

		return () => {
			document.removeEventListener("keydown", handleArrowMove);
			document.removeEventListener("wheel", handleMouseWheel);
			canvas.removeEventListener("pointermove", handlePointerMove);
		}
	}, [handleArrowMove])

	return (
		<mesh {...props} ref={planeRef}>
			<primitive object={scene} />
		</mesh>
	)
}