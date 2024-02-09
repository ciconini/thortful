import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { FilmService } from '../../data-access/starships.service'
import { Film } from '../../util/model/starship'

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})
export class FilmDetailComponent implements OnInit {
  film$!: Observable<Film>;

  constructor(
    private readonly filmService: FilmService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.film$ = this.filmService.getFilm(params['id'])
      }
    })
  }
}
