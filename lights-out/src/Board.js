import { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let y = 0; y<nrows; y++){
      // create rows
      const row = []
      for(let cell = 0; cell<ncols; cell++){
        // add cells to the row
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row=>row.every(cell=>!cell))
  }

  function flipCellsAroundMe(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        return boardCopy;
      };
      // TODO: Make a (deep) copy of the oldBoard
      let copy = oldBoard.map(row=>[...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,copy)
      flipCell(y-1, x, copy)
      flipCell(y+1, x, copy)
      flipCell(y, x-1, copy)
      flipCell(y, x+1, copy)

      // TODO: return the copy
      return copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return <div>You Won!</div>
  }

  // TODO

  // make table board
  let finalBoard = []
  for(let y = 0; y<nrows; y++){
    // create rows
    const row = []
    for(let x = 0; x<ncols; x++){
      let coord = `${y}-${x}`
      // add cells to the row
      row.push(<Cell isLit={board[y][x]} flipCellsAroundMe={()=>flipCellsAroundMe(coord)} key={`${y}${x}`}/>)
    }
    // push the cells nested in a tr
    finalBoard.push(<tr>{row}</tr>);
  }
  return(
    <table className="Board">
      <tbody>
        {finalBoard}
      </tbody>
    </table>
  )
}

export default Board;


 // function createBoard() {
  //   let initialBoard = [];
  //   // TODO: create array-of-arrays of true/false values
  //   for(let y = 0; y<nrows; y++){
  //     // create rows
  //     const row = []
  //     for(let cell = 0; cell<ncols; cell++){
  //       let coord = `${y}-${cell}`
  //       let maybeLit = Math.random() < chanceLightStartsOn;
  //       // add cells to the row
  //       row.push(<Cell isLit={maybeLit} flipCellsAroundMe={()=>flipCellsAroundMe(coord)} key={`${y}${cell}`}/>)
  //     }
  //     // push the cells nested in a tr
  //     initialBoard.push(<tr>{row}</tr>);
  //   }
  //   return initialBoard;
  // }