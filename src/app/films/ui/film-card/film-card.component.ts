import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../util/model/film'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { UrlUtil } from '../../../shared/util/data-method/url'

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
    private readonly util: ObjectId,
    public readonly url: UrlUtil
  ) { }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
