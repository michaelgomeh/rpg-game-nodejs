import { cards } from './data.js';

class Card {
	constructor(type, name) {
		this.type = type;
		this.name = name;
	}
}

class Deck {
	constructor() {
		this.cards = cards.map((e) => new Card(e.type, e.name));
	}

	drawNextCard() {
		return this.cards.pop();
	}
}

export { Card, Deck };
