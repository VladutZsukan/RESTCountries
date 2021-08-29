import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable, forkJoin, of } from 'rxjs';
import { Country, Currency, Language } from 'src/app/types/api';
import { ActivatedRoute } from '@angular/router';
import { tap, mergeMap } from 'rxjs/operators';
import { CountryCardComponent } from 'src/app/components/country-card/country-card.component';
import { CurrencyPipe, getCurrencySymbol } from '@angular/common';

const REGION_OPTIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  
  private source: Country[] =[];
  
  
  searchFilter?: string;
  regionFilter?: string;
  languageFilter?: string;
  regionOptions = REGION_OPTIONS;
  currencyFilter?: string;
 

  constructor(private api: ApiService) {
    
  }

  ngOnInit(): void {
    this.api.getAllCountries().subscribe((countries) => {
      this.source = countries;
    });
    }
    displayLanguages(languages: Language[]) {
      return languages.map((language) => language.name).join(', ');
    };
    
    

  get countries() {
    return this.source
      ? this.source
          .filter((country) =>
            this.searchFilter
              ? country.name
                  .toLowerCase()
                  .includes(this.searchFilter.toLowerCase())
              : country
          )
          .filter((country) =>
            this.regionFilter
              ? country.region.includes(this.regionFilter)
              : country
          )
          .filter((country) =>
            this.languageFilter
              ? this.displayLanguages(country.languages)
                  .toLowerCase()
                  .includes(this.languageFilter.toLowerCase())
              : country
          )
          .filter((country) =>
            this.currencyFilter
              ? country.currencies
              : country
          )
      : this.source;
  }

  
}
