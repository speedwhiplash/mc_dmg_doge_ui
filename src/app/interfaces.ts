export interface AllEquipment {
	boots: Array<Boots>;
	chestplates: Array<Chestplate>;
	helmets: Array<Helmet>;
	leggings: Array<Leggings>;
	mainhands: Array<Mainhand>;
	offhands: Array<Offhand>;
}

export interface Build {
	boots: Boots;
	chestplate: Chestplate;
	helmet: Helmet;
	legging: Leggings;
	mainhand: Mainhand;
	offhand: Offhand;
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

export enum Slots {
	'Chest' = 'Chest',
	'Feet' = 'Feet',
	'Head' = 'Head',
	'Legs' = 'Legs',
	'Mainhand' = 'Mainhand',
	'Offhand' = 'Offhand'
}

export interface Equipment {
	armor: number;
	armor_per: number;
	curses: Array<string>;
	evasion: number;
	health: number;
	health_per: number;
	place: string;
	name: string;
	regeneration: number;
	slot: Slots;
	tier: Tiers;
	toughness: number;
	toughness_per: number;
	type: string;
}

export interface Offhand extends Equipment {
}

export interface Mainhand extends Equipment {
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
