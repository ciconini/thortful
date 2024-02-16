import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { PeopleService } from '../../data-access/people.service'
import { Person } from '../../util/model/people'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.scss'
})
export class PersonDetailComponent implements OnInit {
  person$!: Observable<Person>;

  constructor(
    private readonly peopleService: PeopleService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.person$ = this.peopleService.getPerson(params['id'])
      }
    })
  }

  bgImg(person: Person): string {
    return `url(${this.url.normalizeUrl(person.name, 'people')})`
  }
}
