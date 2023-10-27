import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Navbar = () => {
    const [isLoggedin, setIsLoggedin] = React.useState(false)
    const logout = async () => {
        try {
            await axios.get("http://localhost:3001/logout", {
                withCredentials: true
            }).then((res) => {
                console.log(res.data);
                if (res.data.message === "Logout Success") {
                    alert("Logout Success");
                    window.location.href = "/";
                } else {
                    alert("Logout Failed");
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        const checkLogin = async () => {
            try {
                await axios.get("http://localhost:3001/login", {
                    withCredentials: true
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.message === "Login Success") {
                        setIsLoggedin(true)
                    } else {
                        setIsLoggedin(false)
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
        checkLogin();
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Product Scraper</NavLink>
                <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        {isLoggedin ? <button className="btn btn-danger" onClick={logout}>Logout</button> : <NavLink className="btn btn-primary mx-2" to="/login">Login</NavLink>}
                        {!isLoggedin && <NavLink className="btn btn-primary mx-2" to="/register">Register</NavLink>}
                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar