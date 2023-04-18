// Position initial des jetons (ord/id)
export const initialProperty = [
    { ord: 1, pos: [-1.7, 0.5, -1.7], numPos: 1, player: false },
    { ord: 2, pos: [0, 0.5, -1.7], numPos: 2, player: false },
    { ord: 3, pos: [1.7, 0.5, -1.7], numPos: 3, player: false },
    { ord: 4, pos: [-1.7, 0.5, 1.7], numPos: 7, player: true },
    { ord: 5, pos: [0, 0.5, 0], numPos: 5, player: true },
    { ord: 6, pos: [1.7, 0.5, 1.7], numPos: 9, player: true },
];

// Toutes les positions possible
export const allPosition = [
    { ord: 1, pos: [-1.7, 0.5, -1.7] },
    { ord: 2, pos: [0, 0.5, -1.7] },
    { ord: 3, pos: [1.7, 0.5, -1.7] },
    { ord: 4, pos: [-1.7, 0.5, 0] },
    { ord: 5, pos: [0, 0.5, 0] },
    { ord: 6, pos: [1.7, 0.5, 0] },
    { ord: 7, pos: [-1.7, 0.5, 1.7] },
    { ord: 8, pos: [0, 0.5, 1.7] },
    { ord: 9, pos: [1.7, 0.5, 1.7] },
];

// Position des deplacements qui sont autorisés
export const allowPlacement = [
    { pos: 1, allow: [2, 4, 5] },
    { pos: 2, allow: [1, 3, 5] },
    { pos: 3, allow: [2, 5, 6] },
    { pos: 4, allow: [1, 5, 7] },
    { pos: 5, allow: [1, 2, 3, 4, 6, 7, 8, 9] },
    { pos: 6, allow: [3, 5, 9] },
    { pos: 7, allow: [4, 5, 8] },
    { pos: 8, allow: [5, 7, 9] },
    { pos: 9, allow: [5, 6, 8] },
];

// Position pour gagner
const winnerPosition = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

// function pour trouver le position de depart(jeton selectionner)
export const findPos0 = (property, jetonSelected) => {
    let posStart;
    property.forEach((item) => {
        if (item.ord === jetonSelected) {
            posStart = item.numPos;
        }
    });
    return posStart;
}

// test si le deplacement est autorisé
export const isPosAllowed = (allPlacement, pos0, ord) => {
    let isAllowed = false;
    allPlacement.forEach((item) => {
        if (pos0 === item.pos) {
            if (item.allow.includes(ord))
                isAllowed = true;
            else
                isAllowed = false;
        }
    });
    return isAllowed;
}

// Permet de recuperer la Position d'arriver(vector3)
export const getNewPosition = (allowPosition, ord) => {
    const newPosition = allowPosition.filter((item) => {
        if (item.ord == ord) return item;
    });
    return newPosition;
}

// Test si le match est fini
export const isWinner = (player, allJeton, moves) => {
    let jetonPos = [];  //position des jetons
    let jetonOrd = [];  //identification des jetons
    let isWin = false;

    allJeton.forEach((jeton) => {
        if (jeton.player === player) {
            jetonPos.push(jeton.numPos);
            jetonOrd.push(jeton.ord);
        }
    });

    let testWinnerMoves = true;
    jetonOrd.forEach((element) => {
        if (!moves.includes(element)) {
            testWinnerMoves = false;
        }
    });

    if (testWinnerMoves) {
        winnerPosition.forEach((winnerPos) => {
            if (JSON.stringify(winnerPos.sort()) === JSON.stringify(jetonPos.sort())) {
                isWin = true;
            }
        });
    }

    return isWin;
}

// permet de recuperer les jetons ayant ete deplacer
export const movesArray = (moves, ord) => {
    moves.push(ord);
    const newMoves = [...new Set(moves)]; //supprimer les valeurs repetitive
    return newMoves;
}