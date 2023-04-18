import { useCursor } from '@react-three/drei'
import React, { useState } from 'react'

const Jeton = ({ pos, ord, meshSelected, color, handleClick }) => {

    const [hovered, set] = useState()
    useCursor(hovered, /*'pointer', 'auto'*/);
    const myMesh = React.useRef();
    const fun = (() => {
        myMesh.current.position.x = myMesh.current.position.x - 0.5
    })

    const setColor = (ord) => {
        if (ord > 3)
            return "blue";
        else
            return "red";
    }

    return (
        <mesh
            visible={(color) ? false : true}
            name={(color == "brown") ? -ord : ord}
            position={pos}
            onPointerOver={() => set(true)} onPointerOut={() => set(false)}
            ref={myMesh}
            onClick={handleClick}
        >
            <cylinderGeometry
                args={[0.2, 0.2, 0.1]} />
            <meshStandardMaterial
                emissive="red"
                emissiveIntensity={(meshSelected) ? 2 : 0}
                color={(color) ? "" : setColor(ord)}
                wireframe />
        </mesh >
    )
}

export default Jeton