import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './services/api.service';

import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {


  constructor(
    private apiService: ApiService

  ) {}

  ngOnInit() {
  }
}
