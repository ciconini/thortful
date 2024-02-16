import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { StarshipsService } from '../../data-access/starships.service'
import { Starship } from '../../util/model/starship'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'

@Component({
  selector: 'app-starship-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './starship-detail.component.html',
  styleUrl: './starship-detail.component.scss'
})
export class StarshipDetailComponent implements OnInit {
  starship$!: Observable<Starship>;

  constructor(
    private readonly starshipService: StarshipsService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.starship$ = this.starshipService.getStarship(params['id'])
      }
    })
  }

  bgImg(starship: Starship): string {
    return `url(${this.url.normalizeUrl(starship.name.toLowerCase(), 'starships')})`
  }
}
