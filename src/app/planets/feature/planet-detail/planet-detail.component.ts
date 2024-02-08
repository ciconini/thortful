import { Component, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { PlanetService } from '../../data-access/planet.service'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent implements OnInit {
  planet$!: Observable<Planet>;

  constructor(
    private readonly planetService: PlanetService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.planet$ = this.planetService.getPlanet(params['id'])
      }
    })
  }
}
