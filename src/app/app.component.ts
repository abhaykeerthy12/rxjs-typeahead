import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import {
  filter,
  map,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";
import { SearchService } from "./search.service";

@Component({
  selector: 'app-root',
  template: `
   <h1>Typeahead search</h1>

   <div style="padding: 10px">
   	<input type="text" placeholder="Search..." (keyup)="onKeyUp($event)" />

	<h3>Data</h3>

	<ng-container *ngIf="searchResults | async as results">
		<div *ngFor="let data of results">
		   <p> {{data.data}} </p>
		   <p> {{data.unique}} </p>
		</div>
	</ng-container>
   </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'rxjs-typeahead';

  // search subject
  searchSubject = new Subject<string>();

  // search results
  searchResults: Observable<any[]>;

  constructor(private _searchService: SearchService){}

  ngOnInit(){

      this.searchResults = this._searchService.data$;

      this.search().subscribe((value) =>
        this._searchService.search(value)
      );
  }

  onKeyUp(event){
	this.searchSubject.next(event.target.value);
  }

  // search when typing
  // criteria should be above 3 chars   
  // also add some delay and memoization
  search() {
    return this.searchSubject.pipe(
      filter((value) => !!value),
      filter((value) => value.length > 3),
      map((value: string) => value.toLowerCase().trim()),
      debounceTime(500),
      distinctUntilChanged()
    );
  }

}
