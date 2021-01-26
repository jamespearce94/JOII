import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    declarations: [MovieDetailComponent],
    providers: [],
})
export class MovieDetailModule { }
