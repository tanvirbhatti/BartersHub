import React, { useState } from "react";
import CustomFormField from "../../UI/CustomFormField/CustomFormField";
import GradientButton from "../../UI/GradientButton/GradientButton";
import Logo from "../../UI/Nav/BarterHub.png";
import Nav from "../../UI/Nav/Nav";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "email":
        setEmail(fieldValue);
        break;

      case "password":
        setPassword(fieldValue);
        break;

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Nav />
      <div className={styles.container}>
        <img className={styles.hero} src={Logo} alt="" srcSet="" />
        <div className={styles.Form}>
          <h1>Login</h1>
          {/* <input type="text" /> */}
          <form className={styles.Form} action="">
            <CustomFormField
              name="email"
              value={email}
              label="Email"
              onChange={handleInputChange}
              placeHolder="enter email address"
              type="text"
            />
            <CustomFormField
              name="password"
              value={password}
              label="Password"
              onChange={handleInputChange}
              placeHolder="enter password"
              type="password"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
