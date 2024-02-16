import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetListComponent } from './planet-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Subject } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

class ActivatedRouteStub {
  private subject = new Subject();
  push(value: any) {
    this.subject.next(value);
  }
  get queryParams() {
    return this.subject.asObservable();
  }
}

describe('PlanetListComponent', () => {
  let component: PlanetListComponent;
  let fixture: ComponentFixture<PlanetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetListComponent, HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
