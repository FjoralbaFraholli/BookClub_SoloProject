import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../views/Navbar";
import background from "../images/library-cover.png"

const Login = () => {

    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const navigate = useNavigate();

    // const navigateBack = () => {
    //     navigate(-1);
    // }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email.length < 1 || password.length < 1) {
            setError('Your form has some unsolved issues!');
            return;
        }

        try {
            // HERE ARE THE CHANGES
            await login(email, password);
            navigate('/books');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Please, make sure the user exists and the password is valid');
            } else {
                setError('Please check your data');
            }
        }

        // try {
        //     //Call the register function from the AuthContext
        //     await login(email, password);
        //     navigate('/books')

        // } catch (error) {
        //     setError('Some errors')
        // }
    };
    

    return (
        <div className="row">
            <Navbar />

            <div className="bg-image shadow-2-strong" style={{ backgroundImage: `url(${background})` }}>
                <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <form className='bg-white rounded shadow-5-strong p-5' onSubmit={handleLogin}>
                                    <h3 className="align-items-center">Welcome to our BookClub!</h3>
                                        {
                                            error ?
                                                <p>{error}</p> :
                                                null
                                        }
                                        <div className="form-outline mb-4 mt-5" data-mdb-input-init>
                                            <label>Email:</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        {
                                            email.length < 1 ? 
                                            <p className="text-danger">Email is required</p> : 
                                            null
                                        }
                                        <div>
                                            <label>Password:</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        {
                                            password.length < 1 ? 
                                            <p className="text-danger">Password is required</p>:
                                            null
                                        }

                                        <button type="submit" className="mt-5">Login</button>

                                        <div className="d-flex mt-5">
                                            <p>Already have an account? Please,</p>
                                            <Link to="/register">Signup</Link>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;