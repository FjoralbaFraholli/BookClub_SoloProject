import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import background from "../images/background.png";

const LoginPage = () => {
    return (
        <div className="container-md vh-100 mask-costum" style={{ backgroundImage: `url(${background})` }}>
            <div className="d-flex align-items-center justify-content-center text-center">
                <div>
                <h2>Welcome to BookClub!</h2>
                    <p>Please login or register to access the books.</p>
                    <br />
                    <Link to={"/login"} className="btn btn-primary">Login</Link>
                    <Link to={"/register"} className="btn btn-primary">Signup Now</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
