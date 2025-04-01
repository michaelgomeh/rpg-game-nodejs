type DialogSentence = [string, string];
type Dialog = { [key: string]: DialogSentence[] };

type CardName =
	| 'chapel-of-rust'
	| 'streets-of-desolation'
	| 'castle-of-silence'
	| 'wild-wolf'
	| 'bandit'
	| 'sword'
	| 'travelers-map'
	| 'health-potion'
	| 'letter-from-mom';

export { Dialog, DialogSentence, CardName };
