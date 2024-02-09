import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Species } from '../../util/model/species'
import { Observable } from 'rxjs'
import { SpeciesService } from '../../data-access/species.service'
import { SpeciesCardComponent } from '../../ui/species-card/species-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule, SpeciesCardComponent],
  templateUrl: './species-list.component.html',
  styleUrl: './species-list.component.scss'
})
export class SpeciesListComponent implements OnInit {
  species$!: Observable<Species[]>;
  pageControl: PageControl;

  constructor(
    private readonly speciesService: SpeciesService,
    private readonly route: ActivatedRoute
  ) {
    this.pageControl = {page: 1}
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page'])
        this.pageControl.page = params['page']
      this.species$ = this.speciesService.getSpecies(this.pageControl);
    })
  }
}
