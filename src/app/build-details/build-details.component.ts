import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { Build } from '../interfaces';
import { BuildService } from '../build.service';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit {
  build: Build;

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
    of(
      delay(500),
      tap(() => this.refresh())
    );
  }

  ngOnInit(): void {
  }

  compare() {
    this.httpClient.post('/api/compare', {}).subscribe()
  }

  refresh() {
    this.build = this.buildService.getBuild({
      boots: 0,
      helmet: 0,
      legging: 0,
      chestplate: 0,
      offhand: 0,
    });
  }

}
