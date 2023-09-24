import React from "react";
import { toast } from 'react-toastify';
import LoginService from "../../services/LoginService";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;

    setState({
      ...state,
      [evt.target.name]: value
    });
  };




  const handleOnSubmit = evt => {
    evt.preventDefault();
    console.log(state);
    let data = LoginService.saveDetails(state).then((d) => {


      if (d.data.message === "User added") {
        toast.success(d.data.message, { autoClose: 500 });
      }

      if (d.data.message === "Password must have a capital letter a small letter and a number and include any special character") {
        toast.warning(d.data.message, { autoClose: 2000 });
      }

      if (d.data.message === "In email domain name should contain parking and only small letters") {
        toast.error(d.data.message, { autoClose: 2000 });
      }


      if (d.data.message === "User already exists!") {
        toast.error(d.data.message, { autoClose: 1000 });
      }

      if (d.data.message === "All fields are mandatory ; Please fill it.") {
        toast.warning(d.data.message, { autoClose: 2000 });
      }
    })
      .catch(err => {
        toast.error("Server Error catch block frontend", { autoClose: 1000 })
      })

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1 className="title">Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          className="name-input-feild"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="email-input-feild"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="password-input-feild"
        />
        <button type='submit' className='sign-up-button'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
