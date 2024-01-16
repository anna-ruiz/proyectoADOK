//Importamos las dependencias (en JavaScript se hacen asi)
const express = require('express'); //Carga express (Del node modules) en una constante
const morgan = require('morgan');
const cors = require('cors');

const app = express();//Guardamos en la constante/variable app para guardar toda la funcionalidad de Express
const {mongoose} = require('./database');//import
const {json} = require('express');//import


//Settings
app.set('port',process.env.PORT || 3000); //definimos el puerto en la const port q es dnd va a escuchar la API

//Middleware (son modulos intermedios de apoyo/funcionalidad para la API)
app.use(morgan('dev'));//nos dice las peticiones a la API (protocolo/codigo/tiempo/endpoint)
app.use(cors());//se encarga de decir quien tiene acceso a la API
app.use(express.json());//para poder trabajar con los datos/info en formato Json para leer/escrbir

//routes  es dnd definimos los endpoints iniciales de la aplicacion y los archivos de rutas dnd estarán los endpoints finales
app.use('/api/movies', require('./routes/movie.route'));//Definimos el archivo de rutas de nuestra API
app.use('/api', (req,res) => res.send('API está en /api/movies'));
app.use('/', (req,res) => res.send('API está en /api/movies'));

//Arrancar el servidor   la app se pone a escuchar en un puerto determinado x la const port (que hemos definido arriba)
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});


