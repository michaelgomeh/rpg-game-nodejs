import { CARD_TYPE } from './constants';
import { deck, getCard } from './data';
import { CardName } from './types/types';

interface Card {
	type: CARD_TYPE;
	name: CardName;
}

interface EnemyCard extends Card {
	att: number;
	hp: number;
}

interface ItemCard extends Card {
	att?: number;
	hp?: number;
	oneTime: boolean;
}

class Deck {
	cards: Card[];
	constructor() {
		this.cards = [...deck.map((e) => getCard(e))].reverse();
	}

	drawNextCard(): Card | undefined {
		return this.cards.pop();
	}
}

export { Deck, Card, EnemyCard, ItemCard };
