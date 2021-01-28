import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*
  Lazy loaded routes to ensure small bundle on first time load.
*/

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'movies/:id',
    loadChildren: () =>
      import('./movie-detail/movie-detail.module').then(
        (m) => m.MovieDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
