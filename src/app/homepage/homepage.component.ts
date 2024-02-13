import { Component, OnInit } from '@angular/core';
import { BannerComponent } from './ui/banner/banner.component'
import { Observable, interval, of } from 'rxjs'
import { Banner } from './util/model/banner'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, BannerComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{
  banners: Banner[] = [];

  constructor() {}

  ngOnInit(): void {
    this.startBanners();
  }

  private startBanners() {
    this.banners = [
      {
        title: "Films",
        link: "/films",
        image: "/films/title-background.gif"
      },
      {
        title: "Vehicles",
        link: "/vehicles",
        image: "/vehicles/title-background.gif"
      },
      {
        title: "Planets",
        link: "/planets",
        image: "/planets/title-background.gif"
      },
      {
        title: "Species",
        link: "/species",
        image: "/species/title-background.gif"
      },
      {
        title: "People",
        link: "/people",
        image: "/people/title-background.gif"
      },
      {
        title: "Starships",
        link: "/starships",
        image: "/starships/title-background.gif"
      },
    ]
  }

}
