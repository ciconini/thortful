import { Component, Input } from '@angular/core';
import { Card } from '../../util/model/card'
import { ObjectId } from '../../util/data-method/object-id'
import { UrlUtil } from '../../util/data-method/url'
import { RouterModule } from '@angular/router'
import { ImgFallbackDirective } from '../../util/directives/imageFallback'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cardData!: Card;
  @Input() index!: number;
  @Input() page!: number;

  constructor(
    private readonly util: ObjectId,
    public readonly url: UrlUtil
  ) {}

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
