import { Component, Input, OnInit } from '@angular/core';
import { Starship } from '../../util/model/starship'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/method/object-id'

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss'
})
export class StarshipCardComponent {
  @Input() starship!: Starship;
  @Input() index!: number;
  @Input() page!: number;

  constructor(
    private readonly util: ObjectId
  ) { }

  normalizeUrl(name: string): string {
    return "assets/images/starships/" + name.toLowerCase().replace(/ /g, "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
