import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class ObjectId {

    getId(ind: number, page: number): number {
        let sum = 0;
        if (page >= 1) {
            sum = 10 * (page - 1);
        }
        return (ind + 1) + sum;
    }
}