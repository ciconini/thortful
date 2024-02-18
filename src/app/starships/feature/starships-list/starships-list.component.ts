import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { StarshipsService } from '../../data-access/starships.service'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Starship, StarshipResponse } from '../../util/model/starship'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import { CardComponent } from '../../../shared/ui/card/card.component'
import { Card } from '../../../shared/util/model/card'
import { Title } from '@angular/platform-browser'
import { ObjectId } from '../../../shared/util/data-method/object-id'

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    PageTitleComponent, 
    LoadingComponent, 
    PaginationComponent
  ],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.scss'
})
export class StarshipsListComponent implements OnInit {
  starships: Starship[] = [];
  starshipSub: Subscription = new Subscription;
  pageControl: PageControl = new PageControl;
  loading: boolean = true;
  cards: Card[] = [];

  constructor(
    private readonly starshipsService: StarshipsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly objectUtil: ObjectId,
    private title: Title
  ) {
    this.title.setTitle(`Starships - Star Wars wiki`);
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
      this.starshipSub = this.starshipsService.getStarships(this.pageControl).subscribe((resp: StarshipResponse) => {
        this.cards = resp.results.map((e) => {
          return {
            id: this.objectUtil.getId(e.url),
            name: e.name,
            type: 'starships'
          }
        });
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/starships"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.starshipSub.unsubscribe();
  }
}
