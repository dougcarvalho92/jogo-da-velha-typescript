import {Circle, X} from "@phosphor-icons/react";

import { useEffect, useState } from "react";
import "./App.css";

type CombinationProps = {
  combination: number[];
  orientation: string;
};
type WinnerProps = CombinationProps & {
  player: string;
};
function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [winner, setWinner] = useState<WinnerProps>();
  const winningCombinations = [
    //HORIZ
    { combination: [0, 1, 2], orientation: "H" },
    { combination: [3, 4, 5], orientation: "H" },
    { combination: [6, 7, 8], orientation: "H" },
    //VERT
    { combination: [0, 3, 6], orientation: "V" },
    { combination: [1, 4, 7], orientation: "V" },
    //DIAG
    { combination: [0, 4, 8], orientation: "D" },
    { combination: [2, 4, 6], orientation: "DR" },
  ];



  const checkWinner = () => {
    for (let values of winningCombinations) {
      if (values.combination) {
        if (
          gameData[values.combination[0]] === 1 &&
          gameData[values.combination[1]] === 1 &&
          gameData[values.combination[2]] === 1
        ) {
          const newWinner = {
            ...values,
            player: "player1",
          } as WinnerProps;

          setWinner(newWinner);

        }
        if (
          gameData[values.combination[0]] === 2 &&
          gameData[values.combination[1]] === 2 &&
          gameData[values.combination[2]] === 2
        ) {
          const newWinner = {
            ...values,
            player: "player2",
          } as WinnerProps;
          setWinner(newWinner);
        
        }
      }
    }
  };

  const handleClick = (index: number) => {
    if (winner?.player) return;

    if (gameData[index] === 0) {
      setGameData((prev) => {
        const newData = [...prev];
        if (isPlayerOne) {
          newData[index] = 1;
        } else {
          newData[index] = 2;
        }

        return newData;
      });

      setIsPlayerOne(!isPlayerOne);
    }
  };

  const checkLineOrientation = (index: number) => {

      console.log("WINNER",winner);
    
    switch (winner?.orientation) {
      case "V":
        return winner.combination.includes(index)
          ? "board__line board__line--vertical"
          : "";
      case "H":
        return winner.combination.includes(index)
          ? "board__line board__line--horizontal"
          : "";
      case "D":
        return winner.combination.includes(index)
          ? "board__line board__line--diagonal"
          : "";
      case "DR":
        return winner.combination.includes(index)
          ? "board__line board__line--diagonal reverse"
          : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    checkWinner();
    if (
      gameData.every((item) => item !== 0) &&
      winner?.player
    ) {
      alert("ACABOU");
    }
  }, [gameData]);

  useEffect(() => {
    if (winner) {
      console.log(winner);
    }
  }, [winner]);

  return (
    <div className="board">
      {gameData.map((el, index) => (
        <span
          className="board__item"
          key={index}
          onClick={() => {
            handleClick(index);
          }}
        >
          {el !== 0 ? (el === 1 ? <X size={32} />: <Circle size={32} />) : " "}

          {winner && <div className={`${checkLineOrientation(index)}`} />}
        </span>
      ))}
    </div>
  );
}

export default App;
