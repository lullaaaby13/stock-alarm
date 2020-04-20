'use strict';

// @ts-ignore
import {StockAlarmFactory} from "./alarm/StockAlarmFactory";
import StockAlarm from "./alarm/StockAlarm";
import sequelize from "./infrastructure/database/sequelize";

(async () => {
	try {
		await sequelize.sync({ force: false });

		const APP_KEY = process.env.APP_KEY || '';
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

