import { Routes } from '@angular/router';
import { FilmListComponent } from '../feature/starships-list/starships-list.component'
import { FilmDetailComponent } from '../feature/starship-detail/starship-detail.component'

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
