import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { FilmService } from './film.service';
import { PageControl } from "../../shared/util/model/page-control"
import { Film, FilmResponse } from "../util/model/film"
import { environment } from "../../../environments/environment.development"
import { FILMS } from "./films-mock";

describe('FilmService', () => {
  let service: FilmService,
    httpTestingController: HttpTestingController,
    films = FILMS,
    pageControl = new PageControl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FilmService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get films list', () => {
    service.getFilms(pageControl).subscribe((films: FilmResponse) => {
      expect(films).withContext("get film list").toBeTruthy();
      expect(films.count).withContext("count greater than 0").toBeGreaterThan(0);
      expect(films.results.length).withContext("film quantity greater than 0").toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.api}/films?page=${pageControl.page}`);

    expect(req.request.method).toEqual("GET");

    req.flush(films);
  });

  it('should get single film data', () => {
    service.getFilm('1').subscribe((film: Film) => {
      expect(film).withContext("get film data").toBeTruthy();
      expect(film.title).withContext("get correct film data").toEqual("A New Hope");
    });

    const req = httpTestingController.expectOne(`${environment.api}/films/1`);

    expect(req.request.method).toEqual("GET");

    req.flush(films.results[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
