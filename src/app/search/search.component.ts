import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime, throttleTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  searchValue$: Observable<String>;

  constructor(private appService: AppService) {
  }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      map(value => {
        this.appService.setSearchValue(value);
        return this._filter(value);
      })
    );
    this.searchValue$ = this.appService.searchBoxValue$.pipe(
      throttleTime(100)
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  optionSelected(evt: MatAutocompleteSelectedEvent) {
    this.appService.setSearchValue(evt.option.value);
  }
}
