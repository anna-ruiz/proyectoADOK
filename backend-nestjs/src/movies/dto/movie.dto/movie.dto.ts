export class Imdb {
    rating: number;
    votes: number;
}

export class MovieDto { //El dto es el modelo de datos simplificado para q el user lo pueda gastar
    imdb: Imdb;
    _id: string;
    title: string;
    year: number;
    director: string;
    plot: string;
    poster: string;
    genres: string[];
}
