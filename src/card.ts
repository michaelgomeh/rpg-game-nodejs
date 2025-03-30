import { cards } from './data';

interface CardData {
	type: string;
	name: string;
}

class Card {
	type: string;
	name: string;

	constructor(type: string, name: string) {
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
