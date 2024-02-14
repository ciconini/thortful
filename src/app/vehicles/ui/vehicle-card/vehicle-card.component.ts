import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../../util/model/vehicle'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'

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
    private readonly util: ObjectId
  ) { }

  normalizeUrl(name: string): string {
    return "assets/images/vehicles/" + name.toLowerCase().replace(/ /g, "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
