import Character from './character';
import { enemyStat, dialogs } from './data';

class Enemy extends Character {
	constructor(name: string) {
		const { hp, att } = enemyStat[name];
		super(name, hp, att);
	}
}

export default Enemy;
