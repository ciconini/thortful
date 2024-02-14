import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class Episode {

    getEpisode(num: number): string {
        let text = "";
        switch (num) {
            case 1:
                text = "Episode I";
                break;
            case 2:
                text = "Episode II";
                break;
            case 3:
                text = "Episode III";
                break;
            case 4:
                text = "Episode IV";
                break;
            case 5:
                text = "Episode V";
                break;
            case 6:
                text = "Episode VI";
                break;
        }
        return text;
    }
}