import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { VehiclesService } from '../../data-access/vehicles.service'
import { Vehicle } from '../../util/model/vehicle'

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  vehicle$!: Observable<Vehicle>;

  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.vehicle$ = this.vehicleService.getVehicle(params['id'])
      }
    })
  }
}
