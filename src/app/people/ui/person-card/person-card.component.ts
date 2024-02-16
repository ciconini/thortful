import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../util/model/people'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'
import { UrlUtil } from '../../../shared/util/data-method/url'

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() person!: Person;
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
