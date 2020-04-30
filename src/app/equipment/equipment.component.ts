import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AllEquipment } from '../interfaces';
import { BuildService } from '../build.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  equipment: AllEquipment = this.buildService.equipment;

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.equipment = this.buildService.equipment;
  }

  refresh() {
    this.buildService.getEquipment().subscribe(equipment => this.equipment = equipment);
  }

  update() {
    this.httpClient.get('/api/update-stats').subscribe()
  }
}
