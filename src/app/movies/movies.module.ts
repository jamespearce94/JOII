import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteToggleModule } from '../shared/favourite-toggle/favourite-toggle.module';
import { MovieListItemComponent } from './components/movie-list-item/movie-list-item.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
    {
        path: '',
        component: MoviesComponent,
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        FavouriteToggleModule
    ],
    exports: [MoviesComponent],
    declarations: [
        MoviesComponent,
        MovieListItemComponent
    ],
    providers: [],
})
export class MoviesModule { }
