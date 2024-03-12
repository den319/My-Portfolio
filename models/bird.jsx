"use client"

import {useGLTF} from "@react-three/drei";
 
export default function Bird() {

	const {scene, animations}= useGLTF("/3D_assets/3d/bird.glb")
	return (
		<mesh position={[-5,2,1]} scale={[0.003,0.003,0.003]}> 
			<primitive object={scene} />
		</mesh>
	)
}