import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { PendingInterceptorService } from './pending-interceptor.service';

@Injectable({
    providedIn: 'root'
})
export class SpinnerVisibilityService {
    private _visibilitySubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    constructor(private pendingInterceptorService: PendingInterceptorService) {
    }

    /** @deprecated Deprecated in favor of visibilityObservable$ */
    get visibilityObservable(): Observable<boolean> {
        return this._visibilitySubject.asObservable();
    }

    get visibilityObservable$(): Observable<boolean> {
        return this.visibilityObservable;
    }

    public show(): void {
        this.pendingInterceptorService.forceByPass = true;
        this._visibilitySubject.next(true);
    }

    public hide(): void {
        this._visibilitySubject.next(false);
        this.pendingInterceptorService.forceByPass = false;
    }
}