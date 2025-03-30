import chalk from 'chalk';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const beautifyName = (name: string) =>
	(name[0].toUpperCase() + name.slice(1, name.length)).replaceAll('-', ' ');

const uglifyName = (name: string) => name.toLowerCase().replaceAll(' ', '-');

const logTitle = (txt: string) => console.log(chalk.bgBlue(txt));

export { sleep, beautifyName, uglifyName, logTitle };
