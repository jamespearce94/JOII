import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MoviesService } from '../movies/service/movies.service';
import { map, mergeMap, take } from "rxjs/operators";
import { Movie } from '../movies/class/movie.class';
import { FavouritesService } from '../movies/service/favourites.service';

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
        })
      ).subscribe((movie: Movie) => {
        this.movie = movie;
      });
  };

  public onToggleFavourite() {
    if (this.movie?.favourite) {
      return this.favouritesService.getFavourites().pipe(
        take(1),
        mergeMap((favs) => {
          return this.favouritesService.removeFavourite(1);
        })
      ).subscribe()
    } else {
      this.favouritesService.addFavourite(this.movie?.id);
    }
  }
}
