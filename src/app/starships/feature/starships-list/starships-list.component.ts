import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { StarshipsService } from '../../data-access/starships.service'
import { StarshipCardComponent } from '../../ui/starship-card/starship-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params } from '@angular/router'
import { Starship } from '../../util/model/starship'

@Component({
  selector: 'app-starships-list',
  standalone: true,
  imports: [CommonModule, StarshipCardComponent],
  templateUrl: './starships-list.component.html',
  styleUrl: './starships-list.component.scss'
})
export class StarshipsListComponent implements OnInit {
  starships$!: Observable<Starship[]>;
  pageControl: PageControl;

  constructor(
    private readonly starshipsService: StarshipsService,
    private readonly route: ActivatedRoute
  ) {
    this.pageControl = {page: 1}
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page'])
        this.pageControl.page = params['page']
      this.starships$ = this.starshipsService.getStarships(this.pageControl);
    })
  }
}
