import { Component, Input } from '@angular/core';
import { Species } from '../../util/model/species'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/method/object-id'

@Component({
  selector: 'app-species-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './species-card.component.html',
  styleUrl: './species-card.component.scss'
})
export class SpeciesCardComponent {
  @Input() species!: Species;
  @Input() index!: number;
  @Input() page!: number;

  constructor(
    private readonly util: ObjectId
  ) { }

  normalizeUrl(name: string): string {
    return "assets/images/species/" + name.toLowerCase().replace(" ", "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
