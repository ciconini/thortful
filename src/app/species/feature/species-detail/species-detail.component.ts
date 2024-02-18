import { Component, OnInit } from '@angular/core';
import { Species } from '../../util/model/species'
import { SpeciesService } from '../../data-access/species.service'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'
import { Title } from '@angular/platform-browser'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-species-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent, LoadingComponent],
  templateUrl: './species-detail.component.html',
  styleUrl: './species-detail.component.scss'
})
export class SpeciesDetailComponent implements OnInit {
  species: Species = {} as Species;
  sub: Subscription = new Subscription;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private readonly speciesService: SpeciesService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.sub = this.speciesService.getSpeciesDetail(params['id']).subscribe((resp: Species) => {
          this.species = resp;
          this.title.setTitle(`${resp.name} - Species - Star Wars wiki`);
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        })
      }
    })
  }

  bgImg(species: Species): string {
    return `url(${this.url.normalizeUrl(species.name.toLowerCase(), 'species')})`
  }
}
