import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { FilmService } from '../../data-access/film.service'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Film, FilmResponse } from '../../util/model/film'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import { CardComponent } from '../../../shared/ui/card/card.component'
import { Card } from '../../../shared/util/model/card'

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    PageTitleComponent, 
    LoadingComponent, 
    PaginationComponent
  ],
  templateUrl: './film-list.component.html',
  styleUrl: './film-list.component.scss'
})
export class FilmListComponent implements OnInit, OnDestroy {
  films: Film[] = [];
  filmSub: Subscription = new Subscription;
  pageControl: PageControl = new PageControl;
  loading: boolean = true;
  cards: Card[] = [];

  constructor(
    private readonly planetService: FilmService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page']) {
        this.pageControl.page = Number(params['page']);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 1
          }
        })
      }
      this.filmSub = this.planetService.getFilms(this.pageControl).subscribe((resp: FilmResponse) => {
        this.cards = resp.results.map((e) => {
          return {
            name: e.title,
            type: 'films'
          }
        })
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/films"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.filmSub.unsubscribe();
  }
}
