import { Routes } from '@angular/router';
import { FilmListComponent } from '../feature/film-list/film-list.component'
import { FilmDetailComponent } from '../feature/film-detail/film-detail.component'

export const filmRoutes: Routes = [
    {
        path: "",
        component: FilmListComponent
    },
    {
        path: ":id",
        component: FilmDetailComponent
    }
];
