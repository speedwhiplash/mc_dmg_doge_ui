import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllEquipment } from '../interfaces';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  equipment: AllEquipment;

  constructor(private httpClient: HttpClient) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh() {
    this.httpClient.get('/api/equipment').subscribe((equipment: AllEquipment) => this.equipment = equipment);
  }

  update() {
    this.httpClient.get('/api/update-stats').subscribe()
  }
}
