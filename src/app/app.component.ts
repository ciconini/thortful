import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgFallbackDirective } from './shared/util/directives/imageFallback'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImgFallbackDirective],
  styleUrl: './app.component.scss',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'thortful';
}
