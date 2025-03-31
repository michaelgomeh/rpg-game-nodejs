import { Card, EnemyCard, ItemCard } from './card';
import { CARD_TYPE } from './constants';

interface Dialog {
	[key: string]: Sentence[];
}

interface Sentence {
	[key: string]: string;
}

const cards: (EnemyCard | ItemCard)[] = [
	{ type: CARD_TYPE.ENEMY, name: 'wild-wolf', att: 3, hp: 6 },
	{ type: CARD_TYPE.ENEMY, name: 'bandit', att: 1, hp: 4 },
	{ type: CARD_TYPE.ITEM, name: 'sword', att: 2, oneTime: false },
	{
		type: CARD_TYPE.ITEM,
		name: 'travelers-map',
		oneTime: false,
	},
	{
		type: CARD_TYPE.ITEM,
		name: 'health-potion',
		hp: 6,
		oneTime: true,
	},
	{
		type: CARD_TYPE.ITEM,
		name: 'letter-from-mom',
		oneTime: false,
	},
];

const deck = ['bandit', 'sword', 'wild-wolf', 'health-potion'];

const getCard: any = (name: string) => {
	const card = cards.find((e) => e.name === name);
	return card;
};

const dialogs: Dialog = {
	mariaEncounter: [
		{ $player: 'I’ve been waiting for you, Maria.' },
		{ maria: '$player! You came for me... but why now?' },
		{ $player: 'There is no time for explanations... we must act quickly.' },
		{ maria: 'I understand... let’s go!' },
	],
	bandit: [
		{ $enemy: 'You dare challenge me?' },
		{ $player: 'I have no choice, prepare to fight!' },
		{ $enemy: 'Foolish mortal! You will regret this!' },
	],
};

const initialInventory: () => ItemCard[] = () => {
	const cards = ['letter-from-mom', 'travelers-map', 'health-potion'];
	return cards.map((c) => getCard(c) as ItemCard);
};

export { dialogs, initialInventory, getCard, deck };
