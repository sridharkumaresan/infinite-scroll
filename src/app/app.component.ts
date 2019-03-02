import { Component, AfterViewInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { AppService } from './app.service';
import { Observable, interval, ConnectableObservable, fromEvent, Subject } from 'rxjs';
import { tap, map, throttleTime, pairwise, startWith, distinctUntilChanged, debounceTime, delay } from 'rxjs/operators';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/overlay';
import { MatSidenavContent } from '@angular/material';
import { VisibilityState, slideDown } from 'src/assets/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideDown
  ]
})
export class AppComponent implements AfterViewInit {
  fillerNav = Array.from({length: 10}, (_, i) => `Nav Item ${i + 1}`);
  fillerContent = Array.from({length: 50}, () =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
   voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  title = 'app';

  currentPage: number = 1;
  news: Array<any> = [];
  scrollCallback;

  temp;
  header: any = {
    someData$: null
  };
  someData$: any;
  showMasonry: Boolean = false;
  loading: Boolean = false;
  constructor(private appService: AppService,
    private scrollDispatcher: ScrollDispatcher){
    this.scrollCallback = this.getStories.bind(this);
    this.temp = new Options();
    console.log('temp ', this.temp);
    this.changeVal();

    // const scrollSubs = this.scrollDispatcher
    //   .scrolled()
    //   .pipe(
    //     map((data: CdkScrollable) => {
    //       return data.getElementRef().nativeElement.scrollTop || 0
    //     }),
    //     pairwise(),
    //     map(
    //       ([y1, y2]) => {
    //         return {scrollTop: y2, direction: y2 < y1 ? 'UP' : 'DOWN' };
    //       }
    //     )
    //   );
    //   console.log('scrollSubs', scrollSubs);
    //   scrollSubs.subscribe(
    //       data => {
    //         console.log(data);
    //         this.someData$ = data.direction;
    //       }
    //   )
  }
  showTopBar: Boolean = false;
  ngAfterViewInit() {
    this.appService.showTopBarSearch$
    .pipe(
      startWith(false),
      distinctUntilChanged()
    )
    .subscribe(
      showTopBar => this.showTopBar = showTopBar
    )
  }
  @HostBinding('@toggle')
  toggle(): VisibilityState {
    return !this.showTopBar ? VisibilityState.Hidden : VisibilityState.Visible;
  }
  bdScrollAction(scrollData: any): void {
    this.appService.setTopBarSearchVisibility(scrollData)
  }
  changeVal(): any {
    this.temp.type = "blnum";
  }
  
  getStories() {
    this.loading = true;
    if(this.currentPage < 4){
      return this.appService.getLatestStories(this.currentPage)
      .pipe(
        delay(2000),
        tap(this.processData)
      );
    }else{
      this.loading = false;
      return [];
    }
    
  }

  private processData = (news) => {
    console.log('this.news ', this);
    this.loading = false;
    this.currentPage++;
    this.news = this.news.concat(news);
    console.log('News ', this.news);
    this._mNews = [...this.chunk(this.news, 3)];
    console.log('_mnews ', this._mNews);
  }
  public _mNews: any[] = []; 
  public changeView = () => {
    console.log(this.showMasonry);
  }

  private chunk = (target, size) => {
    return target.reduce((memo, value, index) => {
      if (index % (target.length / size) == 0 && index !== 0) {
        memo.push([]);
      }
      memo[memo.length - 1].push(value);
      return memo;
    }, [[]])
  }

}

export class Options {
  constructor(){
    
  }
  type = "alnum";
  length = null;
  min = 0;
  max = Infinity;
  uppercase = true;
  lowercase = true;
  transform = null;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}