import { Component, OnInit } from '@angular/core';
import { BannerComponent } from './ui/banner/banner.component'
import { Observable, interval, of } from 'rxjs'
import { Banner } from './util/model/banner'
import { CommonModule } from '@angular/common'
import { Post } from './util/model/post'
import { NewsComponent } from './ui/news/news.component'
import { HomepageService } from './data-access/homepage.service'

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, BannerComponent, NewsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  banners: Banner[] = [];
  newsPosts$: Observable<Post[]> = new Observable;

  constructor(private readonly service: HomepageService) {}

  ngOnInit(): void {
    this.startPosts();
  }

  private startPosts(): void {
    this.newsPosts$ = this.service.getPosts();
  }

}
