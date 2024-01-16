import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import {MongooseModule} from "@nestjs/mongoose";
import {MovieSchema} from "./schemas/movie.schema/movie.schema";

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
      MongooseModule.forFeature([
        {
          name: 'Movie',
          schema: MovieSchema,
          collection: 'moviesNest' //especificamos el nombre de la nueva coleccion
        }
      ])
  ]
})
export class MoviesModule {}
