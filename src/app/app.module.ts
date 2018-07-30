import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InfiniteScrollerDirective } from './infinite.scroll.directive';
import { CcSpinnerComponent } from './cc-spinner/cc-spinner.component';
import { SpinnerPulseComponent } from './cc-spinner/spinner-components/spinner-pulse/spinner-pulse.component';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollerDirective,
    CcSpinnerComponent,
    SpinnerPulseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
