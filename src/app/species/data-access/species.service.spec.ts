import { TestBed } from '@angular/core/testing';

import { SpeciesService } from './species.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Species, SpeciesResponse } from '../util/model/species'
import { PageControl } from '../../shared/util/model/page-control'
import { environment } from '../../../environments/environment.development'
import { SPECIES } from './species-mock'

describe('SpeciesService', () => {
  let service: SpeciesService,
    httpTestingController: HttpTestingController,
    species = SPECIES,
    pageControl = new PageControl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SpeciesService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SpeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get species list', () => {
    service.getSpecies(pageControl).subscribe((species: SpeciesResponse) => {
      expect(species).withContext("get species list").toBeTruthy();
      expect(species.count).withContext("count greater than 0").toBeGreaterThan(0);
      expect(species.results.length).withContext("species quantity greater than 0").toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.api}/species?page=${pageControl.page}`);

    expect(req.request.method).toEqual("GET");

    req.flush(species);
  });

  it('should get single species data', () => {
    service.getSpeciesDetail('1').subscribe((species: Species) => {
      expect(species).withContext("get species data").toBeTruthy();
      expect(species.name).withContext("get correct species data").toEqual("Human");
    });

    const req = httpTestingController.expectOne(`${environment.api}/species/1`);

    expect(req.request.method).toEqual("GET");

    req.flush(species.results[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
