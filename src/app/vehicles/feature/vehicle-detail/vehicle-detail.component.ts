import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { VehiclesService } from '../../data-access/vehicles.service'
import { Vehicle } from '../../util/model/vehicle'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'
import { Title } from '@angular/platform-browser'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent, LoadingComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle = {} as Vehicle;
  sub: Subscription = new Subscription;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.sub = this.vehicleService.getVehicle(params['id']).subscribe((resp: Vehicle) => {
          this.vehicle = resp;
          this.title.setTitle(`${resp.name} - Vehicles - Star Wars wiki`);
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        })
      }
    })
  }

  bgImg(vehicle: Vehicle): string {
    return `url(${this.url.normalizeUrl(vehicle.name.toLowerCase(), 'vehicles')})`
  }
}
