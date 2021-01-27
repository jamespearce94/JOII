import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { FavouritesService } from 'src/app/movies/service/favourites.service';

@Component({
    selector: 'sh-favourite-toggle',
    templateUrl: './favourite-toggle.component.html',
    styleUrls: ['./favourite-toggle.component.scss']
})

export class FavouriteToggleComponent implements OnInit {

    @Input() public selected: boolean;
    @Input() public movieId: number;
    @Input() public readonly: boolean = false;
    @Input() public size: number = 20;

    constructor(private readonly favouritesService: FavouritesService) { }

    public ngOnInit(): void { }

    public onToggle(event: Event) {
        if (this.readonly) {
            return;
        }

        let update: Observable<any>;
        if (this.selected) {
            update = this.favouritesService.getFavourites().pipe(
                mergeMap((favourites: any[]) => {
                  let favourite = favourites?.find((x) => x.movie_id === this.movieId);
                  if (!favourite) {
                      return of([]);
                  }
                  return this.favouritesService.removeFavourite(favourite?.id);
                })
              )
        } else {
            update = this.favouritesService.addFavourite(this.movieId);
        }

        update.pipe(take(1)).subscribe();
        this.selected = !this.selected;
    }
}