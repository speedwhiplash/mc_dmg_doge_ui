export interface Dictionary<T> {
  [key: string]: T;
}

export interface AllEquipment {
	boots: Array<IBoots>;
	chestplate: Array<IChestplate>;
	helmet: Array<IHelmet>;
	leggings: Array<ILeggings>;
	offhand: Array<IOffhand>;
}

export interface IBuild {
	boots: IBoots;
	chestplate: IChestplate;
	helmet: IHelmet;
	leggings: ILeggings;
	offhand: IOffhand;
	mainhand: IHandheld;
	player: IPlayerInputs;
}

export interface BuildIndex {
	boots: number;
	chestplate: number;
	helmet: number;
	leggings: number;
	offhand: number;
}

export interface BuildAttributesScore {
  armor: number;
  toughness: number;
  protection: number;
  evasion: number;
  regeneration: number;
  health: number;
  speed_percent: number;
  score: number;
}

export interface BuildAttributeScores {
  [key: number]: {
    build: BuildIndex;
    scores: BuildAttributesScore;
  }[];
}

export enum Slots {
	boots = 'Boots',
	chestplate = 'Chestplates',
	helmet = 'Helmets',
	leggings = 'Leggings',
	offhand = 'Offhands'
}

export interface EquipmentSelections {
  boots: Dictionary<boolean>,
  chestplate: Dictionary<boolean>,
  helmet: Dictionary<boolean>,
  leggings: Dictionary<boolean>,
  offhand: Dictionary<boolean>
}

export interface ITextFields {
	Name: string;
	Tier: Tiers;
	Type: string;
	Place: string;
}

export interface IScenarioInputs {
	Damage: number;
	'Hits Taken': number;
	'Damage Absorbed': number;
	'Health Regained': number;
	'Health Regain Percent': number;
	'Crit Chance': number;
	'Minimum Speed': number;
}

export enum PlayerFields {
	Armor = 'Armor',
	'Armor Percent' = 'Armor Percent',
	Health = 'Health',
	'Health Percent' = 'Health Percent',
	Toughness = 'Toughness',
	'Toughness Percent' = 'Toughness Percent',
	'Attack Speed' = 'Attack Speed',
	'Attack Speed Percent' = 'Attack Speed Percent',
	'Speed' = 'Speed',
	'Speed Percent' = 'Speed Percent'
}

export type PlayerInputsType = {
	[index in PlayerFields]: number
}

export interface IPlayerInputs extends PlayerInputsType {
}

export enum DefenceFields {
	Protection = 'Protection',
}

export enum HandheldFields {
	Anemia = 'Anemia',
	Armor = 'Armor',
	'Armor Percent' = 'Armor Percent',
	'Attack Speed' = 'Attack Speed',
	'Attack Speed Percent' = 'Attack Speed Percent',
	Corruption = 'Corruption',
	Damage = 'Damage',
	'Damage Absorbed' = 'Damage Absorbed',
	Evasion = 'Evasion',
	Health = 'Health',
	'Health Percent' = 'Health Percent',
	'Life Drain' = 'Life Drain',
	Regeneration = 'Regeneration',
	Toughness = 'Toughness',
	'Toughness Percent' = 'Toughness Percent',
	'Speed' = 'Speed',
	'Speed Percent' = 'Speed Percent'
}

export type HandheldType = {
	[index in HandheldFields]: number;
}

export interface IHandheld extends HandheldType, ITextFields {
}

export interface IDefenceInputs extends IHandheld {
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

export interface IOffhand extends IHandheld {
}

export interface IArmor extends IDefenceInputs {
}

export interface IHelmet extends IDefenceInputs {
}

export interface IChestplate extends IDefenceInputs {
}

export interface ILeggings extends IDefenceInputs {
}

export interface IBoots extends IDefenceInputs {
}

export interface IBobInputs {
	scenario: IScenarioInputs,
	player: IPlayerInputs,
	mainhand: IHandheld,
	whitelist: EquipmentSelections
}
