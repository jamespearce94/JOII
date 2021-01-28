import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MoviesService } from '../movies/service/movies.service';
import { map, mergeMap, take } from 'rxjs/operators';
import { Movie } from '../movies/class/movie.class';
import {
  FavouritesService,
  IFavourite,
} from '../movies/service/favourites.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  // Any property used in the view is public to stop AOT compilation problems.
  public movieId: number;
  public movie: Movie;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly movieService: MoviesService,
    private readonly favouritesService: FavouritesService,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap
        .pipe(
          map((params) => {
            this.movieId = +params.get('id');
          }),
          mergeMap(() => {
            return this.movieService.getMovie(this.movieId);
          }),
          mergeMap((movie: Movie) => {
            this.movie = movie;
            return this.favouritesService.getFavourite(this.movie?.id);
          })
        )
        .subscribe(
          (favourite: IFavourite) => {
            if (favourite && isFinite(favourite?.movie_id)) {
              this.movie.favourite = favourite?.movie_id === this.movie.id;
            }
          },
          (e) => {
            console.error(e);
          }
        )
    );
  }

  public ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  // Mutation done in smart component from event called in presentational component.
  public onFavouriteChange(selected: boolean) {
    let update: Observable<any>;
    if (selected) {
      update = this.favouritesService.addFavourite(this.movieId);
    } else {
      update = this.favouritesService.getFavourite(this.movie?.id).pipe(
        mergeMap((favourite: IFavourite) => {
          if (!favourite) {
            return of({});
          }
          return this.favouritesService.removeFavourite(favourite?.id);
        })
      );
    }

    this.subscriptions.add(
      update.pipe(take(1)).subscribe(
        () => {
          this.movie.favourite = selected;
        },
        (e) => {
          console.error(e);
        }
      )
    );
  }
}
