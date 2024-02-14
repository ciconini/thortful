import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class UrlUtil {

    normalizeUrl(name: string, type: string): string {
        return `assets/images/${type}/${this.getSlug(name)}.jpg`;
    }

    getSlug(text: string): string {
        return text.toLowerCase().replace(/ /g, "-")
    }
}