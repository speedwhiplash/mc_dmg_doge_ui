import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { catchError, map, retry, switchMap, takeWhile } from 'rxjs/operators';

import { BuildService } from '../build.service';
import { IDefenceInputs, Slots } from '../interfaces';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion) equipmentTable: MatAccordion;
  @Input('isExpanded') isExpanded = false;
  @Output('togglePanel') togglePanelEvent = new EventEmitter();
  equipment$ = this.buildService.equipment$;
  isLoading = false;
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

  autoSelect(event: MouseEvent) {
    this.clearAll();

    this._select('helmet', this.itemSelections.helmet);
    this._select('chestplate', this.itemSelections.chestplate);
    this._select('leggings', this.itemSelections.leggings);
    this._select('boots', this.itemSelections.boots);
    this._select('offhand', this.itemSelections.offhand);

    this.buildService.saveWhitelist();
    event?.preventDefault();
  }

  clearAll(event?: MouseEvent) {
    this.slotNames.forEach(slotName => {
      this.buildService.equipmentWhiteList[slotName] = {};
    });
    event?.preventDefault();
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

  update(event: MouseEvent) {
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

    event?.preventDefault();
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
