import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Post } from '../util/model/post'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private readonly http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("assets/data/posts.json");
  }
}
