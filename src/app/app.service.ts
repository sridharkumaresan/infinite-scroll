import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
const BASE_URL = 'https://node-hnapi.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class AppService{

    private showTopBarSearchSource = new Subject<any>();
    showTopBarSearch$ = this.showTopBarSearchSource.asObservable().pipe(share());

    private searchBoxValueSource = new Subject<any>();
    searchBoxValue$ = this.searchBoxValueSource.asObservable().pipe(share());

    constructor(private http: HttpClient){

    }
    getLatestStories(page: number = 1) {
        return this.http.get(`${BASE_URL}/news?page=${page}`);
    }
    setTopBarSearchVisibility(data: any): void {
        const flag = (data && data.scrollTop > 70) ? true : false;
        this.showTopBarSearchSource.next(flag);
    }
    setSearchValue(data: any): void {
        this.searchBoxValueSource.next(data);
    }
}