import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AllEquipment, BuildAttributeScores, BuildIndex, IBobInputs, IBuild, Slots } from './interfaces';

export const MAX_ALLOWED_COMPARE_ITEMS = 80;

@Injectable({providedIn: 'root'})
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
  };
  equipmentWhiteList = {
    boots: {},
    chestplate: {},
    helmet: {},
    leggings: {},
    offhand: {},
  };
  bestBuilds$ = new BehaviorSubject(<Record<number, BuildAttributeScores[]>> {});
  maxServers = 8;
  serverPortsEnabled: number[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadWhitelist();
    this.detectServers();

    this.getEquipment$().subscribe(equipment => {
      for (let f in Slots) {
        Object.keys(this.equipmentWhiteList[f]).forEach(name => {
          if (!equipment[f].find(item => item.Name === name)) {
            delete this.equipmentWhiteList[f][name];
          }
        });
      }
      this.saveWhitelist();
    });
  }

  detectServers() {
    for (let i = 0, l = this.maxServers; i < l; i++) {
      this.httpClient.get(`multiapi${i}/status`)
        .subscribe((status: { status: string, port: number }) => {
          this.serverPortsEnabled.push(status.port);
          console.log()
        });
    }
  }

  getBuild(build: BuildIndex): IBuild {
    const equipment = this.equipment$.getValue();
    return <IBuild> {
      boots: {...equipment.boots[build.boots]},
      chestplate: {...equipment.chestplate[build.chestplate]},
      helmet: {...equipment.helmet[build.helmet]},
      leggings: {...equipment.leggings[build.leggings]},
      offhand: {...equipment.offhand[build.offhand]}
    };
  }

  getEquipment$() {
    return this.httpClient.get('/api/equipment')
      .pipe(
        tap((equipment: AllEquipment) => this.equipment$.next(equipment))
      );
  }

  loadWhitelist() {
    const equipmentWhiteList = localStorage.getItem('equipmentWhiteList');
    if (equipmentWhiteList) {
      this.equipmentWhiteList = JSON.parse(equipmentWhiteList);
    }
  }

  saveWhitelist() {
    localStorage.setItem('equipmentWhiteList', JSON.stringify(this.equipmentWhiteList));
  }

  runScenario(bob: IBobInputs) {
    return this.httpClient.post('/api/bob/defense', bob)
      .pipe(tap((bestBuilds: Record<number, BuildAttributeScores[]>) => this.bestBuilds$.next(bestBuilds)));
  }
}
