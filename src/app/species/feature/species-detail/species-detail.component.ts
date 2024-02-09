import { Component, OnInit } from '@angular/core';
import { Species } from '../../util/model/species'
import { SpeciesService } from '../../data-access/species.service'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-species-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './species-detail.component.html',
  styleUrl: './species-detail.component.scss'
})
export class SpeciesDetailComponent implements OnInit {
  species$!: Observable<Species>;

  constructor(
    private readonly speciesService: SpeciesService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.species$ = this.speciesService.getSpeciesDetail(params['id'])
      }
    })
  }
}
