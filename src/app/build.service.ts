import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AllEquipment, BuildAttributeScores, BuildIndex, DictionaryNum, IBobInputs, IBuild, Slots } from './interfaces';

interface ServerStatusEvent {
  port: number;
  isReady: boolean;
}

const MAX_SERVERS = 4;

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
  calculationsRemaining$ = new BehaviorSubject(0);
  private scoreQueue: IBobInputs[] = [];
  private serverStatuses: DictionaryNum<boolean> = {};
  private serverStatusEvent = new EventEmitter<ServerStatusEvent>(true);

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

    this.serverStatusEvent.subscribe((upd: ServerStatusEvent) => {
      this.serverStatuses[upd.port] = upd.isReady;
      if (upd.isReady) {
        this.nextInQueue(upd.port);
      }

    });
  }

  detectServers() {
    for (let i = 3000, l = MAX_SERVERS; i < (3000 + l); i++) {
      this.httpClient.get(`multiapi${i}/status`)
        .subscribe((status: { status: number, port: number }) => {
          this.serverStatusEvent.emit({port: +status.port, isReady: status.status === 200});
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

  // Returns single result directly to caller as well as this.bestBuilds$
  runScenario(bob: IBobInputs) {
    return this.httpClient.post('/api/bob/defense', bob)
      .pipe(tap((bestBuilds: Record<number, BuildAttributeScores[]>) => this.bestBuilds$.next(bestBuilds)));
  }

  runScenarioMulti(bob: IBobInputs, equipmentSlot: string) {
    this.bestBuilds$.next([]);
    const items = Object.keys(bob.whitelist[equipmentSlot]);
    items.forEach(itemName => {
      let oneItem = {};
      oneItem[itemName] = true;
      let whitelist = {...bob.whitelist};
      whitelist[equipmentSlot] = oneItem;
      this.scoreQueue.push({...bob, whitelist});
    });

    this.calculationsRemaining$.next(+this.scoreQueue.length);
    this.startQueue();
  }

  private mergeBestBuilds(bestBuilds: Record<number, BuildAttributeScores[]>) {
    let allBestBuilds = this.bestBuilds$.getValue();
    let scores = Object.keys(allBestBuilds).sort();
    let worstScore = scores[scores.length - 1] || 9;
    Object.keys(bestBuilds).forEach(score => {
      if (score <= worstScore) {
        bestBuilds[score].forEach(bas => {
          allBestBuilds[score] = [...(allBestBuilds[score] || []), {build: bas.build, scores: bas.scores}];
        })

        let scores = Object.keys(allBestBuilds).map(score => +score).sort();
        if (scores.length > 15) {
          delete allBestBuilds[scores[15]];
        }
      }
    });
    this.bestBuilds$.next(allBestBuilds);
  }

  private nextInQueue(port: number) {
    if (this.scoreQueue.length === 0) {
      return;
    }
    this.serverStatusEvent.emit({port, isReady: false});
    this.runScenarioMultiWorker(this.scoreQueue.pop(), port)
      .subscribe((bestBuilds: Record<number, BuildAttributeScores[]>) => {
        this.serverStatusEvent.emit({port, isReady: true});
        timer(0).subscribe(() =>
          this.calculationsRemaining$.next(this.scoreQueue.length + Object.keys(this.serverStatuses).filter(sport => !this.serverStatuses[sport]).length)
        );
        this.mergeBestBuilds(bestBuilds);
      });
    timer(1).subscribe(() => this.startQueue());
  }

  private runScenarioMultiWorker(bob: IBobInputs, workerId: number) {
    return this.httpClient.post(`/multiapi${workerId}/bob/defense`, bob);
  }

  private startQueue() {
    const availableServer = +Object.keys(this.serverStatuses).find(port => this.serverStatuses[+port] === true);
    if (availableServer) {
      this.nextInQueue(availableServer);
    }
  }
}
