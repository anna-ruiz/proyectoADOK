//Imports
const express = require('express');
const router = express.Router();

const movieCtrl = require('../controllers/movie.controller');//CREAMOS CONTROLADOR DE MOVIE


//Rutas, aqui definimos los endpoints de la API en /api/movies
    //Esta '/' indica que estamos en /api/movies xq cuando el user esta en /api/movies le reedirige a aqui (movie.route.js)
    //asi q la raiz de movie.route es /api/movies
router.post('/',movieCtrl.addMovie)

//Es dnd definimos los endpoints de la API en /api/moovies
router.get('/',movieCtrl.getMovies);

//Para la ruta de get de una peli vamos a necesitar el id y lo pasamos por parametro en la ruta con :id
router.get('/movie/:id', movieCtrl.getMovie);
router.patch('/:id', movieCtrl.updateMovie);

router.delete('/:id', movieCtrl.deleteMovie);
router.get('/genres', movieCtrl.getGenres);

//para buscar x titulo
router.get('/title/:title', movieCtrl.getByTitle);

//para buscar x genero al q pertenecen
router.get('/byGenre/:genre', movieCtrl.getByGenre);




module.exports = router;