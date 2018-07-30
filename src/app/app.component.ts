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

  temp;
  constructor(private appService: AppService){
    this.scrollCallback = this.getStories.bind(this);

    this.temp = new Options();
    console.log('temp ', this.temp);
    this.changeVal();
  }
  changeVal(): any {
    this.temp.type = "blnum";
    console.log(this.temp);
  }
  getStories() {

    if(this.currentPage < 4){
      return this.appService.getLatestStories(this.currentPage).pipe(
        tap(this.processData)
      );
    }else{
      console.log('Stop');
      return [];
    }
    
  }

  private processData = (news) => {
    this.currentPage++;
    this.news = this.news.concat(news);
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