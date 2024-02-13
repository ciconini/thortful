import { Component, Input } from '@angular/core';
import { Banner } from '../../util/model/banner'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  @Input() banners: Banner[] = [];

  getSlideUrl(i: number): string {
    return `url(assets/images${this.banners[i].image})`;
  }

}
