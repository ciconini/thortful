import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    menuItems: Menu[] = [
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

    constructor() {}
}

export interface Menu {
    label: string;
    link: string;
}