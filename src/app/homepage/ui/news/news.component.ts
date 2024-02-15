import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../util/model/post'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  @Input() posts: Post[] = [];

  ngOnInit(): void {
    console.log(this.posts)
  }
  
  getImg(url: string): string {
    return `url(${url})`
  }
}
