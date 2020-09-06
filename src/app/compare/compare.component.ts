import { Component, OnInit, ViewChild } from '@angular/core';

import { BuildDetailsComponent } from '../build-details/build-details.component';
import { BuildAttributeScores, Slots } from '../interfaces';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  @ViewChild('buildDetails') buildDetails: BuildDetailsComponent;
  slotNames = Object.keys(Slots);

  constructor(private buildService: BuildService) {
  }

  ngOnInit(): void {
  }

  setBuilds(build: Record<number, BuildAttributeScores[]>) {
    this.buildDetails.setBuildIndexes(build);
  }

  totalSelected() {
    let total = 0;
    this.slotNames.forEach(slot => total += this.numberSelected(slot));
    return total;
  }

  private numberSelected(slot): number {
    return Object.keys(this.buildService.equipmentWhiteList[slot]).length;
  }
}
