import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Species } from '../../util/model/species'
import { RouterModule } from '@angular/router'
import { ObjectId } from '../../../shared/util/data-method/object-id'
import { ImgFallbackDirective } from '../../../shared/util/directives/imageFallback'

@Component({
  selector: 'app-species-card',
  standalone: true,
  imports: [RouterModule, ImgFallbackDirective],
  templateUrl: './species-card.component.html',
  styleUrl: './species-card.component.scss'
})
export class SpeciesCardComponent implements OnInit{
  @Input() species!: Species;
  @Input() index!: number;
  @Input() page!: number;
  imageUrl: string = "";

  constructor(
    private readonly util: ObjectId,
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.imageUrl = this.normalizeUrl(this.species.name)
  }

  normalizeUrl(name: string): string {
    return "assets/images/species/" + name.toLowerCase().replace(" ", "-").replace("'", "") + ".jpg";
  }

  getId(index: number): number {
    return this.util.getId(index, this.page)
  }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = "assets/images/starships/placeholder.jpg" || this.imageUrl;
  }

}
