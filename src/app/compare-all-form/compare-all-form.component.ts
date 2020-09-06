import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  AllEquipment,
  BuildAttributeScores,
  HandheldFields,
  HandheldType,
  IBobInputs,
  IScenarioInputs,
  PlayerFields,
  PlayerInputsType,
  ScenarioFields
} from '../interfaces';
import { BuildService } from '../build.service';
import { clone } from '../utils';

@Component({
  selector: 'app-compare-all-form',
  templateUrl: './compare-all-form.component.html',
  styleUrls: ['./compare-all-form.component.scss']
})
export class CompareAllFormComponent implements OnInit {
  @Output('bestBuilds$') bestBuilds$ = new EventEmitter<Record<number, BuildAttributeScores[]>>();
  isLoading = false;
  mainhandInputs = <HandheldType> (JSON.parse(localStorage.getItem('mainhand')) || {});
  playerInputs = <PlayerInputsType> (JSON.parse(localStorage.getItem('player')) || {});
  scenarioInputs = <IScenarioInputs> (JSON.parse(localStorage.getItem('scenario')) || {});

  constructor(
    private buildService: BuildService
  ) {
    if (Object.keys(this.scenarioInputs).length === 0) {
      this.scenarioInputs.Damage = 22;
      this.scenarioInputs['Hits Taken'] = 1;
      this.scenarioInputs['Damage Absorbed'] = 100;
      this.scenarioInputs['Health Regained'] = 0;
      this.scenarioInputs['Health Regain Percent'] = 0;
      this.scenarioInputs['Crit Chance'] = 0;
      this.scenarioInputs['Minimum Speed'] = 100;
    }

    if (Object.keys(this.playerInputs).length === 0) {
      this.playerInputs.Armor = 0;
      this.playerInputs['Armor Percent'] = 100;
      this.playerInputs['Attack Speed'] = 0;
      this.playerInputs['Attack Speed Percent'] = 100;
      this.playerInputs.Health = 20;
      this.playerInputs['Health Percent'] = 100;
      this.playerInputs.Toughness = 0;
      this.playerInputs['Toughness Percent'] = 100;
      this.playerInputs['Speed'] = 0.1;
      this.playerInputs['Speed Percent'] = 100;
    }

    if (Object.keys(this.mainhandInputs).length === 0) {
      this.mainhandInputs.Anemia = 0;
      this.mainhandInputs.Armor = 0;
      this.mainhandInputs['Armor Percent'] = 0;
      this.mainhandInputs['Attack Speed'] = 0;
      this.mainhandInputs['Attack Speed Percent'] = 0;
      this.mainhandInputs.Corruption = 0;
      this.mainhandInputs.Evasion = 0;
      this.mainhandInputs.Health = 0;
      this.mainhandInputs['Health Percent'] = 0;
      this.mainhandInputs['Life Drain'] = 0;
      this.mainhandInputs.Regeneration = 0;
      this.mainhandInputs.Toughness = 0;
      this.mainhandInputs['Toughness Percent'] = 0;
    }

    this.buildService.isCalculating$.subscribe(isCalculating => this.isLoading = isCalculating);
  }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    const bob = this.assembleBob();

    localStorage.setItem('scenario', JSON.stringify(bob.scenario));
    localStorage.setItem('player', JSON.stringify(bob.player));
    localStorage.setItem('mainhand', JSON.stringify(bob.mainhand));

    const itemSlots = Object.keys(bob.whitelist);
    let bestSlot = '';
    let maxItems = 0;
    itemSlots.forEach(itemName => {
      const itemsCount = Object.keys(bob.whitelist[itemName]).length;
      if (itemsCount > maxItems) {
        bestSlot = itemName;
        maxItems = itemsCount;
      }
    });

    this.buildService.runScenarioMulti(bob, bestSlot);

      // .subscribe((response: Record<number, BuildAttributeScores[]>) => {
      //   this.isLoading = false;
        //TODO: Convert names into BuildIndexes
        // this.bestBuilds$.emit(this.transformNamesToIndexes(response, this.buildService.equipment$.getValue()));
      // });
  }

  private assembleBob() {
    let bob = {scenario: {}, player: {}, mainhand: {}} as IBobInputs;
    Object.keys(ScenarioFields).forEach(sf => bob.scenario[sf] = this.scenarioInputs[sf]);
    Object.keys(PlayerFields).forEach(pf => bob.player[pf] = this.playerInputs[pf]);
    Object.keys(HandheldFields).forEach(hf => bob.mainhand[hf] = this.mainhandInputs[hf]);
    bob.whitelist = clone(this.buildService.equipmentWhiteList);
    return bob;
  }

  private transformNamesToIndexes(scores, equipment: AllEquipment) {
    const scoreKeys = Object.keys(scores);
    let buildScores: BuildAttributeScores = {};
    scoreKeys.forEach(scoreKey => {
      buildScores[scoreKey] = [];
      scores[scoreKey].forEach(item => {
        buildScores[scoreKey].push({
          build: {
            helmet: equipment.helmet.findIndex(helmet => helmet.Name === item.build.helmet),
            chestplate: equipment.chestplate.findIndex(chestplate => chestplate.Name === item.build.chestplate),
            leggings: equipment.leggings.findIndex(leggings => leggings.Name === item.build.leggings),
            boots: equipment.boots.findIndex(boots => boots.Name === item.build.boots),
            offhand: equipment.offhand.findIndex(offhand => offhand.Name === item.build.offhand)
          },
          scores: {...item.scores}
        });
      });
    });
    return buildScores;
  }
}
