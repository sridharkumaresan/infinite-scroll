import { DirectPaginationComponent } from './direct-pagination/direct-pagination.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { InfiniteScrollerDirective } from './infinite.scroll.directive';
import { CcSpinnerComponent } from './cc-spinner/cc-spinner.component';
import { SpinnerPulseComponent } from './cc-spinner/spinner-components/spinner-pulse/spinner-pulse.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { BdScrollDirective } from './bd.scroll.container.directive';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';
import { FlexColumnDemoComponent } from './flex-column-demo/flex-column-demo.component';
import { PaginationDemoComponent } from './pagination-demo/pagination-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollerDirective,
    CcSpinnerComponent,
    SpinnerPulseComponent,
    HeaderComponent,
    BdScrollDirective,
    SearchComponent,
    BannerComponent,
    FlexColumnDemoComponent,
    DirectPaginationComponent,
    PaginationDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollDispatchModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
