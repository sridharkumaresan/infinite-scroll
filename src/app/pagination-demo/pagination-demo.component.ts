import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-pagination-demo',
  templateUrl: './pagination-demo.component.html',
  styleUrls: ['./pagination-demo.component.scss']
})
export class PaginationDemoComponent implements OnInit {
  list: any[];
  total = 50;
  page = 1;
  limit = 10;

  constructor() { }

  ngOnInit() {
    this.loadList();
  }

  loadList = () => {
    this.getList().pipe(
      delay(300)
    )
    .subscribe(
      (list: any[]) => {
        this.list = list;
      }
    );
  }

  getList = (): Observable<any[]> => of(this.randomDataSet(10, 5, 100))


  randomDataSet = (dataSetSize, minValue, maxValue): any[] => {
    return new Array(dataSetSize).fill(0).map(function(n) {
      return Math.random() * (maxValue - minValue) + minValue;
    });
  }

  goToPage(n: number): void {
    this.page = n;
    this.loadList();
  }

  onNext(): void {
    this.page++;
    this.loadList();
  }

  onPrev(): void {
    this.page--;
    this.loadList();
  }

}
