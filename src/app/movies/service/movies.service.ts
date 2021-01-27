import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IMovie } from './movies.interfaces';
import { Movie } from '../class/movie.class';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
      this.apiUrl = environment?.apiUrl;
   }

   public getMovies(): Observable<IMovie[]> {
      return this.httpClient.get(
        `${this.apiUrl}/discover/movie`,
        {
          params: {
            api_key: environment.apiKey,
            sort_by: 'popularity.desc'
          }
        }
        ).pipe(
        map((result: any) => {
          if (result && result?.results?.length > 0) {
            result.results = result.results.map((movie: any) => {
                return new Movie(movie);
            });
          }
          return result?.results;
        })
      )
   }

   public getMovie(id: number): Observable<Movie> {
    return this.httpClient.get(
      `${this.apiUrl}/movie/${id}`,
      {
        params: {
          api_key: environment.apiKey,
        }
      }
      ).pipe(
        map((result: any) => {
          return new Movie(result);
        }
      ));
   }
}
