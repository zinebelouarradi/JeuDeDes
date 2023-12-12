import React, { useEffect, useState } from "react";
import Dice from "../Components/Dice/Dice";
import styles from "./DiceGamePage.module.scss";
import Player from "../Components/Player/Player";
import Button from "../Components/Button/Button";

const ANIMATION_DURATION = 2_000;
const ROUND_NUMBER = 6;

const DiceGamePage = () => {
  const [diceValues, setDiceValues] = useState({ first: 1, second: 1 });
  const [currentPlayer, setCurrentPlayer] = useState<string>("player1");
  const [animate, setAnimate] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({
    player1: 0,
    player2: 0,
  });
  const [winner, setWinner] = useState<null | string>();
  const [round, setRound] = useState(1);

  // Effet pour déterminer le gagnant à la fin du jeu
  useEffect(
    function () {
      const { player1, player2 } = scores;
      if (round === ROUND_NUMBER) {
        setWinner(player1 > player2 ? "player1" : "player2");
      }
    },
    [round, scores, scores.player1, scores.player2],
  );

  function resetGame() {
    setDiceValues({ first: 1, second: 1 });
    setCurrentPlayer(Math.random() < 0.5 ? "player1" : "player2");
    setScores({
      player1: 0,
      player2: 0,
    });
    setRound(1);
    setWinner(null);
  }

  function rollDice() {
    setAnimate(true);
    const firstDice = Math.floor(Math.random() * 6) + 1;
    const secondDice = Math.floor(Math.random() * 6) + 1;

    setDiceValues({ first: firstDice, second: secondDice });

    // Désactiver l'animation et mettre à jour les scores
    setTimeout(() => {
      setAnimate(false);
      setScores((prevScores) => ({
        ...prevScores,
        [currentPlayer]: prevScores[currentPlayer] + firstDice + secondDice,
      }));
    }, ANIMATION_DURATION);

    // Attendre avant de passer au joueur suivant et d'incrémenter le numéro du tour
    setTimeout(() => {
      setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");
      setRound(round + 1);
    }, ANIMATION_DURATION + 1_000);
  }

  return (
    <div className={styles.container}>
      <h1>Jeu de dés</h1>
      <h2>
        Tour {round} sur {ROUND_NUMBER}
      </h2>
      <div className={styles.flexed}>
        <Player
          isWinner={winner === "player1"}
          isCurrentlyPlaying={currentPlayer === "player1" && !winner}
          playerName="Joueur 1"
          score={scores.player1}
        />
        <div className={styles.dices_score_container}>
          <div className={styles.dices_container}>
            <Dice value={diceValues.first} animate={animate} />
            <Dice value={diceValues.second} animate={animate} />
          </div>
          <div className={styles.score}>
            {animate ? "..." : diceValues.first + diceValues.second}
          </div>
        </div>
        <Player
          isWinner={winner === "player2"}
          isCurrentlyPlaying={currentPlayer === "player2" && !winner}
          playerName="Joueur 2"
          score={scores.player2}
        />
      </div>
      <div className={styles.buttons}>
        {!winner && (
          <Button
            onClick={rollDice}
            title="Lancer le dés"
            isDisabled={animate}
          />
        )}
        <Button onClick={resetGame} title="Réinitialiser" />
      </div>
    </div>
  );
};

export default DiceGamePage;
