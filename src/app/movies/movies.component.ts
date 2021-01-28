import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Movie } from './class/movie.class';
import { FavouritesService } from './service/favourites.service';
import { MoviesService } from './service/movies.service';
import { any } from 'underscore';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  // Any property used in the view is public to stop AOT compilation problems.
  public movies: Movie[];
  public filteredMovies: Movie[];
  public showFavourites: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly movieService: MoviesService,
    private readonly favouritesService: FavouritesService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.queryParams
        .pipe(
          map((params: Params) => {
            this.showFavourites = params?.showFavourites
              ? JSON.parse(params?.showFavourites)
              : false;
          }),
          mergeMap(() => {
            return this.movieService.getMovies();
          }),
          map((result: Movie[]) => {
            this.movies = result;
          }),
          mergeMap(() => {
            return this.favouritesService.getFavourites();
          }),
          take(1)
        )
        .subscribe(
          (favourites: any[]) => {
            this.movies = this.movies.map((movie) => {
              movie.favourite = any(favourites, (x) => x.movie_id === movie.id);
              return movie;
            });
            this.applyFilters();
          },
          (e) => {
            console.error(e);
          }
        )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onToggleFilter(): void {
    this.applyFilters();
    this.updateQueryParams();
  }

  private applyFilters() {
    this.filteredMovies = this.movies.filter((movie) => {
      if (this.showFavourites) {
        return movie?.favourite === this.showFavourites;
      } else {
        return true;
      }
    });
  }

  private updateQueryParams() {
    const params: Params = this.showFavourites
      ? { showFavourites: this.showFavourites }
      : {};
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
    });
  }
}
