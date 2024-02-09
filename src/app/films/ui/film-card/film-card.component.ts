import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../util/model/film'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/method/object-id'

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss'
})
export class FilmCardComponent {
  @Input() film!: Film;
  @Input() index!: number;
  @Input() page!: number;

  constructor(
    private readonly util: ObjectId
  ) { }

  normalizeUrl(name: string): string {
    return "assets/images/films/" + name.toLowerCase().replace(/ /g, "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
