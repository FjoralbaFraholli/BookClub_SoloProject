import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../views/Navbar";

const Register = () => {

    const { register } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState();

    const navigate = useNavigate();

    // const navigateBack = () => {
    //     navigate(-1);
    // }

    const handleRegister = async (e) => {
        e.preventDefault();

        setPasswordError('');
        setError('');

        if (password !== confirmPassword) {
            setPasswordError('The confirmation does not match with your password.');
            return;
        }

        if (firstName.length < 2 || lastName.length < 2 || email.length < 1 || password.length < 8) {
            setError('Your form has some unsolved issues!');
            return;
        }

        try {
            //Call the register function from the AuthContext
            await register(firstName, lastName, email, password, confirmPassword);
            navigate('/books')
        } 

        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.email) {
                setEmailError('This email already exists, try another one!');
            } else {
                setError('Please check your data');
            }
        }
        
        // catch (error) {
        //     setError('Some errors')
        // }
    };


    return (
        <div>
            <Navbar />
            <form className='form' onSubmit={handleRegister}>
                {
                    passwordError ? 
                    <p className="text-danger">{passwordError}</p> : 
                    null
                }
                {
                    error ?
                        <p>{error}</p> :
                        null
                }

                <h3>Join BookClub</h3>

                <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                {
                    firstName.length < 2 ? 
                    <p className="text-danger">First Name should be at least 2 characters</p> : 
                    null
                }
                <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                {
                    lastName.length < 2 ? 
                    <p className="text-danger">Last Name should be at least 2 characters</p> : 
                    null
                }
                <div>
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
                    password.length < 8 ? 
                    <p className="text-danger">Password must be at least 8 characters</p>:
                    null
                }
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )

}

export default Register;