import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../util/model/vehicle'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'
import { UrlUtil } from '../../../shared/util/data-method/url'

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss'
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
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
