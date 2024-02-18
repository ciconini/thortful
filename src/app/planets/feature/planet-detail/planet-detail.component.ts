import { Component, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { PlanetService } from '../../data-access/planet.service'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'
import { Title } from '@angular/platform-browser'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent, LoadingComponent],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent implements OnInit {
  planet: Planet = {} as Planet;
  sub: Subscription = new Subscription;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private readonly planetService: PlanetService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.sub = this.planetService.getPlanet(params['id']).subscribe((resp: Planet) => {
          this.planet = resp;
          this.title.setTitle(`${resp.name} - Planets - Star Wars wiki`);
          this.loading = false;
        },
        err => {
          this.error = true;
          this.loading = false;
        })
      }
    })
  }

  bgImg(planet: Planet): string {
    return `url(${this.url.normalizeUrl(planet.name.toLowerCase(), 'planets')})`
  }
}
