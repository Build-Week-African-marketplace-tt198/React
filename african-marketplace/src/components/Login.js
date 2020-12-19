import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [post, setPost] = useState([]);

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log(err);

        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
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
          email: "",
          password: "",
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
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    validateChange(e);
    setFormState(newFormData);
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Must include an email"),

    password: yup.string().required("Password is required"),
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
        id="email"
        type="text"
        name="email"
        value={formState.email}
        placeholder="Email"
        onChange={inputChange}
        data-cy="email"
      />
      {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}

      <input
        type="string"
        id="password"
        name="password"
        value={formState.password}
        placeholder="Password"
        onChange={inputChange}
        data-cy="password"
      />

      <button disabled={buttonDisabled} type="submit">
        Submit
      </button>
      <Link to="/Registration">Don't have an account? Please register</Link>
    </form>
  );
}
