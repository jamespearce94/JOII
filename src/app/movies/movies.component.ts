import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Movie } from './class/movie.class';
import { FavouritesService } from './service/favourites.service';
import { MoviesService } from './service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  public movies: Movie[];
  public favourites: number[];
  public showFavourites: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly movieService: MoviesService,
    private readonly favouritesService: FavouritesService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.movieService.getMovies().pipe(
      map((result: Movie[]) => {
        this.movies = result
      }),
      mergeMap(() => {
        return this.favouritesService.getFavourites();
      })
    ).subscribe((result: any[]) => {
        this.favourites = result?.map((x) => x?.movie_id);
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
