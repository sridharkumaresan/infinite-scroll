import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex-column-demo',
  templateUrl: './flex-column-demo.component.html',
  styleUrls: ['./flex-column-demo.component.css']
})
export class FlexColumnDemoComponent implements OnInit {
  dummy;
  constructor() { }

  ngOnInit() {
    this.dummy = dummy;
  }

}

export const dummy = [
  [
    {
      title: 'title1',
      data: 'data data data data 1'
    },
    {
      title: 'title2',
      data: 'data data data data 2'
    },
    {
      title: 'title3',
      data: 'data data data data 3'
    }
  ],
  [
    {
      title: 'title1',
      data: 'data data data data 1'
    },
    {
      title: 'title2',
      data: 'data data data data 2'
    },
    {
      title: 'title3',
      data: 'data data data data 3'
    }
  ],
  [
    {
      title: 'title1',
      data: 'data data data data 1'
    }
  ]
];
