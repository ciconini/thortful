import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/ui/layout/layout.component'
import { planetRoutes } from './planets/planet-shell/planet.routes'

export const routes: Routes = [
    {
        path: "planets",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "films",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "people",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "starships",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "vehicles",
        component: LayoutComponent,
        children: planetRoutes
    },
    {
        path: "species",
        component: LayoutComponent,
        children: planetRoutes
    },
];
