import { Component, Input } from '@angular/core';
import { Planet } from '../../util/model/planet'

@Component({
  selector: 'app-planet-card',
  standalone: true,
  imports: [],
  templateUrl: './planet-card.component.html',
  styleUrl: './planet-card.component.scss'
})
export class PlanetCardComponent {
  @Input() planet!: Planet;


  normalizeUrl(name: string): string {
    return "assets/images/planets/" + name.toLowerCase().replace(" ", "-") + ".jpg";
  }

}
