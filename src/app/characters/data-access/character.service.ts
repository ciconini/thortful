import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { PageControl } from '../../shared/util/model/page-control'
import { Character, CharacterResponse } from '../util/model/character'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getCharacters(pageControl: PageControl): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${environment.api}/people?page=${pageControl.page}`).pipe(
      map(response => {
        return response
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Request error", error)
        return throwError(() => error)
      })
    )
  }

  getCharacter(id: string): Observable<Character> {
    return this.http.get<Character>(`${environment.api}/people/${id}`).pipe(
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
