import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  equipment = [];

  constructor(private httpClient: HttpClient) {
    httpClient.get('/api/equipment').subscribe((equipment: any) => this.equipment = equipment)
  }

  ngOnInit(): void {
  }

}
