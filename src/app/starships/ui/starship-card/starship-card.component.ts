import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Starship } from '../../util/model/starship'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss'
})
export class StarshipCardComponent implements OnInit {
  @Input() starship!: Starship;
  @Input() index!: number;
  @Input() page!: number;

  imageUrl: string = "";

  constructor(
    private readonly util: ObjectId
  ) { }

  ngOnInit(): void {
    this.imageUrl = this.normalizeUrl(this.starship.name)
  }

  normalizeUrl(name: string): string {
    return "assets/images/starships/" + name.toLowerCase().replace(/ /g, "-") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

}
