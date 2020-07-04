import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AllEquipment, BuildIndex, IBuild, Slots } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class BuildService {
  equipment$: BehaviorSubject<AllEquipment> = new BehaviorSubject({
    boots: [],
    chestplate: [],
    helmet: [],
    leggings: [],
    offhand: []
  });
  defaultBuild: BuildIndex = {
    boots: 0,
    chestplate: 0,
    helmet: 0,
    leggings: 0,
    offhand: 0,
  }
  equipmentWhiteList = {
    boots: {},
    chestplate: {},
    helmet: {},
    leggings: {},
    offhand: {},
  }

  constructor(private httpClient: HttpClient) {
    const equipmentWhiteList = localStorage.getItem('equipmentWhiteList');
    if (equipmentWhiteList) {
      this.equipmentWhiteList = JSON.parse(equipmentWhiteList);
    }

    this.getEquipment$().subscribe(equipment => {
      for (let f in Slots) {
        Object.keys(this.equipmentWhiteList[f]).forEach(name => {
          if (!equipment[f].find(item => item.Name === name)) {
            delete this.equipmentWhiteList[f][name];
          }
        })
      }
      localStorage.setItem('equipmentWhiteList', JSON.stringify(this.equipmentWhiteList));
    });
  }

  getBuild(build: BuildIndex): IBuild {
    const equipment = this.equipment$.getValue();
    return <IBuild>{
      boots: {...equipment.boots[build.boots]},
      chestplate: {...equipment.chestplate[build.chestplate]},
      helmet: {...equipment.helmet[build.helmet]},
      leggings: {...equipment.leggings[build.leggings]},
      offhand: {...equipment.offhand[build.offhand]}
    }
  }

  getEquipment$() {
    return this.httpClient.get('/api/equipment')
      .pipe(
        tap((equipment: AllEquipment) => this.equipment$.next(equipment))
      )
  }
}
