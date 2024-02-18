import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { VehiclesService } from '../../data-access/vehicles.service'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Vehicle, VehicleResponse } from '../../util/model/vehicle'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import { Card } from '../../../shared/util/model/card'
import { CardComponent } from '../../../shared/ui/card/card.component'
import { Title } from '@angular/platform-browser'
import { ObjectId } from '../../../shared/util/data-method/object-id'

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    PageTitleComponent, 
    LoadingComponent, 
    PaginationComponent
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.scss'
})
export class VehiclesListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleSub: Subscription = new Subscription;
  pageControl: PageControl = new PageControl;
  loading: boolean = true;
  cards: Card[] = [];

  constructor(
    private readonly vehicleService: VehiclesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly objectUtil: ObjectId,
    private title: Title
  ) {
    this.title.setTitle(`Vehicles - Star Wars wiki`);
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page']) {
        this.pageControl.page = Number(params['page']);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 1
          }
        })
      }
      this.vehicleSub = this.vehicleService.getVehicles(this.pageControl).subscribe((resp: VehicleResponse) => {
        this.cards = resp.results.map((e) => {
          return {
            id: this.objectUtil.getId(e.url),
            name: e.name,
            type: 'vehicles',
          }
        });
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/vehicles"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.vehicleSub.unsubscribe();
  }
}
