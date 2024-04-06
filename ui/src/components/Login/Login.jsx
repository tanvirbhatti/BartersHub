import React, { useState, useEffect } from "react";
import CustomFormField from "../../UI/CustomFormField/CustomFormField";
import Hero from "./LogIn.png";
import styles from "../../Assets/Stylesheets/Components/Login.module.css";
import GradientButton from "../../UI/GradientButton/GradientButton";
import { z } from "zod";
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const schema = z.object({
  email: z.string({ required_error: "email is required" })
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string({ required_error: "password is required" })
    .min(1, { message: "password is required" }),
})

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe');
    if (rememberMeValue === 'true') {
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    }
  }, []);
  
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
          toast.success(response.data.message);
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
          } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }
          localStorage.setItem('token', response.data.token);
          if (response.data.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          toast.error(response.data.error);
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

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
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
              <input type="checkbox" name="remember" id="remeber" checked={rememberMe} onChange={handleRememberMeChange} />
              <label> &nbsp; Remember Me</label>
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
