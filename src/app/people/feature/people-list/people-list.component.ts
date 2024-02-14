import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { PeopleService } from '../../data-access/people.service'
import { PersonCardComponent } from '../../ui/person-card/person-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { PeopleResponse, Person } from '../../util/model/people'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, PersonCardComponent, PageTitleComponent, LoadingComponent, PaginationComponent],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss'
})
export class PeopleListComponent implements OnInit, OnDestroy {
  people: Person[] = [];
  pageControl: PageControl = new PageControl;
  peopleSub: Subscription = new Subscription;
  loading: boolean = true;

  constructor(
    private readonly peopleService: PeopleService,
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
      this.peopleSub = this.peopleService.getPeople(this.pageControl).subscribe((resp: PeopleResponse) => {
        this.people = resp.results;
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/people"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.peopleSub.unsubscribe();
  }
}
