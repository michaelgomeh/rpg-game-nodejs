import { CARD_TYPE } from './constants';
import { deck, getCard } from './data';

interface Card {
	type: CARD_TYPE;
	name: string;
}

interface EnemyCard extends Card {
	name: string;
	att: number;
	hp: number;
}

interface ItemCard extends Card {
	name: string;
	att?: number;
	hp?: number;
	oneTime: boolean;
}

class Deck {
	cards: Card[];
	constructor() {
		this.cards = [...deck.map((e) => getCard(e))].reverse();
		console.log('deck is: ', this.cards);
	}

	drawNextCard(): Card | undefined {
		return this.cards.pop();
	}
}

export { Deck, Card, EnemyCard, ItemCard };
