export interface AllEquipment {
  boots: Array<Boots>;
  chestplates: Array<Chestplate>;
  helmets: Array<Helmet>;
  leggings: Array<Leggings>;
  offhands: Array<Offhand>;
}

export interface Build {
  boots: Boots;
  chestplate: Chestplate;
  helmet: Helmet;
  legging: Leggings;
  offhand: Offhand;
}

export interface BuildIndex {
  boots: number;
  chestplate: number;
  helmet: number;
  legging: number;
  offhand: number;
}

export interface PlayerStats {

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

export interface Equipment {
  Armor: number;
  'Armor Percent': number;
  // Curses: Array<string>;
  Evasion: number;
  Health: number;
  'Health Percent': number;
  Place: string;
  Name: string;
  Regeneration: number;
  // Slot: Slots;
  Tier: Tiers;
  Toughness: number;
  'Toughness Percent': number;
  Type: string;
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
