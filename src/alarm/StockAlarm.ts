interface StockAlarmDependencies {
	a: string;
	b: string;
}

export default class StockAlarm {
	a: string;
	b: string;

	constructor({ a, b }: StockAlarmDependencies) {
		this.a = a;
		this.b = b;
	}

	test(): void {
		console.log(this.a + ' ' + this.b);
		console.log(process.env.test);
	}
}
