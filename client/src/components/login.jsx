import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
//import jsonwebtoken from "jsonwebtoken";
import { Navigate  } from "react-router-dom";


async function authenticateUser()
{
    const handleClick = () => {
      Navigate("/products");
  }
   let emailData = document.getElementById("login-mail");
   let passwordData = document.getElementById("login-pwd");
   if(emailData && passwordData) {
      const email = emailData.value;
      const password = passwordData.value.toString();
      const body = {
        "username": 0,
        "email": email,
        "name": 0,
        "surname": 0,
        "dob": 0,
        "pfp": 0,
        "password": password 
      }

      await fetch("http://localhost:3000/users/login", {
        method: "POST",      
        headers: { 
        "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body)
      })
      .then(resp => {
        return resp.json()
      })
      .then(data => {     
        return  (<Navigate to="/products" replace={true} />);
      })
      .catch((err) => console.log("problem: ", err));
   }
      
}

export default function Login() {

  return (
    <div className="Auth-form-container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div className="form-group mt-3">
          <label >Email address</label>
          <input
          id="login-mail"
          type="email"
          className="form-control mt-1"
          placeholder="Enter email"
          />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          id="login-pwd"
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        <button type="submit" onClick={authenticateUser} className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right mt-2">
        Forgot <a href="#">password?</a>
      </p>
    </div>
  </form>

</div>


  )
}
