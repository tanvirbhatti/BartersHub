import styles from "./GradientButton.module.css";

const GradientButton = ({ className, rounded, text, ...props }) => {
  const buttonClass = rounded ? styles.roundedButton : styles.Button;

  return (
    <button className={`${buttonClass} ${className} `} {...props}>
      {text}
    </button>
  );
};
export default GradientButton;
