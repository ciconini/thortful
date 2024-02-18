import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { StarshipsService } from '../../data-access/starships.service'
import { Starship } from '../../util/model/starship'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-starship-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent, LoadingComponent],
  templateUrl: './starship-detail.component.html',
  styleUrl: './starship-detail.component.scss'
})
export class StarshipDetailComponent implements OnInit {
  starship: Starship = {} as Starship;
  sub: Subscription = new Subscription;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private readonly starshipService: StarshipsService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.sub = this.starshipService.getStarship(params['id']).subscribe((resp: Starship) => {
          this.starship = resp;
          this.title.setTitle(`${resp.name} - Starships - Star Wars wiki`);
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        })
      }
    })
  }

  bgImg(starship: Starship): string {
    return `url(${this.url.normalizeUrl(starship.name.toLowerCase(), 'starships')})`
  }
}
