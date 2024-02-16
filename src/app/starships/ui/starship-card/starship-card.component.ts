import { Component, Input } from '@angular/core';
import { Starship } from '../../util/model/starship'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'
import { UrlUtil } from '../../../shared/util/data-method/url'

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss'
})
export class StarshipCardComponent {
  @Input() starship!: Starship;
  @Input() index!: number;
  @Input() page!: number;

  imageUrl: string = "";

  constructor(
    private readonly util: ObjectId,
    public readonly url: UrlUtil
  ) { }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
