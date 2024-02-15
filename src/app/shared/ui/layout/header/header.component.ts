import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { Menu, MenuService } from '../../../util/model/menu'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showMenu: boolean = false;

  constructor(public menu: MenuService) {}

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

}