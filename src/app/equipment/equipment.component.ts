import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

import { BuildService } from '../build.service';
import { Slots } from '../interfaces';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  @ViewChild('equipmentTable') equipmentTable: MatAccordion;
  equipment = this.buildService.equipment$;
  isExpanded = false;
  isLoading = false;
  slots = Object.keys(Slots);
  slotNames = Object.keys(Slots).map(slot => Slots[slot])
  private isAlive = true;

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  expandAll() {
    this.equipmentTable.openAll()
  }

  update() {
    this.isLoading = true;
    this.httpClient.get('/api/update-stats')
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => {
        this.buildService.getEquipment().subscribe(() => this.isLoading = false);
      })
  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }
}
