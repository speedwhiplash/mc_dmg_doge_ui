import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BuildScores, HandheldType, IBobInputs, IScenarioInputs, PlayerInputsType } from '../interfaces';

@Component({
  selector: 'app-compare-all-form',
  templateUrl: './compare-all-form.component.html',
  styleUrls: ['./compare-all-form.component.scss']
})
export class CompareAllFormComponent implements OnInit {
  @Output('bestBuilds$') bestBuilds$ = new EventEmitter<Record<number, BuildScores[]>>();
  isLoading = false;
  mainhandInputs = <HandheldType>{};
  playerInputs = <PlayerInputsType>{};
  scenarioInputs = <IScenarioInputs>{};

  constructor(private httpClient: HttpClient) {
    this.scenarioInputs.Damage = 30;
    this.scenarioInputs['Hits Taken'] = 1;
    this.scenarioInputs['Damage Absorbed'] = 100;
    this.scenarioInputs['Health Regained'] = 0;
    this.scenarioInputs['Health Regain Percent'] = 0;

    this.playerInputs.Armor = 0;
    this.playerInputs['Armor Percent'] = 100;
    this.playerInputs.Health = 20;
    this.playerInputs['Health Percent'] = 100;
    this.playerInputs.Toughness = 0;
    this.playerInputs['Toughness Percent'] = 100;

    this.mainhandInputs.Armor = 0;
    this.mainhandInputs['Armor Percent'] = 0;
    this.mainhandInputs.Evasion = 0;
    this.mainhandInputs.Health = 0;
    this.mainhandInputs['Health Percent'] = 0;
    this.mainhandInputs.Regeneration = 0;
    this.mainhandInputs.Toughness = 0;
    this.mainhandInputs['Toughness Percent'] = 0;
  }

  ngOnInit(): void {
  }

  submit() {
    this.isLoading = true;
    const bob = this.assembleBob();

    this.httpClient.post('/api/bob/defense', bob).subscribe((response: Record<number, BuildScores[]>) => {
      this.isLoading = false;
      this.bestBuilds$.emit(response)
    });
  }

  private assembleBob() {
    let bob = {scenario: {}, player: {}, mainhand: {}} as IBobInputs;
    bob.scenario.Damage = this.scenarioInputs.Damage;
    bob.scenario['Hits Taken'] = this.scenarioInputs['Hits Taken'];
    bob.scenario['Damage Absorbed'] = this.scenarioInputs['Damage Absorbed'];
    bob.scenario['Health Regained'] = this.scenarioInputs['Health Regained'];
    bob.scenario['Health Regain Percent'] = this.scenarioInputs['Health Regain Percent'];

    bob.player.Armor = this.playerInputs.Armor;
    bob.player['Armor Percent'] = this.playerInputs['Armor Percent'];
    bob.player.Health = this.playerInputs.Health;
    bob.player['Health Percent'] = this.playerInputs['Health Percent']
    bob.player.Toughness = this.playerInputs.Toughness;
    bob.player['Toughness Percent'] = this.playerInputs['Toughness Percent'];

    bob.mainhand.Armor = this.mainhandInputs.Armor;
    bob.mainhand['Armor Percent'] = this.mainhandInputs['Armor Percent'];
    bob.mainhand.Evasion = this.mainhandInputs.Evasion;
    bob.mainhand.Health = this.mainhandInputs.Health;
    bob.mainhand['Health Percent'] = this.mainhandInputs['Health Percent']
    bob.mainhand.Regeneration = this.mainhandInputs.Regeneration;
    bob.mainhand.Toughness = this.mainhandInputs.Toughness;
    bob.mainhand['Toughness Percent'] = this.mainhandInputs['Toughness Percent'];

    return bob;
  }
}
