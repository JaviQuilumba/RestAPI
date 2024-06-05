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

// Todas las peliculas
router.get('/movies', (req, res) => {
    res.json(movies);
});

// Pelicula ID
router.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('La película no fue encontrada');
    res.json(movie);
});

// Crear
router.post('/movies', (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Actualizar
router.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('La película no fue encontrada');

    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    res.json(movie);
});

// Eliminar
router.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('La película no fue encontrada');

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

module.exports = router;
