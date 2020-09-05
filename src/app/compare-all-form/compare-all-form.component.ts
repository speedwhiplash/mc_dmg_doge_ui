import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AllEquipment, BuildAttributeScores, HandheldType, IBobInputs, IScenarioInputs, PlayerInputsType } from '../interfaces';
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
  mainhandInputs = <HandheldType> {};
  playerInputs = <PlayerInputsType> {};
  scenarioInputs = <IScenarioInputs> {};

  constructor(
    private buildService: BuildService,
    private httpClient: HttpClient
  ) {
    this.scenarioInputs.Damage = 22;
    this.scenarioInputs['Hits Taken'] = 1;
    this.scenarioInputs['Damage Absorbed'] = 100;
    this.scenarioInputs['Health Regained'] = 0;
    this.scenarioInputs['Health Regain Percent'] = 0;
    this.scenarioInputs['Crit Chance'] = 0;
    this.scenarioInputs['Minimum Speed'] = 100;

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

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    const bob = this.assembleBob();

    this.httpClient.post('/api/bob/defense', bob).subscribe((response: Record<number, BuildAttributeScores[]>) => {
      this.isLoading = false;
      //TODO: Convert names into BuildIndexes
      this.bestBuilds$.emit(this.transformNamesToIndexes(response, this.buildService.equipment$.getValue()));
    });
  }

  private assembleBob() {
    let bob = {scenario: {}, player: {}, mainhand: {}} as IBobInputs;
    bob.scenario.Damage = this.scenarioInputs.Damage;
    bob.scenario['Hits Taken'] = this.scenarioInputs['Hits Taken'];
    bob.scenario['Damage Absorbed'] = this.scenarioInputs['Damage Absorbed'];
    bob.scenario['Health Regained'] = this.scenarioInputs['Health Regained'];
    bob.scenario['Health Regain Percent'] = this.scenarioInputs['Health Regain Percent'];
    bob.scenario['Crit Chance'] = this.scenarioInputs['Crit Chance'];
    bob.scenario['Minimum Speed'] = this.scenarioInputs['Minimum Speed'];

    bob.player.Armor = this.playerInputs.Armor;
    bob.player['Armor Percent'] = this.playerInputs['Armor Percent'];
    bob.player['Attack Speed'] = this.playerInputs['Attack Speed'];
    bob.player['Attack Speed Percent'] = this.playerInputs['Attack Speed Percent'];
    bob.player.Health = this.playerInputs.Health;
    bob.player['Health Percent'] = this.playerInputs['Health Percent'];
    bob.player.Toughness = this.playerInputs.Toughness;
    bob.player['Toughness Percent'] = this.playerInputs['Toughness Percent'];
    bob.player.Speed = this.playerInputs.Speed;
    bob.player['Speed Percent'] = this.playerInputs['Speed Percent'];

    bob.mainhand.Anemia = this.mainhandInputs.Anemia;
    bob.mainhand.Armor = this.mainhandInputs.Armor;
    bob.mainhand['Armor Percent'] = this.mainhandInputs['Armor Percent'];
    bob.mainhand['Attack Speed'] = this.mainhandInputs['Attack Speed'];
    bob.mainhand['Attack Speed Percent'] = this.mainhandInputs['Attack Speed Percent'];
    bob.mainhand.Corruption = this.mainhandInputs.Corruption;
    bob.mainhand.Evasion = this.mainhandInputs.Evasion;
    bob.mainhand.Health = this.mainhandInputs.Health;
    bob.mainhand['Health Percent'] = this.mainhandInputs['Health Percent'];
    bob.mainhand['Life Drain'] = this.mainhandInputs['Life Drain'];
    bob.mainhand.Regeneration = this.mainhandInputs.Regeneration;
    bob.mainhand.Toughness = this.mainhandInputs.Toughness;
    bob.mainhand['Toughness Percent'] = this.mainhandInputs['Toughness Percent'];

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
