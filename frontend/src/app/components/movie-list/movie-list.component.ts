import {Component, OnInit} from '@angular/core';
import {Movie} from "../../common/interfaces";
import {MovieService} from "../../services/movie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {faCirclePlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = [];
  formMovie: FormGroup = this.formBuilder.group(
    {
      _id: [''],
      title: [''],
      year: [new Date().getFullYear()],
      director: [''],
      plot: [''],
      poster: [''],
      genres: [],
      imdb: this.formBuilder.group(
        {
          rating: [0],
          votes: [0]
        }
      ),
    }
  );

  //Input para añadir un nuevo genero
  myNewGenre = new FormGroup({
    newGenre: new FormControl('')
});
  //Array q guarda los géneros de la BD
  genres: string[] = [];
  //Booleana para editar
  editar: boolean = false;

  constructor(private movieService: MovieService,
              private formBuilder: FormBuilder) {
  }
  // Getters Formulario
  get title(): any {
    return this.formMovie.get('title')?.value;
  }
  get year(): any {
    return this.formMovie.get('year');
  }
  get director(): any {
    return this.formMovie.get('director');
  }
  get plot(): any {
    return this.formMovie.get('plot');
  }
  get genresF(): any {
    return this.formMovie.get('genres')?.value;
  }
  get poster(): any {
    return this.formMovie.get('poster')?.value;

  }
  get rating(): any {
    return this.formMovie.get('imdb.rating');
  }
  get votes(): any {
    return this.formMovie.get('imdb.votes');
  }
// Genres NewGenre
  get newGenre(): any {
    return this.newGenre.get('newGenre')?.value;
  }

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getMovies().subscribe(
      {
        next: value => {
          this.movies = value;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('Donde')
        }
      }
    )
    this.movieService.getGenres().subscribe(
      {
        next: value => {
          this.genres = value;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('Donde')
        }
      }
    )
  }

  //Funcion parra Actualizar / Guardar
  onSubmit() {
    if (this.editar){
      const id = this.formMovie.getRawValue()._id;
      this.movieService.updateMovie(
        id, this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            this.loadMovies();
            alert(value.status);
          },
          error: err => {
            console.error(err);
          },
          complete: () => {
            console.log('Done')
          }
        }
      )
    }
    else {
      this.movieService.newMovie(this.formMovie.getRawValue()).subscribe(
        {
          next: value => {
            this.loadMovies();
            alert(value.status);
          },
          error: err => {
            console.error(err);
          },
          complete: () => {
            console.log('Done');
          }
        }
      )
    }
  }

  // Función para cargar la película que vamos a actualizar. Ponemos el boolean Editar a true
  loadMovie(movie: Movie) {
    this.formMovie.setValue(movie);
    this.editar = true;
  }

// Función para borrar el formulario para añadir una película nueva. Editar a falso
  newMovie() {

    this.formMovie.reset();
    this.editar = false;
  }

  // Función para añadir un nuevo género a la lista
// Diferenciamos la lista de nueva película
// De la de actualizar
  addNewGenre(newGenre: string) {
    let newGenres;
// si es nueva película añadimos el género a nuestra
// lista de géneros de la base de datos
    if(!this.editar)this.genres.push(newGenre)
// si no entonces tenemos que añadir el género
// a los géneros de la película que estamos actualizando

    else {
// Guardo el array de géneros
      newGenres = this.formMovie.getRawValue().genres;
// Añado el nuevo género al array
      newGenres.push(newGenre);
      this.genres.push(newGenre);
// Actualizo el array de géneros en el formulario
      this.formMovie.setControl(
        'genres',
        new FormControl(newGenres)
      );
    }
// para terminar borramos el campo del nuevo género
    this.newGenre.reset();
  }

  removeMovie(movie: Movie) {
    if (confirm('Desea borrar '+movie.title+'?')){
      this.movieService.deleteMovie(movie._id).subscribe(
        {
          next: value => {
            this.loadMovies();
            alert(value.status);
          },
          error: err => {
            console.error(err);
          },
          complete: () => {
            console.log('Done');
          }
        }
      )
    }

  }

  protected readonly faCircleXmark = faCircleXmark;
  protected readonly faCirclePlus = faCirclePlus;
}
