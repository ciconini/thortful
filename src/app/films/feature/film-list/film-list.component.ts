import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { FilmService } from '../../data-access/film.service'
import { FilmCardComponent } from '../../ui/film-card/film-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params } from '@angular/router'
import { Film } from '../../util/model/film'

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [CommonModule, FilmCardComponent],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent implements OnInit {
  films$!: Observable<Film[]>;
  pageControl: PageControl;

  constructor(
    private readonly planetService: FilmService,
    private readonly route: ActivatedRoute
  ) {
    this.pageControl = {page: 1}
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page'])
        this.pageControl.page = params['page']
      this.films$ = this.planetService.getFilms(this.pageControl);
    })
  }
}
