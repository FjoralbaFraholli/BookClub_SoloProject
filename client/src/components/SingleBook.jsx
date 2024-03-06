import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import Navbar from "../views/Navbar";

const SingleBook = () => {
    const [book, setBook] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const [userCreator, setUserCreator] = useState({});
    const userId = localStorage.getItem('userId');
    const storedUserData = localStorage.getItem('user');
    const user = JSON.parse(storedUserData);
    const [favUpdate, setFavUpdate] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/book/${id}`, { withCredentials: true })
            .then((res) => {
                setBook(res.data.book);
                console.log(book)
                setIsFavorite(res.data.book?.favorite?.some(fav => fav.userId === userId) || false);
                if (res.data.book.userId) {
                    axios.get(`http://localhost:8000/api/user/${res.data.book.userId}`)
                        .then((userRes) => {
                            setUserCreator(userRes.data.user);
                            setIsCreator(userRes.data.user._id === userId);
                            setFavUpdate(false)
                        })
                        .catch((userErr) => {
                            console.error('Error fetching user details:', userErr);
                        });
                }
            })
            .catch((err) => {
                console.error('Error fetching book details:', err);
            });
    }, [favUpdate]);


    const addToFavorites = () => {
        const action = isFavorite ? "remove" : "add";
        const userDetail = {
            firstName: user.firstName,
            lastName: user.lastName,
            userId: userId,
        };
    
        axios.put(`http://localhost:8000/api/book/${id}/${userId}/favorite/${action}`, userDetail, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setIsFavorite(!isFavorite); // Toggle the state
                setBook(response.data.book); // Update the book details
                setFavUpdate(true)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    

    const navigateToEdit = () => {
        navigate(`/book/edit/${id}`);
    };


    return (
        <>
            <div className="row">
                <Navbar user={user} />
                <div className="d-flex">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`${book.imageUrl}`} className="img-fluid rounded-start" alt="Book's Cover" />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">{book.title}</h3>
                                <br />
                                <p className="blockquote-footer">Author: {book.author}</p>
                                <p className="card-text">{book.description}</p>
                                <p className="card-subtitle mb-2 text-muted">Added by: {userCreator.firstName} {userCreator.lastName}</p>
                                <p className="card-text mb-2"><small class="text-muted">posted {moment(book.createdAt).startOf().fromNow()}</small></p>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-8">
                        <h1>{book.title}</h1>
                        <img src={`${book.imageUrl}`} className="card-img-top customImageWidth" width={0} height={300} alt="Book's Cover" />
                        <p>Author: {book.author}</p>
                        <p>Description: {book.description}</p>
                        <p>Added by: {userCreator.firstName} {userCreator.lastName} </p>
                        <p>Added: {moment(book.createdAt).startOf().fromNow()} </p>
                    </div> */}


                    <div className="col-3 mt-4 ms-5">
                        <h4>Users Who Like This Book:</h4>
                        {
                            book && book.favorite && (
                                <>
                                    <ul>
                                        {book.favorite.map((fav, index) => (
                                            
                                            <li key={index}>{fav.firstName} {fav.lastName}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                    </div>


                    <div className="col-1 mt-4 ms-10">
                        <div>
                            {isCreator ? (
                                <p>This is one of your favorites.</p>
                            ) : (
                                <button className="mx-2 btn btn-outline-primary" onClick={addToFavorites}>
                                    {isFavorite ? "Un-favorite" : "Add to Favorites"}
                                </button>
                            )}

                            {isCreator && (
                                <button className="mx-2 btn btn-outline-warning" onClick={navigateToEdit}>
                                    Edit this book
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>                 
        </>
    );
};

export default SingleBook;
