import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'
import { Person, PeopleResponse } from '../util/model/people'

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getPeople(pageControl: PageControl): Observable<Person[]> {
    return this.http.get<PeopleResponse>(`${environment.api}/people?page=${pageControl.page}`).pipe(
      map(response => {
        return response.results
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${environment.api}/people/${id}`).pipe(
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
