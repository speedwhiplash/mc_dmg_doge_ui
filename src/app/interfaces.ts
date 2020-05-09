export interface AllEquipment {
  boots: Array<Boots>;
  chestplate: Array<Chestplate>;
  helmet: Array<Helmet>;
  leggings: Array<Leggings>;
  offhand: Array<Offhand>;
}

export interface Build {
  boots: Boots;
  chestplate: Chestplate;
  helmet: Helmet;
  leggings: Leggings;
  offhand: Offhand;
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
  leggings = 'leggings',
  offhand = 'Offhands'
}

export enum EquipmentFields {
  Armor = 'Armor',
  'Armor Percent' = 'Armor Percent',
// Curses: Array<string>;
  Damage = 'Damage',
  'Damage Absorbed' = 'Damage Absorbed',
  Evasion = 'Evasion',
  Health = 'Health',
  'Health Percent' = 'Health Percent',
  'Hits Taken' = 'Hits Taken',
  Name = 'Name',
  Place = 'Place',
  Protection = 'Protection',
  Regeneration = 'Regeneration',
// Slot: Slots;
  Tier = 'Tier',
  Toughness = 'Toughness',
  'Toughness Percent' = 'Toughness Percent',
  'Type' = 'Type'
}

export type BestOverallBuildFields = {
  //TODO: Itemize this
  [key in EquipmentFields]?: number;
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

export type Player = {
  [index in EquipmentFields]: number | string
}

export type Equipment = {
  [key in EquipmentFields]?: number | string;
}

export interface Offhand extends Equipment {
}

export interface Armor extends Equipment {
  protection: number;
}

export interface Helmet extends Armor {
}

export interface Chestplate extends Armor {
}

export interface Leggings extends Armor {
}

export interface Boots extends Armor {
}

export interface BobPostBodyType {
  scenario: {
    Damage: number;
    'Hits Taken': number;
    'Damage Absorbed': number;
  },
  player: {
    Armor: number;
    'Armor Percent': number;
    Health: number;
    'Health Percent': number;
    Toughness: number;
    'Toughness Percent': number;
  },
  mainhand: {
    Armor: number;
    'Armor Percent': number;
    Evasion: number;
    Regeneration: number;
    Health: number;
    'Health Percent': number;
    Toughness: number;
    'Toughness Percent': number;
  }
}
