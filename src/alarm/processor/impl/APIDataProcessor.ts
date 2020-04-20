import Processor from '../Processor';
import { containsAny } from '../../util/StringUtil';
import { AlarmMessage } from '../../model/AlarmMessage';
import moment from 'moment';

interface DartReport {
	corp_code: string;
	corp_name: string;
	stock_code: string;
	corp_cls: string;
	report_nm: string;
	rcept_no: string;
	flr_nm: string;
	rcept_dt: string;
	rm: string;
}

export default class APIDataProcessor implements Processor {
	filterKeywords: string[];

	constructor(filterKeywords: string[]) {
		this.filterKeywords = filterKeywords;
	}

	process(dataSource: any): AlarmMessage[] {
		const { data } = dataSource;
		const list: DartReport[] = data.list;

		const dartReports: DartReport[] = list.filter((report) =>
			containsAny(report.report_nm, this.filterKeywords),
		);

		const alarmMessages: AlarmMessage[] = dartReports.map((report) => {
			const alarmMessage: AlarmMessage = {
				id: moment().format('YYYYMMDDHHmmssSSS'),
				sendAlarm: 'Y',
				corpName: report.corp_name,
				filterKeyword: containsAny(report.report_nm, this.filterKeywords),
				title: report.report_nm,
				createdAt: new Date(),
				origin: report,
			};
			return alarmMessage;
		});

		return alarmMessages;
	}
}
