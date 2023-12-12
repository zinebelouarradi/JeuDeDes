import styles from "./Button.module.scss";

interface ButtonInterface {
  onClick: VoidFunction;
  title: string;
  isDisabled?: boolean;
}

const Button = (props: ButtonInterface) => {
  return (
    <button
      className={styles.button}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.title}
    </button>
  );
};

export default Button;
