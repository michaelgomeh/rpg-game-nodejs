import { Card, EnemyCard, ItemCard } from './card';
import { CARD_TYPE } from './constants';
import { CardName, Dialog } from './types/types';

const cards: Readonly<Record<CardName, EnemyCard | ItemCard>> = {
	'wild-wolf': { type: CARD_TYPE.ENEMY, name: 'wild-wolf', att: 3, hp: 6 },
	bandit: { type: CARD_TYPE.ENEMY, name: 'bandit', att: 1, hp: 4 },
	sword: { type: CARD_TYPE.ITEM, name: 'sword', att: 2, oneTime: false },
	'travelers-map': {
		type: CARD_TYPE.ITEM,
		name: 'travelers-map',
		oneTime: false,
	},
	'health-potion': {
		type: CARD_TYPE.ITEM,
		name: 'health-potion',
		hp: 6,
		oneTime: true,
	},
	'letter-from-mom': {
		type: CARD_TYPE.ITEM,
		name: 'letter-from-mom',
		oneTime: false,
	},
} as const;

const deck: CardName[] = ['bandit', 'sword', 'wild-wolf', 'health-potion'];

const getCard: (name: CardName) => ItemCard | EnemyCard = (name: CardName) => {
	const card = cards[name];
	return card!;
};

const dialogs: Dialog = {
	mariaEncounter: [
		['$player', 'I’ve been waiting for you, Maria.'],
		['maria', '$player! You came for me... but why now?'],
		['$player', 'There is no time for explanations... we must act quickly.'],
		['maria', 'I understand... let’s go!'],
	],
	bandit: [
		['bandit', 'You dare challenge me?'],
		['$player', 'I have no choice, prepare to fight!'],
		['bandit', 'Foolish mortal! You will regret this!'],
	],
};

const initialInventory: () => ItemCard[] = () => {
	const cards: CardName[] = [
		'letter-from-mom',
		'travelers-map',
		'health-potion',
	];
	return cards.map((c) => getCard(c) as ItemCard);
};

export { dialogs, initialInventory, getCard, deck };
