import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  // data state
  dataArray = new BehaviorSubject([]);

  // convert data to observable
  data$ = from(this.dataArray);

  constructor(private _http: HttpClient) {
    // fetch initial data from server
    this._http
      .get("https://jsonplaceholder.typicode.com/posts")
      .subscribe((value: any) => {
        const newData = [...this.dataArray.getValue(), ...value];
        return this.dataArray.next(newData);
      });
  }

  search(term: string) {
    // search data based on criteria
    return this._http
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .subscribe((value: any) => {
        const newData = [...this.dataArray.getValue(), value];
        return this.dataArray.next(newData);
      });
  }
}
