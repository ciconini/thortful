import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {
  @Input() background: string;

  constructor() {
    this.background = "assets/images/background.webp"
  }

}
