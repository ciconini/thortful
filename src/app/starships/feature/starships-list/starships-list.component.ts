import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { StarshipsService } from '../../data-access/starships.service'
import { StarshipCardComponent } from '../../ui/starship-card/starship-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Starship, StarshipResponse } from '../../util/model/starship'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [CommonModule, StarshipCardComponent, PageTitleComponent, LoadingComponent, PaginationComponent],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.scss'
})
export class StarshipsListComponent implements OnInit {
  starships: Starship[] = [];
  starshipSub: Subscription = new Subscription;
  pageControl: PageControl = new PageControl;
  loading: boolean = true;

  constructor(
    private readonly starshipsService: StarshipsService,
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
      this.starshipSub = this.starshipsService.getStarships(this.pageControl).subscribe((resp: StarshipResponse) => {
        this.starships = resp.results;
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
