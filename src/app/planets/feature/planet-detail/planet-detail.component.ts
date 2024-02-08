import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Planet } from '../../util/model/planet'
import { PlanetService } from '../../data-access/planet.service'

@Component({
  selector: 'app-planet-detail',
  standalone: true,
  imports: [],
  templateUrl: './planet-detail.component.html',
  styleUrl: './planet-detail.component.scss'
})
export class PlanetDetailComponent implements OnInit {
  planets$!: Observable<Planet[]>;

  constructor(
    private readonly planetService: PlanetService
  ) {
    this.planets$ = this.planetService.getPlanets();
  }

  ngOnInit(): void {
    
  }
}
