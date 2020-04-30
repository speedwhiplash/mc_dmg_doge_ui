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
    httpClient.get('/api/equipment').subscribe((equipment: AllEquipment) => this.equipment = equipment)
  }

  ngOnInit(): void {
  }

}
