import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { BuildService } from '../build.service';
import { IDefenceInputs } from '../interfaces';

@Component({
  selector: 'app-select-equipment',
  templateUrl: './select-equipment.component.html',
  styleUrls: ['./select-equipment.component.scss']
})
export class SelectEquipmentComponent implements OnInit {
  @Input('equipmentSlot') equipmentSlot: IDefenceInputs[];
  @Input('slotName') slotName: string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<IDefenceInputs>;
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
  isExpanded = true;
  private isAlive = true;

  constructor(
    private buildService: BuildService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.equipmentSlot);
    this.dataSource.sort = this.sort;
  }

  getColumns(slot) {
    if (slot === 'offhand') {
      return this.displayedColumns.filter(col => col !== 'Protection');
    }
    return this.displayedColumns;
  }

  getDataSource(slot) {
    return new MatTableDataSource(this.buildService.equipment$.getValue()[slot]);
  }

  isAllChecked(slot) {
    return this.buildService.equipment$.getValue()[slot].length === Object.keys(this.buildService.equipmentWhiteList[slot]).length;
  }

  isSelected(slot, item) {
    return !!this.buildService.equipmentWhiteList[slot][item.Name];
  }

  numberSelected(slot): number {
    return Object.keys(this.buildService.equipmentWhiteList[slot]).length;
  }

  toggleItem(slot, item): void {
    const isSelected = this.buildService.equipmentWhiteList[slot][item.Name];
    this.selectItem(slot, item, !isSelected);
    this.buildService.saveWhitelist();
  }

  toggleSelectAll(slot): void {
    const isAllSelected = this.isAllChecked(slot);
    this.buildService.equipment$.getValue()[slot].forEach(item => this.selectItem(slot, item, !isAllSelected));
    this.buildService.saveWhitelist();
  }

  private selectItem(slot, item, isSelected) {
    if (isSelected) {
      this.buildService.equipmentWhiteList[slot][item.Name] = true;
    } else {
      delete this.buildService.equipmentWhiteList[slot][item.Name];
    }
  }
}
