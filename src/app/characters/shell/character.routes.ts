import { Routes } from '@angular/router';
import { CharacterListComponent } from '../feature/character-list/character-list.component'
import { CharacterDetailComponent } from '../feature/character-detail/character-detail.component'

export const characterRoutes: Routes = [
    {
        path: "",
        component: CharacterListComponent
    },
    {
        path: ":id",
        component: CharacterDetailComponent
    }
];
