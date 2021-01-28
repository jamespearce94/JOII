import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Movie } from '../class/movie.class';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this.apiUrl = environment?.apiUrl;
  }

  public getMovies(): Observable<Movie[]> {
    return this.httpClient
      .get(`${this.apiUrl}/discover/movie`, {
        params: {
          api_key: environment.apiKey, // ideally the api key would be added to all requests using an intercept.
          sort_by: 'popularity.desc',
        },
      })
      .pipe(
        map((result: any) => {
          if (result && result?.results?.length > 0) {
            result.results = result.results.map((movie: any) => {
              // movie is set to type any it is unknown until it is instantiated into a movie class.
              return new Movie(movie);
            });
          }
          return result?.results;
        })
      );
  }

  /*
      I found this end point using the themoviedb documentation. I used this end point as I used a seperate route for the details page.
      The benefit of using this is direct hits to specific movies do not have to pull the entire movies list.
   */
  public getMovie(id: number): Observable<Movie> {
    return this.httpClient
      .get(`${this.apiUrl}/movie/${id}`, {
        params: {
          api_key: environment.apiKey,
        },
      })
      .pipe(
        map((result: any) => {
          return new Movie(result);
        })
      );
  }
}
