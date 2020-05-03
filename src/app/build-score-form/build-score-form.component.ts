import { Component, OnInit } from '@angular/core';
import { Build, BuildIndex } from '../interfaces';
import { BuildService } from '../build.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-build-score-form',
  templateUrl: './build-score-form.component.html',
  styleUrls: ['./build-score-form.component.scss']
})
export class BuildScoreFormComponent implements OnInit {
  build: BuildIndex;
  equipment$ = this.serv.equipment$;
  score = 0;

  constructor(private serv: BuildService, private httpClient:HttpClient) {
  }

  ngOnInit(): void {
  }

  submit() {
    // this.httpClient.post()
  }
}
