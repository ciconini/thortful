import { TestBed } from '@angular/core/testing';

import { PlanetService } from './planet.service';
import { environment } from '../../../environments/environment.development'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PageControl } from '../../shared/util/model/page-control'
import { Planet, PlanetResponse } from '../util/model/planet'
import { PLANETS } from './planets-mock'

describe('PlanetService', () => {
  let service: PlanetService,
    httpTestingController: HttpTestingController,
    planets = PLANETS,
    pageControl = new PageControl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PlanetService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlanetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get planets list', () => {
    service.getPlanets(pageControl).subscribe((planets: PlanetResponse) => {
      expect(planets).withContext("get planet list").toBeTruthy();
      expect(planets.count).withContext("count greater than 0").toBeGreaterThan(0);
      expect(planets.results.length).withContext("planet quantity greater than 0").toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.api}/planets?page=${pageControl.page}`);

    expect(req.request.method).toEqual("GET");

    req.flush(planets);
  });

  it('should get single planet data', () => {
    service.getPlanet('1').subscribe((planet: Planet) => {
      expect(planet).withContext("get planet data").toBeTruthy();
      expect(planet.name).withContext("get correct planet data").toEqual("Tatooine");
    });

    const req = httpTestingController.expectOne(`${environment.api}/planets/1`);

    expect(req.request.method).toEqual("GET");

    req.flush(planets.results[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
