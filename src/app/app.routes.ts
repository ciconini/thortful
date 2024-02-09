import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/ui/layout/layout.component'
import { planetRoutes } from './planets/shell/planet.routes'
import { filmRoutes } from './films/shell/film.routes'
import { starshipRoutes } from './starships/starship-shell/starship.routes'
import { vehicleRoutes } from './vehicles/shell/vehicle.routes'

export const routes: Routes = [
    {
        path: "planets",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "films",
        component: LayoutComponent,
        children: filmRoutes
    },
    {
        path: "people",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "starships",
        component: LayoutComponent,
        children: starshipRoutes
    },
    {
        path: "vehicles",
        component: LayoutComponent,
        children: vehicleRoutes
    },
    {
        path: "species",
        component: LayoutComponent,
        children: planetRoutes
    },
];
