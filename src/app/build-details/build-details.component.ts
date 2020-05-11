import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

import { Build, BuildIndex } from '../interfaces';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit, OnDestroy {
  builds: { [key: number]: Build[] };
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

  refresh() {
    this.builds = {};
    this.build = this.buildService.getBuild({
      boots: 0,
      helmet: 0,
      leggings: 0,
      chestplate: 0,
      offhand: 0,
    });
  }

  setBuildIndex(buildIndex: BuildIndex) {
    this.build = this.buildService.getBuild(buildIndex);
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
