import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AllEquipment, Build, BuildIndex } from './interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  equipment: AllEquipment;
  selectedBuild: BuildIndex = {
    boots: 0,
    chestplate: 0,
    helmet: 0,
    legging: 0,
    offhand: 0,
  }

  constructor(private httpClient: HttpClient) {
    this.getEquipment();
  }

  getBuild(build: BuildIndex): Build {
    return <Build>{
      boots: this.equipment.boots[build.boots],
      chestplate: this.equipment.chestplates[build.chestplate],
      helmet: this.equipment.helmets[build.helmet],
      legging: this.equipment.leggings[build.legging],
      offhand: this.equipment.offhands[build.offhand],
    }
  }

  getEquipment() {
    return this.httpClient.get('/api/equipment')
      .pipe(
        tap((equipment: AllEquipment) => this.equipment = equipment)
      )
  }
}
