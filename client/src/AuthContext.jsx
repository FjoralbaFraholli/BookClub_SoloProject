import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            }, {
                withCredentials: true,
            });

            const { data } = response;

            // Assuming the server sends back a JWT token

            const { token: token, user: userData } = data;

            //Set the user state
            setUser(userData);
            console.log(data);

            //Store the token in localStorage or a cookie
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userData._id);
            const userDataString = JSON.stringify(userData);
            localStorage.setItem('user', userDataString)


            return userData; // You might want to return user data for further use
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        }
    };

    const register = async (firstName, lastName, email, password, confirmPassword) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }, {
                withCredentials: true,
            });

            const { data } = response;

            //Assuming the server sends back a JWT token
            const { token, user: userData } = data;

            //Set the user state
            setUser(userData);
            // console.log(data);

            //Store the token in localStorage or a cookie
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userData._id);
            const userDataString = JSON.stringify(userData);
            localStorage.setItem('user', userDataString)

            return userData; // You might want to return user data for further use
            
        } catch (error) {
            console.error('Registration failed:', error.message);
            console.log(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            axios.post('http://localhost:/8000/api/logout', {
                withCredentials: true
            });
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('user');

            window.location.href = '/login';
            //Remove the token from localStorage or a cookie
        } catch (error) {
            console.error('Logout failed:', error.message);
            console.log(error)
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};