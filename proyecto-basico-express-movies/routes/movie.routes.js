const express = require('express');
const Movie = require('../models/Movie'); 
const router = express.Router();

// 1. GET - Obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener las películas', error: err });
    }
});

// 2. GET - Obtener película por ID
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json({ message: 'Error en el servidor', error: err });
    }
});

// 3. GET - Obtener película por título
router.get('/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        const movieByTitle = await Movie.find({ title: new RegExp(title, 'i') }); // Buscamos ignorando mayúsculas
        return res.status(200).json(movieByTitle);
    } catch (err) {
        return res.status(500).json({ message: 'Error en el servidor', error: err });
    }
});

// 4. GET - Obtener películas por género
router.get('/genre/:genre', async (req, res) => {
    const { genre } = req.params;
    try {
        const movieByGenre = await Movie.find({ genre: new RegExp(genre, 'i') });
        return res.status(200).json(movieByGenre);
    } catch (err) {
        return res.status(500).json({ message: 'Error en el servidor', error: err });
    }
});

// 5. GET - Obtener películas a partir de un año
router.get('/year/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const movieByYear = await Movie.find({ year: { $gte: year } });
        return res.status(200).json(movieByYear);
    } catch (err) {
        return res.status(500).json({ message: 'Error en el servidor', error: err });
    }
});

// 6. POST - Crear una nueva película (Añadido)
router.post('/', async (req, res) => {
    try {
        const newMovie = new Movie(req.body); // Obtenemos los datos que envía el usuario en Postman
        const createdMovie = await newMovie.save(); // Lo guardamos en MongoDB
        return res.status(201).json(createdMovie); // 201 significa "Creado con éxito"
    } catch (err) {
        return res.status(400).json({ message: 'Error al crear la película. Revisa los campos obligatorios', error: err });
    }
});

// 7. PUT - Modificar una película existente por su ID (Añadido)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Buscamos por ID y actualizamos con el cuerpo que nos pasen en Postman
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'No se encontró la película para actualizar' });
        return res.status(200).json(updatedMovie);
    } catch (err) {
        return res.status(500).json({ message: 'Error al actualizar la película', error: err });
    }
});

// 8. DELETE - Eliminar una película por su ID (Añadido)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) return res.status(404).json({ message: 'No se encontró la película para eliminar' });
        return res.status(200).json({ message: 'Película eliminada correctamente', movie: deletedMovie });
    } catch (err) {
        return res.status(500).json({ message: 'Error al eliminar la película', error: err });
    }
});

module.exports = router;
