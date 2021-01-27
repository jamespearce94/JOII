import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../class/movie.class';

@Component({
    selector: 'app-movie-list-item',
    templateUrl: './movie-list-item.component.html',
    styleUrls: ['./movie-list-item.component.scss']
})

export class MovieListItemComponent implements OnInit {

    @Input() public movie: Movie;

    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }

    public onViewDetail(id: number) {
        this.router.navigate([`/movies/${id}`]);
    }
}