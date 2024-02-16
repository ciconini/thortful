import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmDetailComponent } from './film-detail.component';
import { DebugElement } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing';
import { FilmService } from '../../data-access/film.service'
import { FILMS } from '../../data-access/films-mock'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Observable } from 'rxjs'
import { By } from '@angular/platform-browser'
import { Router } from '@angular/router'

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent, 
    fixture: ComponentFixture<FilmDetailComponent>,
    el: DebugElement,
    film = FILMS.results[0];

  beforeEach(async () => {

    const filmServiceSpy = jasmine.createSpyObj('filmServiceSpy', ['getFilm'])

    await TestBed.configureTestingModule({
      imports: [FilmDetailComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: FilmService, useValue: filmServiceSpy}
      ]
    })
    .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FilmDetailComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
      });
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show film data for particular film', (done) => {
    component.film$ = new Observable((obs) => {
      obs.next(film);
      obs.complete();
    });

    fixture.detectChanges();

    setTimeout(() => {
      const titleElement: HTMLElement = fixture.debugElement.query(
        By.css(".film-title > span")
      ).nativeElement;
      expect(titleElement.innerText).toEqual(film.title);
      done();
    });
  });
});
