import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { Observable } from 'rxjs'
import { PlanetService } from '../../data-access/planet.service'
import { PlanetCardComponent } from '../../ui/planet-card/planet-card.component'

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, PlanetCardComponent],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent implements OnInit {
  planets$!: Observable<Planet[]>;

  constructor(
    private readonly planetService: PlanetService
  ) {
    this.planets$ = this.planetService.getPlanets();
  }

  ngOnInit(): void {
    
  }
}
