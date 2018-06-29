import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  currentPage: number = 1;
  news: Array<any> = [];
  scrollCallback;
  
  constructor(private appService: AppService){
    this.scrollCallback = this.getStories.bind(this);
  }

  getStories() {
    return this.appService.getLatestStories(this.currentPage).pipe(
      tap(this.processData)
    );
  }

  private processData = (news) => {
    this.currentPage++;
    this.news = this.news.concat(news);
  }
}
