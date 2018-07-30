import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, merge, Observable, Subscription, timer } from 'rxjs';
import { debounce, delayWhen } from 'rxjs/operators';
import { PendingInterceptorService } from './services/pending-interceptor.service';
import { SpinnerVisibilityService } from './services/spinner-visibility.service';
import {Spinner} from './spinner-components/spinner';

@Component({
  selector: 'cc-spinner',
  templateUrl: './cc-spinner.component.html',
  styleUrls: ['./cc-spinner.component.css']
})
export class CcSpinnerComponent implements OnDestroy, OnInit {
  public isSpinnerVisible: boolean;
  public spinkit = Spinner;
  private subscriptions: Subscription;
  private startTime: number;

  @Input()
  public backgroundColor: string;
  @Input()
  public spinner = Spinner.spinnerPulse;
  @Input()
  public filteredUrlPatterns: string[] = [];
  @Input()
  public filteredMethods: string[] = [];
  @Input()
  public filteredHeaders: string[] = [];
  @Input()
  public debounceDelay = 0;
  @Input()
  public minDuration = 0;
  @Input()
  public entryComponent: any = null;

  constructor(private pendingInterceptorService: PendingInterceptorService, private spinnerVisibilityService: SpinnerVisibilityService) {
      this.subscriptions = merge(
          this.pendingInterceptorService.pendingRequestsStatus$.pipe(
              debounce(this.handleDebounceDelay.bind(this)),
              delayWhen(this.handleMinDuration.bind(this))
          ),
          this.spinnerVisibilityService.visibilityObservable$,
      )
          .subscribe(this.handleSpinnerVisibility().bind(this));
  }

  ngOnInit(): void {
      this.nullifySpinnerIfEntryComponentIsDefined();

      if (!(this.filteredUrlPatterns instanceof Array)) {
          throw new TypeError('`filteredUrlPatterns` must be an array.');
      }

      if (!!this.filteredUrlPatterns.length) {
          this.filteredUrlPatterns.forEach(e => {
              this.pendingInterceptorService.filteredUrlPatterns.push(new RegExp(e));
          });
      }

      if (!(this.filteredMethods instanceof Array)) {
          throw new TypeError('`filteredMethods` must be an array.');
      }
      this.pendingInterceptorService.filteredMethods = this.filteredMethods;

      if (!(this.filteredHeaders instanceof Array)) {
          throw new TypeError('`filteredHeaders` must be an array.');
      }
      this.pendingInterceptorService.filteredHeaders = this.filteredHeaders;
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  private nullifySpinnerIfEntryComponentIsDefined(): void {
      if (null != this.entryComponent) {
          this.spinner = null;
      }
  }

  private handleSpinnerVisibility(): (v: boolean) => void {
      return v => this.isSpinnerVisible = v;
  }

  private handleDebounceDelay(hasPendingRequests: boolean): Observable<number | never> {
      if (hasPendingRequests && !!this.debounceDelay) {
          return timer(this.debounceDelay);
      }

      return EMPTY;
  }

  private handleMinDuration(hasPendingRequests: boolean): Observable<number> {
      if (hasPendingRequests || !this.minDuration) {
          this.startTime = Date.now();

          return timer(0);
      }

      const timerObservable = timer(this.minDuration - (Date.now() - this.startTime));
      this.startTime = null;

      return timerObservable;
  }
}