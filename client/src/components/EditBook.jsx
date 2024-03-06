import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import Navbar from "../views/Navbar";

const EditBook = (props) => {
    const navigate = useNavigate();

    const [book, setBook] = useState({}); // Define 'book' in the state
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const userId = localStorage.getItem('userId');
    const { id } = useParams();

    const navigateBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/book/${id}`, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setBook(res.data.book);
                setTitle(res.data.book.title);
                setAuthor(res.data.book.author);
                setDescription(res.data.book.description);
                setImageUrl(res.data.book.imageUrl || '');
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id]);

    const updatePost = (e) => {
        e.preventDefault();
        if (title.length < 2 || description.length < 2) {
            setErrorMessage('Your form has some unsolved issues!');
        } else {
            axios.put(`http://localhost:8000/api/book/${id}`, {
                title,
                author,
                description,
                imageUrl
            }, {
                withCredentials: true
            })
                .then(res => {
                    navigate('/');
                })
                .catch(err => {
                    setErrorMessage("Your API has some problems!");
                    console.log(err);
                })
        }
    }

    const deleteBook = () => {
        axios.delete(`http://localhost:8000/api/book/${id}`)
            .then((res) => {
                console.log(res);
                // Invoke removeBookFromState function from props after successful deletion
                props.removeBookFromState(id);
                navigate('/books');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="d-flex">
            <Navbar />
            <div className="px-3">
                <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>
                <h1 className="text-center p-2">Edit Book</h1>
                {
                    errorMessage ?
                        <p className="text-danger text-center">{errorMessage}</p> :
                        null
                }

                <form className="w-75 m-auto" onSubmit={(e) => updatePost(e)}>
                    <div>
                        <label className="form-label">Title:</label>
                        <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title" />
                    </div>
                    {/* Additional form fields for description, imageUrl, etc. */}
                    <div>
                        <label className="form-label">Author:</label>
                        <input className="form-control" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter the title" />
                    </div>
                    <div>
                        <label className="form-label">Description:</label>
                        <textarea className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter the description" cols="30" rows="5" />
                    </div>

                    <button className="btn btn-outline-primary customColor mt-2">Update</button>
                    <button className="btn btn-outline-primary customColor mt-2" onClick={deleteBook}>Delete</button>
                </form>
            </div>

            <div className="px-3">
                <h1>Users Who Like This Book:</h1>
                <ul>
                    <li>{userId.firstName} {userId.lastName}</li>
                </ul>
            </div>
        </div>
    )
}

export default EditBook;
