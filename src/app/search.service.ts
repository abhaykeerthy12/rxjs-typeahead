import { Injectable } from '@angular/core';
import {from, BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  dataArray = new BehaviorSubject([]);

  data$ = from(this.dataArray)

  search(value) {


	const newData = [
			...this.dataArray.getValue(),
			{
			"data": value,
			"unique": Date.now().toString()
			}
		]

	return value ? this.dataArray.next(newData) : false
  }

}
