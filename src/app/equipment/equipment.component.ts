import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { catchError, map, retry, switchMap, takeWhile } from 'rxjs/operators';

import { BuildService, MAX_ALLOWED_COMPARE_ITEMS } from '../build.service';
import { IDefenceInputs, Slots } from '../interfaces';

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
  maxItems = MAX_ALLOWED_COMPARE_ITEMS;
  slotNames = Object.keys(Slots);
  private isAlive = true;
  private itemSelections = require('./item-selections.json');

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  autoSelect() {
    this.clearAll();
    
    this._select('helmet', this.itemSelections.helmet);
    this._select('chestplate', this.itemSelections.chestplate);
    this._select('leggings', this.itemSelections.leggings);
    this._select('boots', this.itemSelections.boots);
    this._select('offhand', this.itemSelections.offhand);

    this.buildService.saveWhitelist();
  }

  clearAll() {
    this.slotNames.forEach(slotName => {
      this.buildService.equipmentWhiteList[slotName] = {};
    });
  }

  getEquipmentSlot$(slot): Observable<IDefenceInputs[]> {
    return this.equipment$.pipe(map(things => things[slot]));
  }

  numberSelected(slot): number {
    return Object.keys(this.buildService.equipmentWhiteList[slot]).length;
  }

  totalSelected() {
    let total = 0;
    this.slotNames.forEach(slot => total += this.numberSelected(slot));
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

  private _select(slotName, itemArray) {
    this.equipment$.getValue()[slotName]
      .filter(item => itemArray.includes(item.Name))
      .forEach(item => this.buildService.equipmentWhiteList[slotName][item.Name] = true);
    }
}
