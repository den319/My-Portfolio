"use client"

import {useGLTF, useAnimations} from "@react-three/drei";
import {useRef, useEffect} from "react";
import {useFrame} from "@react-three/fiber";

 
export default function Bird() {

	const {scene, animations}= useGLTF("/3D_assets/3d/bird.glb")
	const birdRef= useRef();
	const {actions}= useAnimations(animations, birdRef);

	useFrame(({clock, camera}) => {
		// update the y-position to simulate bird-like motion using sin-wave
		birdRef.current.position.y= Math.sin(clock.elapsedTime) * 0.2 + 2;

		// check if the bird reached a certain end-point relative to the camera
		if(birdRef.current.position.x > camera.position.x + 10) {
			// change the direction to backward and rotate the bird 180 degrees on y-axis
			birdRef.current.rotation.y= Math.PI;
		} else if(birdRef.current.position.x < camera.position.x - 10) {
			// change the direction to forward and reset the bird's rotation
			birdRef.current.rotation.y= 0;
		}

		if(birdRef.current.rotation.y == 0) {
			// moving forward
			birdRef.current.position.x += 0.01;
			birdRef.current.position.z -= 0.01;
		} else {
			// moving backward
			birdRef.current.position.x -= 0.01;
			birdRef.current.position.z += 0.01;
		}
	})

	useEffect(() => {
		actions["Take 001"]?.play();
	}, []);

	return (
		<mesh ref= {birdRef} position={[-5,2,1]} scale={[0.003,0.003,0.003]}> 
			<primitive object={scene} />
		</mesh>
	)
}