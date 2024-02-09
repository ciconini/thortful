import { Routes } from '@angular/router';
import { PlanetListComponent } from '../feature/planet-list/planet-list.component'
import { PlanetDetailComponent } from '../feature/planet-detail/planet-detail.component'

export const planetRoutes: Routes = [
    {
        path: "",
        component: PlanetListComponent
    },
    {
        path: ":id",
        component: PlanetDetailComponent
    }
];
