import React, { useState } from "react";
import CustomFormField from "../../UI/CustomFormField/CustomFormField";
import Hero from "./LogIn.png";
import styles from "./Login.module.css";
import GradientButton from "../../UI/GradientButton/GradientButton";
import { z } from "zod";
import axios from 'axios';

const schema = z.object({
  email: z.string({ required_error: "email is required" })
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string({ required_error: "password is required" })
    .min(1, { message: "password is required" }),
})

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const handleSubmit = async (e) => {
    setErrors({
      email: "",
      password: ""
    })
    e.preventDefault();
    const result = schema.safeParse({ email, password });
    if (result.success) {
      const response = await
        axios({
          method: 'post',
          url: "http://localhost:8000/login",
          withCredentials: false,
          data: {
            "email": email,
            "password": password
          }
        })
        if(response.data.message){
          alert(response.data.message)
        }
        else{
          alert(response.data.error)
        }
      
    } else {
      for (const err of result.error.issues) {
        setErrors((prev) => ({
          ...prev,
          [err.path.toString()]: err.message
        }));
      }
    }
  }
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
      <div className={styles.container}>
        <img className={styles.hero} src={Hero} alt="" srcSet="" />
        <div className={styles.Form}>
          <h1>Login</h1>

          <form className={styles.Form} action="" onSubmit={handleSubmit}>

            <CustomFormField
              name="email"
              value={email}
              label="Email"
              error={errors.email}
              onChange={handleInputChange}
              placeHolder="Enter Email Address"
              type="text"
            />
            <CustomFormField
              name="password"
              value={password}
              label="Password"
              error={errors.password}
              onChange={handleInputChange}
              placeHolder="Enter Password"
              type="password"
            />

            <div className={styles.remember}>
              <input type="checkbox" name="remember" id="" />
              Remember me
            </div>
            <GradientButton className={styles.button} text="Login" rounded={true} />
            <div className={styles.register} >Don&apos;t have an account?<span ><a href="/signup">Register Here</a> </span></div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
