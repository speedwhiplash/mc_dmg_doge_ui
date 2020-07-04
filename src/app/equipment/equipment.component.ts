import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { catchError, retry, switchMap, takeWhile } from 'rxjs/operators';

import { BuildService } from '../build.service';
import { Slots } from '../interfaces';
import { timer } from 'rxjs';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) equipmentTable: MatAccordion;
  equipment$ = this.buildService.equipment$;
  isExpanded = true;
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
    timer(100).subscribe(() => {
      this.expandAll();
    })
  }

  expandAll() {
    this.equipmentTable.openAll()
  }

  isAllChecked(slot) {
    return this.equipment$.getValue()[slot].length === Object.keys(this.buildService.equipmentWhiteList[slot]).length;
  }

  isSelected(slot, item) {
    return !!this.buildService.equipmentWhiteList[slot][item.Name];
  }

  numberSelected(slot): number {
    return Object.keys(this.buildService.equipmentWhiteList[slot]).length;
  }

  toggleItem(slot, item): void {
    this.buildService.equipmentWhiteList[slot][item.Name] = !this.buildService.equipmentWhiteList[slot][item.Name];
    localStorage.setItem('equipmentWhiteList', JSON.stringify(this.buildService.equipmentWhiteList));
  }

  toggleSelectAll(slot): void {
    const isAllChecked = this.isAllChecked(slot);
    this.equipment$.getValue()[slot].forEach(item => this.buildService.equipmentWhiteList[slot][item.Name] = !isAllChecked);
    localStorage.setItem('equipmentWhiteList', JSON.stringify(this.buildService.equipmentWhiteList));
  }

  totalSelected() {
    let total = 0;
    this.slots.forEach(slot => total += this.numberSelected(slot));
    return total;
  }

  update() {
    this.isLoading = true;
    this.httpClient.get('/api/update-stats')
      .pipe(
        retry(2),
        takeWhile(() => this.isAlive),
        catchError(error => {
          this.isLoading = false;
          return error;
        }),
        switchMap(() => this.buildService.getEquipment$()),
        catchError(error => {
          this.isLoading = false;
          return error;
        })
      )
      .subscribe(() => this.isLoading = false);

  }

  public ngOnDestroy(): void {
    this.isAlive = false;
  }
}
