import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { environment } from '../../../environments/environment.development'
import { CharacterResponse, Character } from '../util/model/character'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PEOPLE } from './people-mock'
import { PageControl } from '../../shared/util/model/page-control'

describe('CharacterService', () => {
  let service: CharacterService,
    httpTestingController: HttpTestingController,
    people = PEOPLE,
    pageControl = new PageControl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CharacterService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get people list', () => {
    service.getCharacters(pageControl).subscribe((people: CharacterResponse) => {
      expect(people).withContext("get people list").toBeTruthy();
      expect(people.count).withContext("count greater than 0").toBeGreaterThan(0);
      expect(people.results.length).withContext("person quantity greater than 0").toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.api}/people?page=${pageControl.page}`);

    expect(req.request.method).toEqual("GET");

    req.flush(people);
  });

  it('should get single person data', () => {
    service.getCharacter('1').subscribe((person: Character) => {
      expect(person).withContext("get person data").toBeTruthy();
      expect(person.name).withContext("get correct person data").toEqual("Luke Skywalker");
    });

    const req = httpTestingController.expectOne(`${environment.api}/people/1`);

    expect(req.request.method).toEqual("GET");

    req.flush(people.results[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
