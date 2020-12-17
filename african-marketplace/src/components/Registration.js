import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
 
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password:"",
    passwordConfirmation:"",
    terms: true
  });

 
  const [serverError, setServerError] = useState("");

  
  const [buttonDisabled, setButtonDisabled] = useState(true);

  

  const [errors, setErrors] = useState({
    name: "", 
    email: "",
    password:"",
    passwordConfirmation:"",
    terms: ""
  });

 
  const [post, setPost] = useState([]);

  
  const validateChange = (e) => {
   

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value) 
      .then((valid) => {
       
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch((err) => {
        console.log(err);

       
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };
  
  const formSubmit = (e) => {
    e.preventDefault(); 
    console.log("form submitted!");

   
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log("success!", res.data);
      
        setPost(res.data);

     
        setServerError(null); 

      
        setFormState({
          name: "",
          email: "",
          password:"",
          passwordConfirmation:"",
          terms: true
        });
      })
      .catch((err) => {
      
        setServerError("oops! something happened!");
      });
  };

  
  const inputChange = (e) => {
   
    e.persist(); 
    console.log("input changed!", e.target.value);
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e); 
    setFormState(newFormData); 
  };

 
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"), 
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"), 
      
      password: yup
      .string()
      .required('Password is required'),

     passwordConfirmation: yup
     .string()
     .oneOf([yup.ref('password'), null], 'Passwords must match'),
     
    terms: yup.boolean().oneOf([true], "Please agree to Terms and Conditions")
  });

 
  useEffect(() => {
    formSchema.isValid(formState).then((isValid) => {
     
      setButtonDisabled(!isValid); 
    });
  }, [formState]);

  return (
    <form onSubmit={formSubmit}>
      {serverError ? <p className="error">{serverError}</p> : null}

      
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          placeholder="name"
          onChange={inputChange}
          data-cy="name"
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      
        <input
          id="email"
          type="text"
          name="email"
          value={formState.email}
          placeholder="email"
          onChange={inputChange}
          data-cy="email"
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      
          <input
          type="string"
          id="password"
          name="password"
          value={formState.password}
          placeholder="password"
          onChange={inputChange}
          data-cy="password"
          />
         
          <input
          type="string"
          id="passwordConfirmation"
          name="passwordConfirmation"
          value={formState.passwordConfirmation}
          placeholder=" Confirm Password"
          onChange={inputChange}
          data-cy="passwordConfirmation"
          />
     
      <label htmlFor="terms" className="terms">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formState.terms}
          onChange={inputChange}
          data-cy="terms"
        />
        Terms and Conditions
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label>
      <button disabled={buttonDisabled} type="submit">
        Submit
      </button>

      
    </form>
  );
}
