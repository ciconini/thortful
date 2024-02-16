import { TestBed } from '@angular/core/testing';
import { VehiclesService } from './vehicles.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PageControl } from '../../shared/util/model/page-control'
import { Vehicle, VehicleResponse } from '../util/model/vehicle'
import { environment } from '../../../environments/environment.development'
import { VEHICLES } from './vehicles-mock'

describe('VehicleService', () => {
  let service: VehiclesService,
    httpTestingController: HttpTestingController,
    vehicles = VEHICLES,
    pageControl = new PageControl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ VehiclesService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get vehicles list', () => {
    service.getVehicles(pageControl).subscribe((vehicles: VehicleResponse) => {
      expect(vehicles).withContext("get vehicle list").toBeTruthy();
      expect(vehicles.count).withContext("count greater than 0").toBeGreaterThan(0);
      expect(vehicles.results.length).withContext("vehicle quantity greater than 0").toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(`${environment.api}/vehicles?page=${pageControl.page}`);

    expect(req.request.method).toEqual("GET");

    req.flush(vehicles);
  });

  it('should get single vehicle data', () => {
    service.getVehicle('1').subscribe((vehicle: Vehicle) => {
      expect(vehicle).withContext("get vehicle data").toBeTruthy();
      expect(vehicle.name).withContext("get correct vehicle data").toEqual("Sand Crawler");
    });

    const req = httpTestingController.expectOne(`${environment.api}/vehicles/1`);

    expect(req.request.method).toEqual("GET");

    req.flush(vehicles.results[0]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});

