class Character {
	name: string;
	hp: number;
	att: number;

	constructor(name: string, hp: number, att: number) {
		this.name = name;
		this.hp = hp;
		this.att = att;
	}

	getDamage(amount: number): void {
		const newHP = Math.max(this.hp - amount, 0);
		this.hp = newHP;
		console.log(`${this.name} got 🩸 ${amount}`);
	}
}

export default Character;
