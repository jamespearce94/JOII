import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

/*
   Favourite object is simple to reduce the amount of local storage required
   and the only details required to favourite is the id.
*/
export interface IFavourite {
  id: number;
  movie_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private readonly dbService: NgxIndexedDBService) {}

  // Gets all favourited movies from the indexed-db
  public getFavourites(): Observable<IFavourite[]> {
    return this.dbService.getAll('favourites');
  }

  // Get a single movie from indexed-db using movie id provided from the themoviedb
  public getFavourite(movie_id: number): Observable<IFavourite> {
    return this.dbService.getByIndex('favourites', 'movie_id', movie_id);
  }

  // Creates single record on indexed-db
  public addFavourite(movie_id: number): Observable<number> {
    return this.dbService.add('favourites', {
      movie_id: movie_id,
    });
  }

  // Ideally I would want to use the movie_id to delete but limitation of the library requires the records id.
  public removeFavourite(favourite_id: number): Observable<IFavourite[]> {
    return this.dbService.delete('favourites', favourite_id);
  }
}
