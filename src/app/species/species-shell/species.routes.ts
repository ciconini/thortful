import { Routes } from '@angular/router';
import { SpeciesListComponent } from '../feature/species-list/species-list.component'
import { SpeciesDetailComponent } from '../feature/species-detail/species-detail.component'

export const speciesRoutes: Routes = [
    {
        path: "",
        component: SpeciesListComponent
    },
    {
        path: ":id",
        component: SpeciesDetailComponent
    }
];
