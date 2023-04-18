import React from 'react'

const WinnerModal = ({ winnerOrd }) => {

    const getColor = (winnerOrd) => {
        if (winnerOrd > 3)
            return "blue"
        return "red"
    }

    return (
        <div className='box' style={{ borderColor: getColor(winnerOrd), }}>
            <h1>Felicitation!!</h1>
            <h1>
                Gagnant : Joueur {(winnerOrd > 3) ? "bleu" : "rouge"}
            </h1>
            <div className='btn-action'>
                <button style={{ backgroundColor: getColor(winnerOrd) }}>
                    Rejouer
                </button>
            </div>
        </div>
    )
}

export default WinnerModal