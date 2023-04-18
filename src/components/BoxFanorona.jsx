import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";


const BoxFanorona = () => {
    const texture = useLoader(TextureLoader, './fanorona.PNG');
    return (
        <mesh>
            <boxGeometry
                args={[5, 1, 5]}
            />
            <meshStandardMaterial map={texture} normalScale={[1, 2]} displacementScale={[1, 2, 3]} />
        </mesh >
    );
}

export default BoxFanorona;