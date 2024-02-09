import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core"

@Directive({
    selector: 'img[appImgFallback]',
    standalone: true
})
export class ImgFallbackDirective {
    @Input('appImgFallback') img!: string;

    constructor(private eRef: ElementRef) { }
    
    @HostListener('error')
    loadFallBackOnError() {
        const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
        element.src = this.img;
    }
}