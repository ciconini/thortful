import { Routes } from '@angular/router';
import { VehiclesListComponent } from '../feature/vehicles-list/vehicles-list.component'
import { VehicleDetailComponent } from '../feature/vehicle-detail/vehicle-detail.component'

export const vehicleRoutes: Routes = [
    {
        path: "",
        component: VehiclesListComponent
    },
    {
        path: ":id",
        component: VehicleDetailComponent
    }
];
