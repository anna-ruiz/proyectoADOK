//Imports
const Movie = require('../models/movie.model');
const movieCtrl = {};

//Definimos la funcion para poder insertar una peli
movieCtrl.addMovie = async (req,res) => {
    //En la const myMovie creamos un modelo de Movie con la info q viene en el body de la peticion POST
    const myMovie = new Movie(req.body);
    //Con el modelo (myMovie) ejecutamos la funcion save() para guardar el documento en la BD
    await myMovie.save()
        .then(() => res.json({staus: 'Movie Successfully Inserted'}))
        .catch(err => res.send(err.message));
}


//Funcion q busca una peli por id, si no la encuentra decimos q no existe
movieCtrl.getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id)
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({status: 'Movie does not exist'})
        })
    .catch(err => res.send(err.message));
}

movieCtrl.getMovies = async (req, res) => { //la funcion deberia de recibir la pagina
    const movie = await Movie.find()
        /*
        .limit(1) -->Numero de elementos x pagina
        .skip(0) --> Cuantos elementos saltamos
        //ejemplo recibiendo pagina
        Pag 1 --> limit 20 --> skip 0
        Pag 2 --> limit 20 --> skip 20
        Pag 3 --> limit 20 --> skip 40
                .skip((req.params.page-1)*20)
        */
        .then((data) =>
            res.json(data))
    .catch(err => res.send(err.message));
}

//Funcion q actualiza una peli por id con los datos nuevos
movieCtrl.updateMovie = async (req, res) => {
    const movieData = req.body;
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        {$set: movieData}, {returnOriginal: false})
        .then((data) =>
        {
            if(data!=null) res.json(
                {
                    status: 'Movie Successfully Updated',data
                })
                else res.json({status: 'Movie doesnt exist'})
            })
                .catch(err => res.send(err.message));
        }

//Funcion que busca una peli x id y la elimina
movieCtrl.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
        .then((data) => {
            if (data != null) res.json({status: 'Movie deleted successfully'})
            else res.json({status: 'Movie does not exist'})
        })
        .catch(err => res.send(err.message));
}

//Funcion para sacar los generos de las pelis
movieCtrl.getGenres = async (req,res) =>  {
    const movies = await Movie.find().distinct('genres')
        .then((data) =>
        res.json(data))
        .catch(err => res.send(err.message));
}

//metodo para buscar pelis x un titulo
movieCtrl.getByTitle = async (req, res) => {
    const movie = await Movie.find({title:{$regex:req.params.title}})//le decimos q busque x titulo cdefecto lo hará exacto x eso hacemos el regex
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({status: 'Movie does not exist'})
        })
        .catch(err => res.send(err.message));
}


//metodo para buscar pelis x un genero al q pertenecen
movieCtrl.getByGenre = async (req, res) => {
    const movie = await Movie.find({genres: req.params.genre})//le decimos q busque x titulo cdefecto lo hará exacto x eso hacemos el regex
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({status: 'Movie does not exist'})
        })
        .catch(err => res.send(err.message));
}
//Otro metodo para buscar pelis x un genero al q pertenecen
movieCtrl.getByGenre2 = async (req, res) => {
    const movie = await Movie.find({genres: {$in: req.params.genre.split(',')}})//le decimos q busque x titulo cdefecto lo hará exacto x eso hacemos el regex
        .then((data) => {
            if (data != null) res.json(data)
            else res.json({status: 'Movie does not exist'})
        })
        .catch(err => res.send(err.message));
}


module.exports = movieCtrl;