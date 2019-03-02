import { Directive, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Observable, fromEvent, Subject, Subscription } from 'rxjs';
import { map, startWith, pairwise, tap, distinctUntilChanged, filter, debounceTime, share } from 'rxjs/operators';
import { AppService } from './app.service';
@Directive({
    selector: '[bdScroll]'
})
export class BdScrollDirective implements OnInit, OnDestroy {

    @Output() scrollAction: EventEmitter<any> = new EventEmitter();

    private el: any;
    private scrollEvent$: Subscription = new Subscription();

    constructor(private element: ElementRef) {
        this.el = element.nativeElement;
    }
    
    ngOnInit(): void {
        this.scrollEvent$ = this.setScrollEvent(this.el).subscribe(
            data => this.scrollAction.next(data)
        );

    }
    ngOnDestroy(): void {
        this.scrollEvent$.unsubscribe();
    }
    setScrollEvent = (container: any): Observable<any> => {
        return fromEvent(container, 'scroll')
          .pipe(
            debounceTime(10),
            map((data: any) => data.target.scrollTop || 0),
            startWith(0),
            pairwise(),
            map(([y1, y2]) => ({scrollTop: y2, direction: y2 < y1 ? 'UP' : 'DOWN' })),
            share()
          );
      }

}