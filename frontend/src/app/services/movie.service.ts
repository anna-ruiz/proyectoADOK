import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseURL = 'http://localhost:3000/api/movies/';
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseURL);
  }

  updateMovie(id: string, movie: Movie): Observable<RespuestaAPIFull>{
    return this.http.patch<RespuestaAPIFull>(this.baseURL+id,movie);
  }

  deleteMovie(id: string): Observable<RespuestaAPI>{
    return this.http.delete<RespuestaAPI>(this.baseURL+id);
  }

  getGenres():Observable<string[]>{
    return this.http.get<string[]>(this.baseURL+'genres');
  }

  newMovie(movie: Movie): Observable<RespuestaAPI>{
    return this.http.post<RespuestaAPI>(this.baseURL,movie);
  }

}

//Montamos aqui la interfaz xq solo la usamos 1 vez
interface RespuestaAPIFull{
  status: string,
  data: Movie
}
interface RespuestaAPI{
  status: string,
}
