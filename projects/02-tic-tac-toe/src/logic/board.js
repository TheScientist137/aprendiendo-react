import { WINNER_COMBOS } from "../components/constants"

export function checkWinnerFrom(boardToCheck) {
 for (const combo of WINNER_COMBOS) {
  // array destructuring para cada combo
  const [a, b, c] = combo
  // comprobamos si hay un combo ganador
  if (boardToCheck[a] &&
   boardToCheck[a] === boardToCheck[b] &&
   boardToCheck[a] === boardToCheck[c]) { return boardToCheck[a]}  // booleano true
 }
 // Si no hay ganador
 return null
}
