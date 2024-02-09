import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { PeopleService } from '../../data-access/people.service'
import { Person } from '../../util/model/people'

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {
  person$!: Observable<Person>;

  constructor(
    private readonly peopleService: PeopleService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.person$ = this.peopleService.getPerson(params['id'])
      }
    })
  }
}
