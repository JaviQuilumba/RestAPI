import React, { useState, useEffect } from 'react';
import './estilos.css';
import {Link} from "react-router-dom";

function RESTful() {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        year: ''
    });
    const [editingMovieId, setEditingMovieId] = useState(null);
    const [editingMovie, setEditingMovie] = useState({
        id: null,
        title: '',
        director: '',
        year: ''
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        fetch('http://localhost:3001/api/movies')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingMovieId !== null) {
            setEditingMovie({ ...editingMovie, [name]: value });
        } else {
            setNewMovie({ ...newMovie, [name]: value });
        }
    };

    const handleAddMovie = () => {
        fetch('http://localhost:3001/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Fallo al agregar una pelicula');
                }
                return response.json();
            })
            .then(data => {
                setMovies([...movies, data]);
                setNewMovie({
                    title: '',
                    director: '',
                    year: ''
                });
            })
            .catch(error => console.error('Error adding movie:', error));
    };

    const handleEditMovie = () => {
        fetch(`http://localhost:3001/api/movies/${editingMovie.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingMovie)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to edit movie');
                }
                return response.json();
            })
            .then(data => {
                const updatedMovies = movies.map(movie => {
                    if (movie.id === editingMovie.id) {
                        return { ...movie, ...editingMovie };
                    }
                    return movie;
                });
                setMovies(updatedMovies);
                setEditingMovieId(null);
                setEditingMovie({
                    id: null,
                    title: '',
                    director: '',
                    year: ''
                });
            })
            .catch(error => console.error('Error editing movie:', error));
    };

    const handleDeleteMovie = (id) => {
        fetch(`http://localhost:3001/api/movies/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete movie');
                }
                return response.json();
            })
            .then(() => {
                const updatedMovies = movies.filter(movie => movie.id !== id);
                setMovies(updatedMovies);
            })
            .catch(error => console.error('Error deleting movie:', error));
    };

    const handleStartEditing = (movie) => {
        setEditingMovieId(movie.id);
        setEditingMovie(movie);
    };


    return (
        <div>
            <h1>Películas</h1>
            <pre>{JSON.stringify(movies,null,2)}</pre>
            <h2>Lista de Películas</h2>
            {movies.length > 0 ? (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            {editingMovieId === movie.id ? (
                                <div>
                                    <h3>{movie.title}</h3>
                                    <input type="text" name="title" value={editingMovie.title} onChange={handleInputChange}/>
                                    <input type="text" name="director" value={editingMovie.director} onChange={handleInputChange}/>
                                    <input type="text" name="year" value={editingMovie.year} onChange={handleInputChange}/>
                                    <button onClick={handleEditMovie}>Guardar Cambios</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{movie.title}</h3>
                                    <p><strong>Director:</strong> {movie.director}</p>
                                    <p><strong>Año:</strong> {movie.year}</p>
                                    <button className="delete" onClick={() => handleDeleteMovie(movie.id)}>Eliminar</button>
                                    <button className="edit" onClick={() => handleStartEditing(movie)}>Editar</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay películas disponibles.</p>
            )}

            <h2>Agregar Película</h2>
            <input type="text" name="title" placeholder="Título" value={newMovie.title} onChange={handleInputChange}/>
            <input type="text" name="director" placeholder="Director" value={newMovie.director} onChange={handleInputChange}/>
            <input type="text" name="year" placeholder="Año" value={newMovie.year} onChange={handleInputChange}/>
            <button onClick={handleAddMovie}>Agregar</button>
            <div className="button-container">
                <Link to="/"><button className="styled-button">Volver</button></Link>
            </div>
        </div>
    );

}

export default RESTful;

