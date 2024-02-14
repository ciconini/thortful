import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'
import { Vehicle, VehicleResponse } from '../util/model/vehicle'

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getVehicles(pageControl: PageControl): Observable<VehicleResponse> {
    return this.http.get<VehicleResponse>(`${environment.api}/vehicles?page=${pageControl.page}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getVehicle(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.api}/vehicles/${id}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }
}
