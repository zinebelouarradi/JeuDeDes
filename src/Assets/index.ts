import dice1 from "./dice1.svg";
import dice2 from "./dice2.svg";
import dice3 from "./dice3.svg";
import dice4 from "./dice4.svg";
import dice5 from "./dice5.svg";
import dice6 from "./dice6.svg";
interface Image {
  path: string;
  alt: string;
}

const Images: Record<string, Image> = {
  Dice1: {
    path: dice1,
    alt: "dice1",
  },
  Dice2: {
    path: dice2,
    alt: "dice2",
  },
  Dice3: {
    path: dice3,
    alt: "dice3",
  },
  Dice4: {
    path: dice4,
    alt: "dice4",
  },
  Dice5: {
    path: dice5,
    alt: "dice5",
  },
  Dice6: {
    path: dice6,
    alt: "dice6",
  },
};

export default Images;
