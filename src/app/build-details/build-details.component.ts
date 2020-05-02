import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

import { Build } from '../interfaces';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit, OnDestroy {
  build: Build;
  private isAlive = true;

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.buildService.equipment$.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.refresh()
    })
  }

  compare() {
    this.httpClient.post('/api/compare', {}).pipe(takeWhile(() => this.isAlive)).subscribe()
  }

  refresh() {
    this.build = this.buildService.getBuild({
      boots: 0,
      helmet: 0,
      leggings: 0,
      chestplate: 0,
      offhand: 0,
    });
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }
}
