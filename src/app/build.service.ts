import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AllEquipment, Build, BuildIndex } from './interfaces';

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

  constructor(private httpClient: HttpClient) {
    this.getEquipment()
      .pipe(
        tap((equipment: AllEquipment) => this.equipment$.next(equipment))
      )
      .subscribe();
  }

  getBuild(build: BuildIndex): Build {
    const equipment = this.equipment$.getValue();
    return <Build>{
      boots: {...equipment.boots[build.boots]},
      chestplate: {...equipment.chestplate[build.chestplate]},
      helmet: {...equipment.helmet[build.helmet]},
      leggings: {...equipment.leggings[build.leggings]},
      offhand: {...equipment.offhand[build.offhand]}
    }
  }

  getEquipment() {
    return this.httpClient.get('/api/equipment')
  }
}
