'use strict';

// @ts-ignore
import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import {StockAlarmFactory} from "./alarm/StockAlarmFactory";
import StockAlarm from "./alarm/StockAlarm";

(async () => {
	try {
		// const { APP_KEY } = process.env;
		const APP_KEY: string = 'DART-DISCLOSURE';

		await StockAlarmFactory.init();

		const configuration = StockAlarmFactory.getConfiguration();
		const { crons } = configuration;
		const cron = crons[APP_KEY];

		const bundles = StockAlarmFactory.getInstance(APP_KEY);
		StockAlarm.init(bundles);
		StockAlarm.execute(cron);
	} catch (e) {
		console.error(e);
	}
})();

