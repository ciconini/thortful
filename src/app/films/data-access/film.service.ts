import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'
import { Film, FilmResponse } from '../util/model/film'

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getFilms(pageControl: PageControl): Observable<FilmResponse> {
    return this.http.get<FilmResponse>(`${environment.api}/films?page=${pageControl.page}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getFilm(id: string): Observable<Film> {
    return this.http.get<Film>(`${environment.api}/films/${id}`).pipe(
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
