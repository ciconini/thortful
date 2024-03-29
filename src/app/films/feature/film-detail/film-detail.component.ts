import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { FilmService } from '../../data-access/film.service'
import { Film } from '../../util/model/film'
import { Episode } from '../../../shared/util/data-method/episode'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [
    CommonModule, 
    LoadingComponent, 
    RouterModule, 
    NotFoundComponent
  ],
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.scss'
})
export class FilmDetailComponent implements OnInit, OnDestroy {
  film: Film = {} as Film;
  sub: Subscription = new Subscription;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private readonly filmService: FilmService,
    private readonly route: ActivatedRoute,
    public readonly episode: Episode,
    public readonly url: UrlUtil,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.sub = this.filmService.getFilm(params['id']).subscribe((resp: Film) => {
          this.film = resp;
          this.title.setTitle(`${resp.title} - Films - Star Wars wiki`);
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        });
      }
    })
  }

  bgImg(film: Film): string {
    return `url(${this.url.normalizeUrl(film.title, 'films')})`
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
