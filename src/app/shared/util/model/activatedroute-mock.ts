import { Subject } from "rxjs"

export class ActivatedRouteStub {
    private subject = new Subject();
    push(value: any) {
      this.subject.next(value);
    }
    get params() {
      return this.subject.asObservable();
    }
    get queryParams() {
      return this.subject.asObservable();
    }
}