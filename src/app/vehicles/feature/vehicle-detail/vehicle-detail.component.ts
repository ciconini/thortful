import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { VehiclesService } from '../../data-access/vehicles.service'
import { Vehicle } from '../../util/model/vehicle'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  vehicle$!: Observable<Vehicle>;

  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.vehicle$ = this.vehicleService.getVehicle(params['id'])
      }
    })
  }

  bgImg(vehicle: Vehicle): string {
    return `url(${this.url.normalizeUrl(vehicle.name.toLowerCase(), 'vehicles')})`
  }
}
