import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { StarshipsService } from './starships.service';
import { PageControl } from "../../shared/util/model/page-control"
import { Starship, StarshipResponse } from "../util/model/starship"
import { environment } from "../../../environments/environment.development"
import { STARSHIPS } from "./starships-mock";

describe('StarshipService', () => {
  let service: StarshipsService,
    httpTestingController: HttpTestingController,
    starships = STARSHIPS,
    pageControl = new PageControl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ StarshipsService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(StarshipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get starships list', () => {
    service.getStarships(pageControl).subscribe((starships: StarshipResponse) => {
      expect(starships).withContext("get starship list").toBeTruthy();
      expect(starships.count).withContext("count greater than 0").toBeGreaterThan(0);
      expect(starships.results.length).withContext("starship quantity greater than 0").toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.api}/starships?page=${pageControl.page}`);

    expect(req.request.method).toEqual("GET");

    req.flush(starships);
  });

  it('should get single starship data', () => {
    service.getStarship('1').subscribe((starship: Starship) => {
      expect(starship).withContext("get starship data").toBeTruthy();
      expect(starship.name).withContext("get correct starship data").toEqual("CR90 corvette");
    });

    const req = httpTestingController.expectOne(`${environment.api}/starships/1`);

    expect(req.request.method).toEqual("GET");

    req.flush(starships.results[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
