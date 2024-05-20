const express = require('express');
const bodyParser = require('body-parser');

const authorsRouter = express.Router();

authorsRouter.use(bodyParser.json());

authorsRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the authors to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the author: ' + JSON.stringify(req.body));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /authors');
    })
    .delete((req, res, next) => {
        res.end('Deleting all authors');
    });

authorsRouter.route('/:authorId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of the author: ' + req.params.authorId + ' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /authors/' + req.params.authorId);
    })
    .put((req, res, next) => {
        const updatedAuthor = {
            id: req.body.id,
            name: req.body.name,
            birthYear: req.body.birthYear,
            country: req.body.country
        };
        res.write('Updating the author: ' + req.params.authorId + '\n');
        res.end('Will update the author with details: ' + JSON.stringify(updatedAuthor));
    })
    .delete((req, res, next) => {
        res.end('Deleting author: ' + req.params.authorId);
    });

module.exports = authorsRouter;
