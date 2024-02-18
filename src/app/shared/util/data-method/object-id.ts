import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class ObjectId {

    getId(url: string): string {
        return url.split("/").filter(n => n).at(-1) || '';
    }
}