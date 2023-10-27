import React from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/register", {
                name: name,
                email: email,
                password: password,
            }).then((res) => {
                console.log(res.data);
                if (res.data.message === "User Created") {
                    alert("User Created");
                    window.location.href = "/login";
                } else {
                    alert("User Not Created");
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
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form action='post'  >
                            <div className="form my-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    value={name}
                                />
                            </div>
                            <div className="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                    value={email}
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    value={password}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit" onClick={register}>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register