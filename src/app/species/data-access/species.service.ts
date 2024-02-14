import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { Species, SpeciesResponse } from '../util/model/species'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getSpecies(pageControl: PageControl): Observable<SpeciesResponse> {
    return this.http.get<SpeciesResponse>(`${environment.api}/species?page=${pageControl.page}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getSpeciesDetail(id: string): Observable<Species> {
    return this.http.get<Species>(`${environment.api}/species/${id}`).pipe(
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
