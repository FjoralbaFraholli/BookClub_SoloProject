const BookController = require('../controllers/books.controller'); 
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/books', authenticate, BookController.getAllBooks);
    app.post('/api/book', authenticate, BookController.createBook);
    app.get('/api/book/:id', authenticate, BookController.getOneBook);
    app.put('/api/book/:id', authenticate, BookController.getOneBookAndUpdate);
    app.delete('/api/book/:id', authenticate, BookController.deleteBook);
    app.put('/api/book/:id/:userId/favorite/:action', authenticate, BookController.addToFavorites);
}

