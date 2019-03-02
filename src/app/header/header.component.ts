import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy, AfterViewInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, distinctUntilChanged, startWith } from 'rxjs/operators';
import { AppService } from '../app.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { slideDown } from 'src/assets/animation';
enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    slideDown
  ]
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit {
  showTopBarSearch$: Observable<Boolean>;
  showTopBar: Boolean = false;
  @Output() toggleHBMenu = new EventEmitter<boolean>();
  constructor(private appService: AppService) { 
  }

  @HostBinding('@toggle')
  toggle(): VisibilityState {
    return this.showTopBar ? VisibilityState.Hidden : VisibilityState.Visible;
  }

  ngOnInit() {
    this.showTopBarSearch$ = this.appService.showTopBarSearch$
      .pipe(
        startWith(false),
        distinctUntilChanged()
      );
    this.showTopBarSearch$.subscribe(
      showTopBar => this.showTopBar = showTopBar
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    
  }
  ngAfterViewInit(): void {
    
  }
  public toggleMenu($event): void {
    this.toggleHBMenu.emit(true)
  }
}

