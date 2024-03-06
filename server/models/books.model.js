const mongoose = require('mongoose');

const Book = new mongoose.Schema({

    title: { 
        type: String,
        required: [true, 'The question is required']
    },
    author: {
        type: String,
        // required: [true, 'The question is required']
    },
    description: { 
        type: String,
        minLength: [5, 'The question must be more than 5 characters'],
        required: [true, 'The first option is required']
    },
    imageUrl: { 
        type: String,
    },
    favorite: [{ 
        firstName: { 
            type: String
        },
        lastName: { 
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Book', Book);


