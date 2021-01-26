import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { MoviesModule } from '../movies.module';
import { IMovie, IMovieResult } from './movies.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
      this.apiUrl = environment?.apiUrl;
   }

   public getMovies(): Observable<IMovie[]> {
      return this.httpClient.get(this.apiUrl).pipe(
        map((result: any) => {
          if (result && result?.results?.length > 0) {
            result.results = result.results.map((movie: any) => {
                return {
                  adult: movie?.adult,
                  backdrop_path: movie?.backdrop_path,
                  genre_ids: movie?.genre_ids,
                  id: movie?.id,
                  original_language: movie?.original_language,
                  original_title: movie?.original_title,
                  overview: movie?.overview,
                  popularity: movie?.popularity,
                  poster_path: movie?.poster_path,
                  release_date: new Date(movie?.release_date),
                  title: movie?.title,
                  video: movie?.video,
                  vote_average: movie?.vote_average,
                  vote_count: movie?.vote_count
                } as IMovie;
            });
          }
          return result?.results;
        })
      )
   }


}
