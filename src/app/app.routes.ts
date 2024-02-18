import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/ui/layout/layout.component'
import { planetRoutes } from './planets/shell/planet.routes'
import { filmRoutes } from './films/shell/film.routes'
import { starshipRoutes } from './starships/starship-shell/starship.routes'
import { vehicleRoutes } from './vehicles/shell/vehicle.routes'
import { speciesRoutes } from './species/species-shell/species.routes'
import { characterRoutes } from './characters/shell/character.routes'
import { homepageRoutes } from './homepage/shell/homepage.routes'

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: homepageRoutes
    },
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
        path: "characters",
        component: LayoutComponent,
        children: characterRoutes
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
        children: speciesRoutes
    },
];
