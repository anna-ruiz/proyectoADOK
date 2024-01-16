import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {MovieDto} from "./dto/movie.dto/movie.dto";
import {Movie} from "./interfaces/movie/movie.interface";

@Controller('api/movies')
export class MoviesController {

    constructor(private readonly movieService: MoviesService) {
    }


 /*   @Post('')
    async create(@Body() movieDto: MovieDto){
        return this.movieService.create(movieDto);
    }*/

    @Post('')
    async create(@Body() movieDto: MovieDto){
       try {
           const movie: Movie = await this.movieService.create(movieDto);
           return{
               status: 'Pelicula insertada con éxito'
           }
       }catch (e){
           return {status: e.message}
       }
    }

    @Get('')
    async getMovies(){
        try {
            return  await this.movieService.getMovies();
        }catch (e){
            return {status: e.message}
        }
    }

    @Get('')
    async getMovie(@Param('id')id: string){
        try {
             return await this.movieService.getMovie(id);
        }catch (e){
            return {status: e.message}
        }
    }


    @Patch('/:id')
    async updateMovie(
        @Param('id')id: string,
        @Body() movieDto: MovieDto
    ){
        try {
            await this.movieService.updateMovie(id,movieDto);
            return{
                status: 'Pelicula actualizada con éxito'
            }
        }catch (e){
            return {status: e.message}
        }
    }

    @Delete('/:id')
    async deleteMovie(@Param('id')id: string){
        try {
            const movie: Movie =  await this.movieService.deleteMovie(id)
            return{
                status: 'Pelicula borrada con éxito'
            }
        }catch (e){
            return {status: e.message}
        }
    }

    @Get('/byName/:name')
    async getMovieByName(@Param('name')name: string){
        try{
            return await this.movieService.getMovieByName(name);
        }catch(e){
           return { status: e.message}
        }
    }

   // @Get('')
   // async

}
