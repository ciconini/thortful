import { Component, Input, OnInit } from '@angular/core';
import { Planet } from '../../util/model/planet'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'
import { UrlUtil } from '../../../shared/util/data-method/url'

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
    private readonly util: ObjectId,
    public readonly url: UrlUtil
  ) { }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
