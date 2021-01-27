import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
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
    ],
    exports: [MoviesComponent],
    declarations: [
        MoviesComponent,
        MovieListItemComponent
    ],
    providers: [],
})
export class MoviesModule { }
