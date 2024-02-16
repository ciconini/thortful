import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListComponent } from './people-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRouteStub } from '../../../shared/util/model/activatedroute-mock'
import { ActivatedRoute } from '@angular/router'

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleListComponent, HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
