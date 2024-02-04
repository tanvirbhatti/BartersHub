import styles from "./CustomFormField.module.css";

const CustomFormField = ({
  name,
  value,
  label,
  placeHolder,
  type,
  onChange,
}) => {
  return (
    <div className={styles.Input}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
};

export default CustomFormField;
