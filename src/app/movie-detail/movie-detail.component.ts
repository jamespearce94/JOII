import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies/service/movies.service';
import { map, mergeMap, take } from "rxjs/operators";
import { Movie } from '../movies/class/movie.class';
import { FavouritesService, IFavourite } from '../movies/service/favourites.service';
import { any } from 'underscore';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  public movieId: number;
  public movie: Movie;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly movieService: MoviesService,
    private readonly favouritesService: FavouritesService,
    private readonly route: ActivatedRoute
    ) { }

  public ngOnInit(): void {
      this.route.paramMap.pipe(
        map((params) => {
          this.movieId = +params.get('id');
        }),
        mergeMap((params) => {
          return this.movieService.getMovie(this.movieId);
        }),
        mergeMap((movie: Movie) => {
          this.movie = movie;
          return this.favouritesService.getFavourites();
        })
      ).subscribe((favourites: IFavourite[]) => {
        this.movie.favourite = any(favourites, (x) => x.movie_id === this.movie.id);
      });
  }

}
