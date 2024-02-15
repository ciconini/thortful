import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { FilmService } from '../../data-access/film.service'
import { Film } from '../../util/model/film'
import { Episode } from '../../../shared/util/data-method/episode'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})
export class FilmDetailComponent implements OnInit {
  film$!: Observable<Film>;

  constructor(
    private readonly filmService: FilmService,
    private readonly route: ActivatedRoute,
    public readonly episode: Episode,
    public readonly url: UrlUtil
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.film$ = this.filmService.getFilm(params['id'])
      }
    })
  }

  bgImg(film: Film): string {
    return `url(${this.url.normalizeUrl(film.title, 'films')})`
  }
}
