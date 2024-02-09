import { Routes } from '@angular/router';
import { StarshipsListComponent } from '../feature/starships-list/starships-list.component'
import { StarshipDetailComponent } from '../feature/starship-detail/starship-detail.component'

export const starshipRoutes: Routes = [
    {
        path: "",
        component: StarshipsListComponent
    },
    {
        path: ":id",
        component: StarshipDetailComponent
    }
];
