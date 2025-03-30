import { CARD_TYPE } from './constants';
import { cards } from './data';

class Card {
	type: CARD_TYPE;
	name: string;

	constructor(type: CARD_TYPE, name: string) {
		this.type = type;
		this.name = name;
	}
}

class Deck {
	cards: Card[];
	constructor() {
		this.cards = cards.map((e) => new Card(e.type, e.name));
	}

	drawNextCard(): Card | undefined {
		return this.cards.pop();
	}
}

export { Card, Deck };
