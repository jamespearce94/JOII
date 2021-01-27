import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarRatingComponent } from './components/star-rating.component';
import { MovieDetailComponent } from './movie-detail.component';

const routes: Routes = [
    {
        path: '',
        component: MovieDetailComponent,
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [MovieDetailComponent],
    declarations: [
        MovieDetailComponent,
        StarRatingComponent
    ],
    providers: [],
})
export class MovieDetailModule { }
