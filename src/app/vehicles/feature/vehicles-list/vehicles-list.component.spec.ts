import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesListComponent } from './vehicles-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRouteStub } from '../../../shared/util/model/activatedroute-mock'
import { ActivatedRoute } from '@angular/router'

describe('VehiclesListComponent', () => {
  let component: VehiclesListComponent;
  let fixture: ComponentFixture<VehiclesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesListComponent, HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehiclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
