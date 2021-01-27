import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class FavouritesService {
      constructor(private readonly dbService: NgxIndexedDBService) {

      }

      public getFavourites(): Observable<any[]> {
        return this.dbService.getAll("favourites");
      }

      public addFavourite(movie_id: number) {
        return this.dbService.add('favourites',{
            movie_id: movie_id
        });
      }

      public removeFavourite(favourite_id: number) {
        return this.dbService.delete('favourites', favourite_id);
      }

  }