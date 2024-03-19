import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import background from "../images/background.png";
import Navbar from "./Navbar";

const LoginPage = () => {
    return (
        <div className="container-md vh-100 mask-costum" style={{ backgroundImage: `url(${background})` }}>
            <div className="d-flex align-items-center justify-content-center text-center">
                <div className="py-5">
                    <h1 className="text-white mt-5 py-5 h-100 w-100 text-uppercase">Welcome to BookClub!</h1>
                    <h2 className="text-white">Please Login or Signup to access the Books.</h2>
                    <Link to={"/login"} className="btn btn-info btn-lg mt-5 mx-1 btn-outline-light">Login</Link>
                    <Link to={"/register"} className="btn btn-info btn-lg mt-5 mx-1 btn-outline-light">Signup</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;