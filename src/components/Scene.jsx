import { PresentationControls, Select } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useState } from 'react'
import { initialProperty, allPosition, allowPlacement, findPos0, isPosAllowed, getNewPosition, isWinner, movesArray } from '../utils/Data';
import BoxFanorona from './BoxFanorona';
import Jeton from './Jeton';
import WinnerModal from './WinnerModal';

const scene = () => {

    const [jetonSelected, setSelected] = useState();
    const [property, setProp] = useState(initialProperty);
    const [player, setPlayer] = useState(true);
    const [moves, setMoves] = useState([]);
    const [winner, setWinner] = useState();

    const selectJeton = (item) => {
        if (!winner) {
            property.forEach((element) => {
                if (element.player === player)
                    if (element.ord == item)
                        if (item > 0)
                            setSelected(item);
            });
        }
    };

    const handleClick = (ord) => {
        // position de depart
        const pos0 = findPos0(property, jetonSelected);
        // Test si le deplacement est autoriser
        const isAllowed = isPosAllowed(allowPlacement, pos0, ord);
        // Recuperer la Position d'arriver(vector3)
        const newPosition = getNewPosition(allPosition, ord);

        // confirmer le deplacement
        if (isAllowed) {
            const newProperty = property.map((item) => {
                if (item.ord === jetonSelected) {
                    item.numPos = newPosition[0].ord;
                    item.pos = newPosition[0].pos;

                    // recupere les jetons ayant ete deplacer
                    setMoves(movesArray(moves, item.ord));
                }
                return item;
            });
            setProp(newProperty);
            // test si le match est fini
            if (isWinner(player, property, moves)) {
                setWinner(jetonSelected);
                console.log("PLAYER WINNER");
            }

            setSelected();
            setPlayer(!player);
        } else {
            console.log("DEPLACEMENT NON AUTORISER");
        }
    }

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
            {(winner) ? <WinnerModal winnerOrd={winner} /> : ''}
            <Canvas>

                <PresentationControls
                    rotation={[0.5, (player) ? 0 : 3.2, 0]}
                    polar={[0, 1.1]} // Vertical limits
                    config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
                    global={true}
                    cursor={false}
                >
                    <BoxFanorona />
                    {/* Visible Jeton */}
                    <Select multiple={false} filter={(items) => items.map((item) => selectJeton(item))}>
                        {property.map((prop) => {
                            return <Jeton
                                key={(prop.ord)}
                                handleClick={() => selectJeton(prop.ord)}
                                meshSelected={(jetonSelected == prop.ord) ? true : false}
                                {...prop}
                            />
                        })}
                    </Select>

                    {/* Hidden jeton */}
                    {allPosition.map((prop) => {
                        return <Jeton
                            key={(prop.ord)}
                            color="brown"
                            {...prop}
                            handleClick={() => handleClick(prop.ord)} />
                    })}

                </PresentationControls>

                <ambientLight
                    intensity={1} />
                <spotLight
                    position={[25, 10, 15]} />

            </Canvas>
        </div>
    )
}

export default scene