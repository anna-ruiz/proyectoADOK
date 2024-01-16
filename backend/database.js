//Imports
const mongoose = require('mongoose');

//URL del Cluster de MongoDB
const URI = 'mongodb+srv://root:root@miclusterad.dr6yibd.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI)//conectamos a la URI de Mongo
    .then(db => console.log('DB connected'))//Si va bien
    .catch(err => console.log(err));//Si va mal

//Exportamos el modulo para poder usarlo en el resto de la app!!!
module.exports = mongoose;
