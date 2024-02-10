import { Component, Input, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'

@Component({
  selector: 'app-planet-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './planet-card.component.html',
  styleUrl: './planet-card.component.scss'
})
export class PlanetCardComponent {
  @Input() planet!: Planet;
  @Input() index!: number;
  @Input() page!: number;

  constructor(
    private readonly util: ObjectId
  ) { }

  normalizeUrl(name: string): string {
    return "assets/images/planets/" + name.toLowerCase().replace(" ", "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
