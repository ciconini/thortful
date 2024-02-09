import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../../util/model/people'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/method/object-id'

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() person!: Person;
  @Input() index!: number;
  @Input() page!: number;

  constructor(
    private readonly util: ObjectId
  ) { }

  normalizeUrl(name: string): string {
    return "assets/images/people/" + name.toLowerCase().replace(/ /g, "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
