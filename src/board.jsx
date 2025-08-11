import {useState} from 'react';

function Square({value, func}) {
  
  return(
        <button 
          onClick={func}
          className="square">
            {value}
        </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "O" : "X");
  }
  function handleClick(index) {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "O";
    }

    onPlay(newSquares);
  }
  return( 
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} func={() => handleClick(0)} />
        <Square value={squares[1]} func={() => handleClick(1)}/>
        <Square value={squares[2]} func={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} func={() => handleClick(3)}/>
        <Square value={squares[4]} func={() => handleClick(4)}/>
        <Square value={squares[5]} func={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} func={() => handleClick(6)}/>
        <Square value={squares[7]} func={() => handleClick(7)}/>
        <Square value={squares[8]} func={() => handleClick(8)}/>
      </div>
    </>
  );
}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  function backPlay(i){
    if (i === 0){
     setHistory([Array(9).fill(null)]); 
     return;
    }
    let historyTemp = history.slice(0, i);
    console.log('estou aqui');
    setHistory(historyTemp);
  }
  let moves = history.map(function mv(e, i){
    if (i === 0){
      return <li><button onClick={()=>backPlay(i)}>{"Recomeçar"}</button></li>
    }
    else{
      return(
        <li><button onClick={()=>backPlay(i)}>{"movimento: " + i}</button></li>
      )
    }
  });
  return (
    <div className="game">
      <div className="game-board">
         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {moves}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
