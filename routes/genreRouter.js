const express = require('express');
const bodyParser = require('body-parser');

const genresRouter = express.Router();

genresRouter.use(bodyParser.json());

genresRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the genres to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the genre: ' + JSON.stringify(req.body));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /genres');
    })
    .delete((req, res, next) => {
        res.end('Deleting all genres');
    });

genresRouter.route('/:genreId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of the genre: ' + req.params.genreId + ' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /genres/' + req.params.genreId);
    })
    .put((req, res, next) => {
        const updatedGenre = {
            id: req.body.id,
            name: req.body.name
        };
        res.write('Updating the genre: ' + req.params.genreId + '\n');
        res.end('Will update the genre with details: ' + JSON.stringify(updatedGenre));
    })
    .delete((req, res, next) => {
        res.end('Deleting genre: ' + req.params.genreId);
    });

module.exports = genresRouter;
