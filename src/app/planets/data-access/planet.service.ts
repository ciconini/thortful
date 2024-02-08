import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { Planet, PlanetResponse } from '../util/model/planet'
import { environment } from '../../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<PlanetResponse>(`${environment.api}/planets`).pipe(
      map(response => {
        return response.results
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }
}
