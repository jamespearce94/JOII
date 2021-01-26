import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        RouterModule.forChild(routes)
    ],
    exports: [MoviesComponent],
    declarations: [MoviesComponent],
    providers: [],
})
export class MoviesModule { }
