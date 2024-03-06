import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import moment from 'moment';
import axios from "axios";
import { useAuth } from "../AuthContext";
import Navbar from '../views/Navbar';
import EditBook from "./EditBook";

const Dashboard = (props) => {
    const { logout } = useAuth();
    const [books, setBooks] = useState([]);
    const [updated, setUpdated] = useState(false);
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    const removeBookFromState = (bookId) => {
        setBooks((prevBooks) => prevBooks.filter(book => book._id !== bookId));
    };

    useEffect(() => {
        axios.get("http://localhost:8000/api/books", {
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
            setBooks(res.data.books);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [updated]);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            // Call the logout function from the AuthContext
            await logout();
            navigate('/');
        } catch (error) {
            // Handle logout error
            console.error(error);
        }
    }

    return (
        <>
            <div className="row">
                <Navbar user={user} />
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    {books.length > 0 ? (
                        books.map((book, index) => (
                            <div key={index} className="col-3">
                                <div className="card-body">
                                    <Link className="card-title h3" to={`/book/${book._id}`}>{book.title} - {book.author}</Link>
                                    <img src={`${book.imageUrl}`} className="card-img-top customImageWidth" width={20} height={300} alt="Book's Cover" />
                                    <p className="card-subtitle">Added by: {book.userId ? `${book.userId.firstName} ${book.userId.lastName}` : 'Unknown User'}</p>
                                    <p className="card-subtitle mb-2 text-muted">{moment(book.createdAt).startOf().fromNow()} </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-100">
                            <div className="card text-center w-100">
                                <div className="card-header">
                                    There are no books yet!
                                </div>
                                <div className="card-body">
                                    <Link to={'/book/create'}>Create a new book</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;