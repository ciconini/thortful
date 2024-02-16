import { Component, OnInit } from '@angular/core';
import { Species } from '../../util/model/species'
import { SpeciesService } from '../../data-access/species.service'
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'

@Component({
  selector: 'app-species-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NotFoundComponent],
  templateUrl: './species-detail.component.html',
  styleUrl: './species-detail.component.scss'
})
export class SpeciesDetailComponent implements OnInit {
  species$!: Observable<Species>;

  constructor(
    private readonly speciesService: SpeciesService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.species$ = this.speciesService.getSpeciesDetail(params['id'])
      }
    })
  }

  bgImg(species: Species): string {
    return `url(${this.url.normalizeUrl(species.name.toLowerCase(), 'species')})`
  }
}
