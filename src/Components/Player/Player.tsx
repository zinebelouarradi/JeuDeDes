import styles from "./Player.module.scss";
interface PlayerInterface {
  isCurrentlyPlaying: boolean;
  playerName: string;
  score: number;
  isWinner: boolean;
}

const Player = (props: PlayerInterface) => {
  return (
    <div className={styles.player_container}>
      <div
        className={`${styles.player_name} ${
          props.isCurrentlyPlaying ? styles.playing : ""
        }`}
      >
        {props.playerName}
      </div>
      {props.isWinner && <div className={styles.winner}> a gagné! 🎉</div>}

      <p>{props.score}</p>
    </div>
  );
};

export default Player;
