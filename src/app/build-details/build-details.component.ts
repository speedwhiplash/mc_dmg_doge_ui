import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

import { BuildScores, IBuild } from '../interfaces';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit, OnDestroy {
  builds: Record<number, BuildScores[]>;
  build: IBuild;
  currentScore = 0;
  currentIndex = 0;
  currentBuild;
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

  get scores(): number[] {
    return Object.keys(this.builds).map(score => +score).sort((a, b) => a - b);
  }

  getBuild(score: number, index: number): IBuild {
    if (this.builds[score] && this.builds[score][index]) {
      return this.buildService.getBuild(this.builds[score][index]['build']);
    } else {
      return null;
    }
  }

  getScores(score: number, index: number): IBuild {
    if (this.builds[score] && this.builds[score][index]) {
      return this.builds[score][index]['scores'];
    } else {
      return null;
    }
  }

  nextIndex(event: MouseEvent): void {
    if (this.currentIndex < (this.builds[this.currentScore] || []).length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    event.preventDefault();
  }

  previousIndex(event: MouseEvent): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = (this.builds[this.currentScore] || []).length - 1;
    }
    event.preventDefault();
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

  setBuildIndexes(buildIndexes: Record<number, BuildScores[]>) {
    this.builds = buildIndexes;
    this.currentScore = Object.keys(buildIndexes).map(score => +score).sort()[0];
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
