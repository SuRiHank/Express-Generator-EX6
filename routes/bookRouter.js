const express = require('express');
const bodyParser = require('body-parser');

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the books to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the book: ' + req.body.title + ' with details: ' + JSON.stringify(req.body));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /books');
    })
    .delete((req, res, next) => {
        res.end('Deleting all books');
    });

bookRouter.route('/:booksId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of the book: ' + req.params.booksId + ' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /books/' + req.params.booksId);
    })
    .put((req, res, next) => {
        const updatedBook = {
            isbn: req.body.isbn,
            title: req.body.title,
            subTitle: req.body.subTitle,
            publish_date: req.body.publish_date,
            publisher: req.body.publisher,
            pages: req.body.pages,
            description: req.body.description,
            website: req.body.website
        };
        res.write('Updating the book: ' + req.params.booksId + '\n');
        res.end('Will update the book with details: ' + JSON.stringify(updatedBook));
    })
    .delete((req, res, next) => {
        res.end('Deleting book: ' + req.params.booksId);
    });

module.exports = bookRouter;
