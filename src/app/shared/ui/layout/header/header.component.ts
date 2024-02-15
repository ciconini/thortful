import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menu: Menu[] = [
    {
      label: "Films",
      link: "/films"
    },
    {
      label: "People",
      link: "/people"
    },
    {
      label: "Planets",
      link: "/planets"
    },
    {
      label: "Starships",
      link: "/starships"
    },
    {
      label: "Vehicles",
      link: "/vehicles"
    },
    {
      label: "Species",
      link: "/species"
    },
  ];
  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

}

interface Menu {
  label: string;
  link: string;
}