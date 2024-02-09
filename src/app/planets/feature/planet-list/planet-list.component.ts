import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { Observable } from 'rxjs'
import { PlanetService } from '../../data-access/planet.service'
import { PlanetCardComponent } from '../../ui/planet-card/planet-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params } from '@angular/router'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, PlanetCardComponent, PageTitleComponent, LoadingComponent],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent implements OnInit {
  planets$!: Observable<Planet[]>;
  pageControl: PageControl;

  constructor(
    private readonly planetService: PlanetService,
    private readonly route: ActivatedRoute
  ) {
    this.pageControl = {page: 1}
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page'])
        this.pageControl.page = params['page']
      this.planets$ = this.planetService.getPlanets(this.pageControl);
    })
  }
}
