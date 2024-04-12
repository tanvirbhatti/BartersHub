import React, { useState} from "react";
import CustomFormField from "../../UI/CustomFormField/CustomFormField";
import styles from "../../Assets/Stylesheets/Components/Login.module.css";
import GradientButton from "../../UI/GradientButton/GradientButton";
import { z } from "zod";
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

const schema = z.object({
  email: z.string({ required_error: "email is required" })
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string({ required_error: "password is required" })
    .min(1, { message: "password is required" }),
})
console.log();

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setIsLoggedIn} = useAuth();
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
          url: `${process.env.REACT_APP_API_SERVER}/login`,
          withCredentials: false,
          data: {
            "email": email,
            "password": password
          }
        })
        if(response.data.message){
          toast.success(response.data.message);
          localStorage.setItem('token', response.data.token);
          setIsLoggedIn(true)
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


  return (
    <React.Fragment>
      <div className={`${styles.container} p-4 gap-4 rounded`}>
        <div className={`${styles.loginHero} col-md-3`}></div>
        <div className={`${styles.Form} col-md-9`}>
          <h1>Login</h1>

          <form className={`${styles.Form}`} action="" onSubmit={handleSubmit}>
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
              <input type="checkbox" name="remember" id="remeber" />
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
