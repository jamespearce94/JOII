import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMovie, IMovieResult } from './service/movies.interfaces';
import { MoviesService } from './service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  public movies: IMovie[];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly movieService: MoviesService
  ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.movieService.getMovies().subscribe((result: IMovie[]) => {
        this.movies = result
    }));
  }

  public ngOnDestroy(): void {

  }
}
