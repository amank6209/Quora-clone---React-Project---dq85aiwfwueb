import React, { useState } from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";

function Login() {

  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ")

  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => alert(e.message));

    console.log(auth);
  }

  const handleLogin = (e) => {

    e.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth)
      }).catch((e) => alert(e.message));

    setEmail("");
    setPassword("");
  };

  const handleRegister = (e) => {

    e.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {

        if (auth) {
          console.log(auth)
        }

      }).catch((e) => alert(e.message));

    setEmail("");
    setPassword("");
  };

  return (

    <div className="login">
      <div className="login-container">


        <div className="login__desc">

        </div>

        <div className="login__auth">
          <h5>Login</h5>


          <div className="login__emailPass">
            <div className="login__label">
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">


                <h5 className="login-lable">Email</h5>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="login-input"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <h5 className="login-lable">Password</h5>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="login-input"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small>Forgot Password?</small>
              <button className="registerBtn" onClick={handleRegister}>Register</button>
            </div>
            <button type="submit" className="loginBtn" onClick={handleLogin}>Login</button>

            <div className="login__authOption">
              <img
                className="login__googleAuth"
                src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                alt=""
              />
              <p onClick={signIn}>Continue With Google</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;