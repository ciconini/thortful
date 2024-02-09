import { Routes } from '@angular/router';
import { PeopleListComponent } from '../feature/people-list/people-list.component'
import { PersonDetailComponent } from '../feature/person-detail/person-detail.component'

export const peopleRoutes: Routes = [
    {
        path: "",
        component: PeopleListComponent
    },
    {
        path: ":id",
        component: PersonDetailComponent
    }
];
