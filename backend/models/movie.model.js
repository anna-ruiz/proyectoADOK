//Imports
const mongoose = require('mongoose');
const {Schema} = mongoose; //Para obtener solo la parte de Schema de mongoose


//Creamos el esquema de Mongoose que define el modelo de datos
const movieSchema
    = new Schema(
    {
        title: {type: String, required: true},
        year: {type: Number, required: true},
        director: {type: String, required: true},
        plot: {type: String, required: true},
        poster: {type: String, required: true, default: null},
        genres: [{type: String, required: true}],
        imdb: {
            rating: {type: Number, required: true},
            votes: {type: Number, required: true}
        }
    }
);


//Exportamos el modelo Movie que hemos creado con el esquema de Mongoose y le pasamos tmb el nombre de la coleccion
module.exports = mongoose.model('Movie',movieSchema, 'pelis2023');
