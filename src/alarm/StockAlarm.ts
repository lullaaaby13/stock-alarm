import DataSourceFrom from "./datasource/DataSourceFrom";
import {BeanBundle} from "./StockAlarmFactory";
import Processor from "./processor/Processor";
import MessageSender from "./sender/MessageSender";
import util from "util";
import fs from "fs";
import delay from "delay";
import schedule from 'node-schedule';

const readFile = util.promisify(fs.readFile);
const environment = process.env.NODE_ENV || 'development';

interface StockAlarmDependencies {
	dataSourceFrom: DataSourceFrom;
}

export default class StockAlarm {

	_self: StockAlarm = new StockAlarm();

	private static dataSourceFrom: DataSourceFrom;
	private static processor: Processor;
	private static senders: MessageSender[];

	static async init({ dataSourceFrom, processor, senders }: BeanBundle) {
		this.dataSourceFrom = dataSourceFrom;
		this.processor = processor;
		this.senders = senders;
	}

	static async execute(cron: string) {

		if (environment === 'development') {
			console.log('Job start');

			const dataSource = await this.dataSourceFrom.fetch();
			const alarmMessages = this.processor.process(dataSource);

			const titles = dataSource.data.list.map((report: any) => report.report_nm);

			console.log(`Total ${alarmMessages.length} alarm messages are found.`);

			alarmMessages.forEach(message => this.senders.forEach(sender => sender.send(message)));

			console.log('Job finish');
		} else if (environment === 'production') {
			console.log(`Stock Alarm is started with key [${process.env.APP_KEY}].`);

			schedule.scheduleJob(cron, async () => {
				console.log('Job start');

				const dataSource = await this.dataSourceFrom.fetch();
				const alarmMessages = this.processor.process(dataSource);

				const titles = dataSource.data.list.map((report: any) => report.report_nm);
				console.log(titles);
				console.log(`Total ${alarmMessages.length} alarm messages are found.`);

				for (const alarmMessage of alarmMessages) {
					this.senders.forEach(sender => sender.send(alarmMessage));
					await delay(3000);
				}

				console.log('Job finish');
			});
		}
	}
}
