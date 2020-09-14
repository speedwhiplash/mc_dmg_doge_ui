import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { BuildAttributeScores, IBuild, HandheldFields, DefenceFields } from '../interfaces';
import { BuildService } from '../build.service';
import { PercentPipe } from '@angular/common';

enum StatNames {
  armor = 'Armor',
  toughness = 'Toughness',
  protection = 'Protection',
  evasion = 'Evasion',
  regeneration = 'Regen',
  health = 'Health'
}

@Component({
  selector: 'app-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss']
})
export class BuildDetailsComponent implements OnInit, OnDestroy {
  builds: Record<number, BuildAttributeScores[]>;
  build: IBuild;
  currentScore = 0;
  currentIndex = 0;
  isLoading = false;
  private isAlive = true;

  constructor(
    private buildService: BuildService,
    private percentPipe: PercentPipe
  ) {
    this.buildService.calculationsRemaining$.subscribe(remaining => this.isLoading = remaining > 0);
  }

  ngOnInit(): void {
    this.buildService.equipment$.pipe(takeWhile(() => this.isAlive)).subscribe(() => {
      this.refresh();
    });
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

  getDiscordFormat(score: number, currentIndex: number): string {
    let content = '';
    let build = this.getBuild(score, currentIndex);
    content += ['helmet', 'chestplate', 'leggings', 'boots', 'offhand'].map(slot => build[slot]['Name']).join(' / ');
    content += '\n```';
    content += `${this.percentPipe.transform(score, '2.2')} Health Lost / `;
    content += ['armor', 'toughness', 'protection', 'evasion', 'regeneration', 'health'].map(stat => {
      return `${this.getScores(score, currentIndex)[stat]} ${this.getStatName(stat)}`
    }).join(' / ');
    content += ` / ${this.getSpeedScore(score, currentIndex)}`;
    return content + '```';
  }

  getScores(score: number, index: number): IBuild {
    if (this.builds[score] && this.builds[score][index]) {
      return this.builds[score][index]['scores'];
    } else {
      return null;
    }
  }

  getSpeedScore(score: number, currentIndex: number): string {
    const speedScore = this.getScores(score, currentIndex)['speed_percent'] - 1;
    return (speedScore >= 0 ? '+' : '') + (this.percentPipe.transform(speedScore, '2.2'));
  }

  getStatName(statId: string): string {
    return StatNames[statId];
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

  setBuildIndexes(buildIndexes: Record<number, BuildAttributeScores[]>) {
    this.builds = buildIndexes;
    this.currentScore = Object.keys(buildIndexes).map(score => +score).sort()[0];
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
