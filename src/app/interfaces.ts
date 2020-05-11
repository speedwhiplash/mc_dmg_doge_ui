export interface AllEquipment {
  boots: Array<IBoots>;
  chestplate: Array<IChestplate>;
  helmet: Array<IHelmet>;
  leggings: Array<ILeggings>;
  offhand: Array<IOffhand>;
}

export interface Build {
  boots: IBoots;
  chestplate: IChestplate;
  helmet: IHelmet;
  leggings: ILeggings;
  offhand: IOffhand;
}

export interface BuildIndex {
  boots: number;
  chestplate: number;
  helmet: number;
  leggings: number;
  offhand: number;
}

export enum Slots {
  boots = 'Boots',
  chestplate = 'Chestplates',
  helmet = 'Helmets',
  leggings = 'Leggings',
  offhand = 'Offhands'
}

export interface IScenarioInputs {
  Damage: number;
  'Hits Taken': number;
  'Damage Absorbed': number;
}

export enum PlayerFields {
  Armor = 'Armor',
  'Armor Percent' = 'Armor Percent',
  Health = 'Health',
  'Health Percent' = 'Health Percent',
  Toughness = 'Toughness',
  'Toughness Percent' = 'Toughness Percent',
}

export type PlayerInputsType = {
  [index in PlayerFields]: number
}

export enum DefenceFields {
  Protection = 'Protection',
}

export enum HandheldFields {
  Armor = 'Armor',
  'Armor Percent' = 'Armor Percent',
  Damage = 'Damage',
  'Damage Absorbed' = 'Damage Absorbed',
  Evasion = 'Evasion',
  Health = 'Health',
  'Health Percent' = 'Health Percent',
  Regeneration = 'Regeneration',
  Toughness = 'Toughness',
  'Toughness Percent' = 'Toughness Percent',
}

export type HandheldType = {
  [index in HandheldFields]: number;
}

export interface DefenceInputsType extends HandheldType {
  Protection: number;
}

export enum Tiers {
  'Tier I' = 'Tier 1',
  'Tier II' = 'Tier II',
  'Tier III' = 'Tier III',
  'Tier IV' = 'Tier IV',
  'Tier V' = 'Tier V',
  'Uncommon' = 'Uncommon',
  'Unique' = 'Unique',
  'Event Unique' = 'Event Unique',
  'Patron Made' = 'Patron Made',
  'Rare' = 'Rare',
  'Relic' = 'Relic',
  'Artifact' = 'Artifact',
  'Epic' = 'Epic'
}

export interface IOffhand extends HandheldType {
}

export interface IArmor extends DefenceInputsType {
}

export interface IHelmet extends DefenceInputsType {
}

export interface IChestplate extends DefenceInputsType {
}

export interface ILeggings extends DefenceInputsType {
}

export interface IBoots extends DefenceInputsType {
}

export interface IBobInputs {
  scenario: IScenarioInputs;
  player: PlayerInputsType;
  mainhand: DefenceInputsType;
}
