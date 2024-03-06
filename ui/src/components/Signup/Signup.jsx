import React, { useState } from "react";
import CustomFormField from "../../UI/CustomFormField/CustomFormField";
import Hero from "./SignUp.png";
import styles from "./Signup.module.css";
import GradientButton from "../../UI/GradientButton/GradientButton";
import { z } from "zod";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  firstName: z.string({ required_error: "First name is required" })
    .min(1, { message: "First name is required" }),

  lastName: z.string({ required_error: "Last name is required" })
    .min(1, { message: "Last name is required" }),

  email: z.string({ required_error: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),

  province: z.string({ required_error: "Province is required" })
    .min(1, { message: "Province is required" }),

  city: z.string({ required_error: "City is Required" })
    .min(1, { message: "City is required" })
});

const provincesList = [
  "AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"
];

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    province: "",
    city: ""
  });

  const handleInputChange = (fieldName, fieldValue) => {
    switch (fieldName) {
      case "firstName":
        setFirstName(fieldValue);
        break;

      case "lastName":
        setLastName(fieldValue);
        break;

      case "email":
        setEmail(fieldValue);
        break;

      case "password":
        setPassword(fieldValue);
        break;

      case "province":
        setProvince(fieldValue);
        break;

      case "city":
        setCity(fieldValue);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      province: "",
      city: ""
    })
    e.preventDefault();
    const result = schema.safeParse({ firstName, lastName, email, password, province, city });

    if (result.success) {
      try{
        const response = await axios({
          method: 'post',
          url: "http://localhost:8000/register",
          withCredentials: false,
          data: {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "province": "Alberta",
            "city": city,
            "areaCode": "M5V 2L7",
          }
        })
        toast.success(response.data.message)
      }
      catch(error){
        if (error.response && error.response.status === 400) {
          const errorArray = error.response.data.errors
          errorArray.forEach(e=>toast.error(e.message))
        } else {
          console.error('Request failed:', error);
        }
      }
      
    } else {
      setErrors({});
      for (const err of result.error.issues) {
        setErrors((prev) => ({
          ...prev,
          [err.path.toString()]: err.message,
        }));
      }
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <img className={styles.hero} src={Hero} alt="" />
        <div className={styles.Form}>
          <h1>Sign Up</h1>
          <form className={styles.Form} onSubmit={handleSubmit}>
            <div className={styles.formField}>
              <CustomFormField
                className={styles.field}
                name="firstName"
                value={firstName}
                label="First Name"
                onChange={handleInputChange}
                placeholder="Enter First Name"
                type="text"
                error={errors.firstName}
              />
              <CustomFormField
                className={styles.field}
                name="lastName"
                value={lastName}
                label="Last Name"
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                type="text"
                error={errors.lastName}
              />
            </div>
            <CustomFormField
              className={styles.field}
              name="email"
              value={email}
              label="Email"
              onChange={handleInputChange}
              placeholder="Enter Email Address"
              type="text"
              error={errors.email}
            />
            <CustomFormField
              className={styles.field}
              name="password"
              value={password}
              label="Password"
              onChange={handleInputChange}
              placeholder="Enter Password"
              type="password"
              error={errors.password}
            />
            <div className={styles.formField}>
              <div className={styles.Input}>
                <label htmlFor="province">Province</label>
                <select
                  id="province"
                  name="province"
                  value={province}
                  onChange={(e) => handleInputChange("province", e.target.value)}
                >
                  <option value="">Select Province</option>
                  {provincesList.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
                {errors.province && <div className={styles.error}>{errors.province}</div>}
              </div>
              <CustomFormField
                name="city"
                value={city}
                label="City"
                onChange={handleInputChange}
                placeholder="Enter City"
                type="text"
                error={errors.city}
              />
            </div>
            <GradientButton className={styles.button} text="Sign Up" rounded={true} />
            <div className={styles.register}>
              Already have an account?<span><a href="/login">Login Here</a></span>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
