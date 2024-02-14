import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core';
import { Species, SpeciesResponse } from '../../util/model/species'
import { Observable, Subscription } from 'rxjs'
import { SpeciesService } from '../../data-access/species.service'
import { SpeciesCardComponent } from '../../ui/species-card/species-card.component'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule, SpeciesCardComponent, PageTitleComponent, LoadingComponent, PaginationComponent],
  templateUrl: './species-list.component.html',
  styleUrl: './species-list.component.scss'
})
export class SpeciesListComponent implements OnInit {
  species: Species[] = [];
  speciesSub: Subscription = new Subscription;
  pageControl: PageControl = new PageControl;
  loading: boolean = true;

  constructor(
    private readonly speciesService: SpeciesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page']) {
        this.pageControl.page = Number(params['page']);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 1
          }
        })
      }
      this.speciesSub = this.speciesService.getSpecies(this.pageControl).subscribe((resp: SpeciesResponse) => {
        this.species = resp.results;
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/species"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.speciesSub.unsubscribe();
  }
}
