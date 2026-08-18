const express = require('express');
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movie.routes');
const cinemaRoutes = require('./routes/cinema.routes');

connect();

const PORT = 3000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/movies', movieRoutes);
server.use('/cinemas', cinemaRoutes);

server.use((req, res) => {
    res.status(404).json('Ruta no encontrada en este servidor');
});

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});
