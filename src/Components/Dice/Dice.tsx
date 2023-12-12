import React, { useEffect, useState } from "react";
import Icons from "../../Assets";
import styles from "./Dice.module.scss";

interface DiceProps {
  value: number;
  animate: boolean;
}

const ANIMATION_INTERVAL = 200;

const Dice = ({ value, animate }: DiceProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(
    function () {
      if (!animate) {
        setCurrentValue(value);
        return;
      }
      const updateValue = () => {
        setCurrentValue(Math.floor(Math.random() * 6) + 1);
      };
      const interval = setInterval(updateValue, ANIMATION_INTERVAL);
      return () => clearInterval(interval);
    },
    [animate, value],
  );

  return (
    <div className={styles.dice}>
      <img
        className={styles.diceImage}
        src={Icons[`Dice${currentValue}`].path}
        alt={Icons[`Dice${currentValue}`].alt}
      />
    </div>
  );
};

export default Dice;
