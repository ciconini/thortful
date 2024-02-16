import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipDetailComponent } from './starship-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRoute } from '@angular/router'
import { ActivatedRouteStub } from '../../../shared/util/model/activatedroute-mock'

describe('StarshipDetailComponent', () => {
  let component: StarshipDetailComponent;
  let fixture: ComponentFixture<StarshipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipDetailComponent, HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
