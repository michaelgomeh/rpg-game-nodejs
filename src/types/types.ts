type DialogSentence = [string, string];
type Dialog = { [key: string]: DialogSentence[] };

type CardName =
	| 'wild-wolf'
	| 'bandit'
	| 'sword'
	| 'travelers-map'
	| 'health-potion'
	| 'letter-from-mom';

export { Dialog, DialogSentence, CardName };
