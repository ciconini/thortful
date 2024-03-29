import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Planet, PlanetResponse } from '../../util/model/planet'
import {  Subscription } from 'rxjs'
import { PlanetService } from '../../data-access/planet.service'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import { CardComponent } from '../../../shared/ui/card/card.component'
import { Card } from '../../../shared/util/model/card'
import { Title } from '@angular/platform-browser'
import { ObjectId } from '../../../shared/util/data-method/object-id'

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
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
  cards: Card[] = [];

  constructor(
    private readonly planetService: PlanetService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly objectUtil: ObjectId,
    private title: Title
  ) {
    this.title.setTitle(`Planets - ${this.title.getTitle()}`);
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
        this.getCards(this.planets);
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  private getCards(planets: Planet[]): void {
    this.cards = planets.map((e) => {
      return {
        id: this.objectUtil.getId(e.url),
        name: e.name,
        type: 'planets'
      }
    })
  }

  public goToPage(event:any): void {
    this.router.navigate(["/planets"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.planetSub.unsubscribe();
  }

  
}
