import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, retry, switchMap, takeWhile } from 'rxjs/operators';

import { BuildService, MAX_ALLOWED_COMPARE_ITEMS } from '../build.service';
import { Slots } from '../interfaces';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) equipmentTable: MatAccordion;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns = [
    'selected',
    'Name',
    'Armor',
    'Armor Percent',
    'Toughness',
    'Toughness Percent',
    'Protection',
    'Evasion',
    'Regeneration',
    'Life Drain',
    'Health',
    'Health Percent',
    'Attack Speed',
    'Attack Speed Percent',
    'Type',
    'Place',
    'Tier'
  ];
  equipment$ = this.buildService.equipment$;
  isExpanded = true;
  isLoading = false;
  maxItems = MAX_ALLOWED_COMPARE_ITEMS;
  slots = Object.keys(Slots);
  slotNames = Object.keys(Slots).map(slot => Slots[slot]);

  private isAlive = true;

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  getDataSource(slot) {
    return new MatTableDataSource(this.buildService.equipment$.getValue()[slot]);
  }

  getColumns(slot) {
    if (slot === 'offhand') {
      return this.displayedColumns.filter(col => col !== 'Protection');
    }
    return this.displayedColumns;
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

  selectItem(slot, item, isSelected) {
    if (isSelected) {
      this.buildService.equipmentWhiteList[slot][item.Name] = true;
    } else {
      delete this.buildService.equipmentWhiteList[slot][item.Name];
    }
  }

  toggleItem(slot, item): void {
    const isSelected = this.buildService.equipmentWhiteList[slot][item.Name];
    this.selectItem(slot, item, !isSelected);
    localStorage.setItem('equipmentWhiteList', JSON.stringify(this.buildService.equipmentWhiteList));
  }

  toggleSelectAll(slot): void {
    const isAllSelected = this.isAllChecked(slot);
    this.equipment$.getValue()[slot].forEach(item => this.selectItem(slot, item, !isAllSelected));
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
