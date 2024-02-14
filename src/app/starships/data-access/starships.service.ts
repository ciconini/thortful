import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'
import { Starship, StarshipResponse } from '../util/model/starship'

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getStarships(pageControl: PageControl): Observable<StarshipResponse> {
    return this.http.get<StarshipResponse>(`${environment.api}/starships?page=${pageControl.page}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getStarship(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${environment.api}/starships/${id}`).pipe(
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
