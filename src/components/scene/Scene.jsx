import { OrbitControls, PivotControls, TransformControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react'

function Box() {
    return (
        <mesh scale={[4, 3, 0.3]}>
            <boxGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="cyan" />
        </mesh>
    );
}

const scene = () => {
    return (
        <Canvas style={{ height: '100vh' }}>
            <OrbitControls />
            <ambientLight intensity={1} />
            <spotLight position={[10, 1, 15]} />
            <TransformControls mode="translate">
                <Box />
            </TransformControls>
        </Canvas>
    )
}

export default scene