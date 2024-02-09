import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { PeopleService } from '../../data-access/people.service'
import { PersonCardComponent } from '../../ui/person-card/person-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params } from '@angular/router'
import { Person } from '../../util/model/people'

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, PersonCardComponent],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss'
})
export class PeopleListComponent implements OnInit {
  people$!: Observable<Person[]>;
  pageControl: PageControl;

  constructor(
    private readonly peopleService: PeopleService,
    private readonly route: ActivatedRoute
  ) {
    this.pageControl = {page: 1}
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page'])
        this.pageControl.page = params['page']
      this.people$ = this.peopleService.getPeople(this.pageControl);
    })
  }
}
