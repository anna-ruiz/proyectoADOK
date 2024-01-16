import {Schema} from "mongoose";
import requireMock = jest.requireMock;

export const MovieSchema:Schema = new Schema({
    title: {type: String, required: true },
    year: {type: Number, required: true },
    director: {type: String, required: true },
    plot: {type: String, required: true },
    poster: {type: String, required: true },
    genres: [{type: String, required: true }],
    imdb: {
       rating: {type: Number, required: true},
       votes: {type: Number, required: true}
    }
}, {versionKey: false}) //para q el _v no nos salga cada vez q crea un objeto en la BD
