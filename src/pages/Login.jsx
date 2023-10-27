import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Footer, Navbar } from "../components";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      }).then((res) => {
        console.log(res.data);
        if (res.data.message === "Login Success") {
          alert("Login Success");
          window.location.href = "/";
        } else {
          alert("Login Failed");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form method="POST">
              <div className="my-3">
                <label>Email address</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
              </div>
              <div className="my-3">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit" onClick={login}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
