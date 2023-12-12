import React, { useEffect, useState } from "react";
import Dice from "../Components/Dice/Dice";
import styles from "./DiceGamePage.module.scss";
import Player from "../Components/Player/Player";
import Button from "../Components/Button/Button";

const ANIMATION_DURATION = 2_000;
const ROUND_NUMBER = 6;

enum Players {
  PLAYER_1 = "player1",
  PLAYER_2 = "player2",
}

const DiceGamePage = () => {
  const [diceValues, setDiceValues] = useState<Record<string, number>>({
    first: generateRandomDiceValue(),
    second: generateRandomDiceValue(),
  });
  const [currentPlayer, setCurrentPlayer] = useState<Players>(Players.PLAYER_1);
  const [animate, setAnimate] = useState(false);
  const [scores, setScores] = useState<Record<Players, number>>({
    [Players.PLAYER_1]: 0,
    [Players.PLAYER_2]: 0,
  });
  const [winner, setWinner] = useState<null | Players>();
  const [round, setRound] = useState(1);
  const [isTie, setIsTie] = useState(false);

  // Effet pour déterminer le gagnant à la fin du jeu
  useEffect(
    function () {
      const { player1, player2 } = scores;
      if (round === ROUND_NUMBER) {
        if (player1 === player2) {
          setIsTie(true);
        } else {
          setWinner(player1 > player2 ? Players.PLAYER_1 : Players.PLAYER_2);
        }
      }
    },
    [round, scores, scores.player1, scores.player2],
  );

  function resetGame() {
    setDiceValues({
      first: generateRandomDiceValue(),
      second: generateRandomDiceValue(),
    });
    setCurrentPlayer(Math.random() < 0.5 ? Players.PLAYER_1 : Players.PLAYER_2);
    setScores({
      player1: 0,
      player2: 0,
    });
    setRound(1);
    setWinner(null);
  }
  function generateRandomDiceValue() {
    return Math.floor(Math.random() * 6) + 1;
  }
  function handleDiceRoll() {
    setAnimate(true);
    const firstDice = generateRandomDiceValue();
    const secondDice = generateRandomDiceValue();

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
      setCurrentPlayer(
        currentPlayer === Players.PLAYER_1
          ? Players.PLAYER_2
          : Players.PLAYER_1,
      );
      setRound(round + 1);
    }, ANIMATION_DURATION + 1_000);
  }

  return (
    <div className={styles.container}>
      <h1>Jeu de dés</h1>
      <h2>
        Tour {round} sur {ROUND_NUMBER}
      </h2>
      {isTie && <div className={styles.tie}>It's a tie!</div>}
      <div className={styles.flexed}>
        <Player
          isWinner={winner === Players.PLAYER_1}
          isCurrentlyPlaying={currentPlayer === Players.PLAYER_1 && !winner}
          playerName="Joueur 1"
          score={scores.player1}
        />
        <div className={styles.dices_score_container}>
          <div className={styles.dices_container}>
            <Dice value={diceValues.first} animate={animate} />
            <Dice value={diceValues.second} animate={animate} />
          </div>

          <div className={styles.score}>
            total
            <p> {animate ? "..." : diceValues.first + diceValues.second}</p>
          </div>
        </div>
        <Player
          isWinner={winner === Players.PLAYER_2}
          isCurrentlyPlaying={currentPlayer === Players.PLAYER_2 && !winner}
          playerName="Joueur 2"
          score={scores.player2}
        />
      </div>
      <div className={styles.buttons_container}>
        {round < ROUND_NUMBER && (
          <Button
            onClick={handleDiceRoll}
            title="Lancer les dés"
            isDisabled={animate}
          />
        )}
        <Button onClick={resetGame} title="Réinitialiser" />
      </div>
    </div>
  );
};

export default DiceGamePage;
