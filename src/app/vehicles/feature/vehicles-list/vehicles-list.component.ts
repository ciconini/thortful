import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { VehiclesService } from '../../data-access/vehicles.service'
import { VehicleCardComponent } from '../../ui/vehicle-card/vehicle-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params } from '@angular/router'
import { Vehicle } from '../../util/model/vehicle'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [CommonModule, VehicleCardComponent, PageTitleComponent, LoadingComponent],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss'
})
export class VehiclesListComponent implements OnInit {
  vehicles$!: Observable<Vehicle[]>;
  pageControl: PageControl;

  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly route: ActivatedRoute
  ) {
    this.pageControl = {page: 1}
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page'])
        this.pageControl.page = params['page']
      this.vehicles$ = this.vehicleService.getVehicles(this.pageControl);
    })
  }
}
