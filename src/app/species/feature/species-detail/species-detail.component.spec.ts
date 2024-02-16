import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesDetailComponent } from './species-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router'
import { ActivatedRouteStub } from '../../../shared/util/model/activatedroute-mock'

describe('SpeciesDetailComponent', () => {
  let component: SpeciesDetailComponent;
  let fixture: ComponentFixture<SpeciesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesDetailComponent, HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeciesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
