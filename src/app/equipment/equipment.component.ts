import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

import { BuildService } from '../build.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  equipment = this.buildService.equipment$;
  private isAlive: false

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  refresh() {
    this.buildService.getEquipment().subscribe();
  }

  update() {
    this.httpClient.get('/api/update-stats').pipe(takeWhile(() => this.isAlive)).subscribe()
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }
}
