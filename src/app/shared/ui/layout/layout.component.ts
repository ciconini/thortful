import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
