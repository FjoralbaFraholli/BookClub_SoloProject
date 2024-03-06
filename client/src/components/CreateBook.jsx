import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "../views/Navbar";


const CreateBook = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const userId = localStorage.getItem('userId');

    const navigateBack = () => {
        navigate(-1);
    }

    const createBook = (e) => {
        e.preventDefault();
        if (title.length < 1 || description.length < 5 ) {
            setErrorMessage('Your form has some unsolved issues!')
        }
        else {
            const token = localStorage.getItem('token');
            console.log('token here', token);
            
            axios.post("http://localhost:8000/api/book/", {
                title,
                author,
                imageUrl,
                description,
                userId: userId
            }, {
                withCredentials: true
            })
                .then(res => {
                    setTitle(''),
                    setAuthor(''),
                    setImageUrl(''),
                    setDescription(''),
                    navigate('/')
                })
                .catch(err => {
                    setErrorMessage("Your api has some problems!");
                    console.log(err)
                })
        }
    }

    return (
        <div className="px-3">
            <Navbar />
            <p className="text-decoration-none" onClick={navigateBack}> &larr; </p>
            <h1 className="text-center p-2">Add a New Book</h1>
            {
                errorMessage ?
                    <p className="text-danger text-center">{errorMessage}</p> :
                    null
            }

            <form className="w-75 m-auto" onSubmit={(e) => createBook(e)}>
                <div>
                    <label className="form-label">Title:</label>
                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the title" />
                </div>
                {
                    title.length < 1 ?
                        <p className="text-danger">Title is required</p> :
                        null
                }
                <div>
                    <label className="form-label">Author:</label>
                    <input className="form-control" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Enter the title" />
                </div>
                {/* {
                    author.length < 1 ?
                        <p className="text-danger">Author is required</p> :
                        null
                } */}
                <div>
                    <label className="form-label">Image Url:</label>
                    <input className="form-control" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Enter the image url" alt="Book's Cover" />
                </div>
                {/* {
                    imageUrl.length<1?
                    <p className="text-danger">Please insert the image url</p>:
                    null
                } */}
                <div>
                    <label className="form-label">Description:</label>
                    <textarea className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter the description" cols="30" rows="5" />
                </div>
                {
                    description.length < 5 ?
                        <p className="text-danger">Description must be at least 5 characters</p> :
                        null
                }

                <button className="btn btn-outline-primary customColor mt-2">Add Book</button>
            </form>
        </div>
    )
}

export default CreateBook;