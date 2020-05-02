import { Component, OnInit } from '@angular/core';
import { BobPostBodyType, EquipmentFields } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compare-all-form',
  templateUrl: './compare-all-form.component.html',
  styleUrls: ['./compare-all-form.component.scss']
})
export class CompareAllFormComponent implements OnInit {
  equipmentFields = EquipmentFields;
  playerInputs = {};
  scenarioInputs = {};
  mainhandInputs = {};

  constructor(private httpClient: HttpClient) {
    this.scenarioInputs[EquipmentFields.Damage] = 30;
    this.scenarioInputs[EquipmentFields['Hits Taken']] = 1;
    this.scenarioInputs[EquipmentFields['Damage Absorbed']] = 100;

    this.playerInputs[EquipmentFields.Armor] = 0;
    this.playerInputs[EquipmentFields['Armor Percent']] = 100;
    this.playerInputs[EquipmentFields.Health] = 20;
    this.playerInputs[EquipmentFields['Health Percent']] = 100;
    this.playerInputs[EquipmentFields.Toughness] = 0;
    this.playerInputs[EquipmentFields['Toughness Percent']] = 100;

    this.mainhandInputs[EquipmentFields.Armor] = 0;
    this.mainhandInputs[EquipmentFields['Armor Percent']] = 0;
    this.mainhandInputs[EquipmentFields.Evasion] = 0;
    this.mainhandInputs[EquipmentFields.Health] = 0;
    this.mainhandInputs[EquipmentFields['Health Percent']] = 0;
    this.mainhandInputs[EquipmentFields.Regeneration] = 0;
    this.mainhandInputs[EquipmentFields.Toughness] = 0;
    this.mainhandInputs[EquipmentFields['Toughness Percent']] = 0;
  }

  ngOnInit(): void {
  }

  submit() {
    const bob = this.assembleBob();
    this.httpClient.post('/api/bestOverallBuild', bob).subscribe();
  }

  private assembleBob() {
    let bob = {scenario:{}, player:{}, mainhand:{}} as BobPostBodyType;
    bob.scenario[EquipmentFields.Damage] = this.scenarioInputs[EquipmentFields.Damage];
    bob.scenario[EquipmentFields['Hits Taken']] = this.scenarioInputs[EquipmentFields['Hits Taken']];
    bob.scenario[EquipmentFields['Damage Absorbed']] = this.scenarioInputs[EquipmentFields['Damage Absorbed']];

    bob.player[EquipmentFields.Armor] = this.playerInputs[EquipmentFields.Armor];
    bob.player[EquipmentFields['Armor Percent']] = this.playerInputs[EquipmentFields['Armor Percent']];
    bob.player[EquipmentFields.Health] = this.playerInputs[EquipmentFields.Health];
    bob.player[EquipmentFields['Health Percent']] = this.playerInputs[EquipmentFields['Health Percent']];
    bob.player[EquipmentFields.Toughness] = this.playerInputs[EquipmentFields.Toughness];
    bob.player[EquipmentFields['Toughness Percent']] = this.playerInputs[EquipmentFields['Toughness Percent']];

    bob.mainhand[EquipmentFields.Armor] = this.mainhandInputs[EquipmentFields.Armor];
    bob.mainhand[EquipmentFields['Armor Percent']] = this.mainhandInputs[EquipmentFields['Armor Percent']];
    bob.mainhand[EquipmentFields.Evasion] = this.mainhandInputs[EquipmentFields.Evasion];
    bob.mainhand[EquipmentFields.Health] = this.mainhandInputs[EquipmentFields.Health];
    bob.mainhand[EquipmentFields['Health Percent']] = this.mainhandInputs[EquipmentFields['Health Percent']];
    bob.mainhand[EquipmentFields.Regeneration] = this.mainhandInputs[EquipmentFields.Regeneration];
    bob.mainhand[EquipmentFields.Toughness] = this.mainhandInputs[EquipmentFields.Toughness];
    bob.mainhand[EquipmentFields['Toughness Percent']] = this.mainhandInputs[EquipmentFields['Toughness Percent']];

    return bob;
  }
}
