import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesListComponent } from './species-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRouteStub } from '../../../shared/util/model/activatedroute-mock'
import { ActivatedRoute } from '@angular/router'

describe('SpeciesListComponent', () => {
  let component: SpeciesListComponent;
  let fixture: ComponentFixture<SpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesListComponent, HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
