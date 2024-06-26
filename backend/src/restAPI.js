const express = require('express');
const router = express.Router();

let movies = [
    {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010
    },
    {
        id: 2,
        title: 'The Matrix',
        director: 'Lana and Lilly Wachowski',
        year: 1999
    },
    {
        id: 3,
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014
    }
];

// All movies
router.get('/movies', (req, res) => {
    res.json(movies);
    console.log('Query parameters:', req.query);
});

//Movie by id
router.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
});

router.post('/movies', (req, res) => {
    console.log(req.body);
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});


router.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');

    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    res.json(movie);
});


router.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('Movie not found');

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

module.exports = router;
