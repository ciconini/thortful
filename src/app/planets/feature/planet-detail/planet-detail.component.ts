import { Component, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { PlanetService } from '../../data-access/planet.service'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent implements OnInit {
  planet$!: Observable<Planet>;

  constructor(
    private readonly planetService: PlanetService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.planet$ = this.planetService.getPlanet(params['id'])
      }
    })
  }

  bgImg(planet: Planet): string {
    return `url(${this.url.normalizeUrl(planet.name.toLowerCase(), 'planets')})`
  }
}
