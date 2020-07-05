import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatAccordion } from '@angular/material/expansion';
import { catchError, retry, switchMap, takeWhile } from 'rxjs/operators';

import { BuildService, MAX_ALLOWED_COMPARE_ITEMS } from '../build.service';
import { IBoots, Slots, Tiers } from '../interfaces';

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

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  autoSelect() {
    this.clearAll();

    this.slotNames.forEach(slotName => {
      this.getEquipmentSlot(slotName)
        .filter(item => {
          return !item.Tier.includes('Tier') && !item.Tier.includes('Event Unique');
        })
        .forEach(item => this.buildService.equipmentWhiteList[slotName][item.Name] = true);
    });

    this.buildService.saveWhitelist();
  }

  clearAll() {
    this.slotNames.forEach(slotName => {
      this.buildService.equipmentWhiteList[slotName] = {};
    });
  }

  getEquipmentSlot(slot): IBoots[] {
    return this.equipment$.getValue()[slot];
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
}
