import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsListComponent } from './starships-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ActivatedRouteStub } from '../../../shared/util/model/activatedroute-mock'
import { ActivatedRoute } from '@angular/router'

describe('StarshipsListComponent', () => {
  let component: StarshipsListComponent;
  let fixture: ComponentFixture<StarshipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipsListComponent, HttpClientTestingModule],
      providers: [{provide: ActivatedRoute, useClass: ActivatedRouteStub}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
