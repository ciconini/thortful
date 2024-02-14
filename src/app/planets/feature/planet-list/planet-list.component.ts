import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planet, PlanetResponse } from '../../util/model/planet'
import { Observable, Subscription } from 'rxjs'
import { PlanetService } from '../../data-access/planet.service'
import { PlanetCardComponent } from '../../ui/planet-card/planet-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [
    CommonModule, 
    PlanetCardComponent, 
    PageTitleComponent, 
    LoadingComponent,
    PaginationComponent
  ],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent implements OnInit, OnDestroy {
  planets: Planet[] = [];
  planetSub: Subscription = new Subscription;
  pageControl: PageControl = new PageControl;
  loading: boolean = true;

  constructor(
    private readonly planetService: PlanetService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
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
      this.planetSub = this.planetService.getPlanets(this.pageControl).subscribe((resp: PlanetResponse) => {
        this.planets = resp.results;
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/planets"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.planetSub.unsubscribe();
  }

  
}
