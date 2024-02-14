import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { Planet, PlanetResponse } from '../util/model/planet'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getPlanets(pageControl: PageControl): Observable<PlanetResponse> {
    return this.http.get<PlanetResponse>(`${environment.api}/planets?page=${pageControl.page}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getPlanet(id: string): Observable<Planet> {
    return this.http.get<Planet>(`${environment.api}/planets/${id}`).pipe(
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
