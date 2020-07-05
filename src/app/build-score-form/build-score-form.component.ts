import { Component, OnInit } from '@angular/core';
import { BuildIndex } from '../interfaces';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-build-score-form',
  templateUrl: './build-score-form.component.html',
  styleUrls: ['./build-score-form.component.scss']
})
export class BuildScoreFormComponent implements OnInit {
  build: BuildIndex;
  equipment$ = this.buildService.equipment$;
  score = 0;

  constructor(private buildService: BuildService) {
  }

  ngOnInit(): void {
  }

  submit() {
    // this.httpClient.post()
  }
}
