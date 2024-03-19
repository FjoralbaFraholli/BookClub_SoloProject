const Book = require('../models/books.model');

module.exports.getAllBooks = async (req, res) => {
    try {
        // Use populate to include user details
        const books = await Book.find().populate('userId', 'firstName lastName');

        return res.json({ books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.getOneBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(oneBook => {
            res.json({ book: oneBook })
        })
        .catch((err) => {
            console.log(err);
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.createBook = (req, res) => {
    Book.create(req.body)
        .then(newlyCreatedBook => {
            res.json({ book: newlyCreatedBook })
        })
        .catch((err) => {
            console.log(err);
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.getOneBookAndUpdate = (req, res) => {
    Book.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
        .then(updatedBook => {
            res.json({ book: updatedBook })
        })
        .catch((err) => {
            console.log(err);
            res.json({ message: 'Something went wrong', error: err })
        });}
 
module.exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports.addToFavorites = async (req, res) => {
    try {

        const { id, userId } = req.params;
       
        let updatedBook;

        if (req.params.action === "add" || req.params.action === "remove") {
            // Add or remove the user from favorites based on the action
            updatedBook = await Book.findByIdAndUpdate(
                id,
                req.params.action === "add"
                    ? { $addToSet: { favorite: req.body } }
                    : { $pull: { favorite: { userId: userId } } },
            ).populate('favorite.userId', 'firstName lastName');
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        res.json({ book: updatedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err });
    }
};
        
        