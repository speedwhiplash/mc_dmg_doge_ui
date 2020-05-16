import { Component, OnInit, ViewChild } from '@angular/core';

import { BuildDetailsComponent } from '../build-details/build-details.component';
import { BuildIndex } from '../interfaces';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  @ViewChild('buildDetails') buildDetails: BuildDetailsComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  setBuilds(build: Record<number, BuildIndex[]>) {
    this.buildDetails.setBuildIndexes(build);
  }

}
