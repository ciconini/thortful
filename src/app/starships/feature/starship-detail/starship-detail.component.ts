import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { StarshipsService } from '../../data-access/starships.service'
import { Starship } from '../../util/model/starship'

@Component({
  selector: 'app-starship-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starship-detail.component.html',
  styleUrl: './starship-detail.component.scss'
})
export class StarshipDetailComponent implements OnInit {
  starship$!: Observable<Starship>;

  constructor(
    private readonly starshipService: StarshipsService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.starship$ = this.starshipService.getStarship(params['id'])
      }
    })
  }
}
