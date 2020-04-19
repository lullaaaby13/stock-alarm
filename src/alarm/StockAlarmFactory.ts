import {DataSourceFromAPI} from "./datasource/impl/DataSourceFromAPI";
import DataSourceFrom, {API} from "./datasource/DataSourceFrom";
import Processor from "./processor/Processor";
import MessageSender from "./sender/MessageSender";
import APIDataProcessor from "./processor/impl/APIDataProcessor";
import path from "path";
import yaml from "js-yaml";
import util from "util";
import fs from "fs";
import {SlackChannel} from "./sender/slack/AbstractSlackMessageSender";
import DartDisclosureToSlack from "./sender/slack/DartDisclosureToSlack";

const readFile = util.promisify(fs.readFile);

export interface BeanBundle {
    key: string,
    dataSourceFrom: DataSourceFrom,
    processor: Processor,
    senders: MessageSender[],
}

export class StockAlarmFactory {
    _self: StockAlarmFactory = new StockAlarmFactory();
    private static beanBundles: BeanBundle[] = [];
    private static configuration: any;

    private constructor() {}

    static getInstance(appKey: string): any{
        const beanBundle = this.beanBundles.find(bundle => bundle.key === appKey);
        if (beanBundle) {
            return beanBundle;
        } else {
            throw new Error(`해당 Bundle을 찾을 수 없습니다. [${appKey}]`);
        }
    }

    static getConfiguration() {
        return this.configuration;
    }

    static async init() {
        try {
            const configPath = path.resolve(__dirname, '..', '..', 'resources', 'application.yaml');
            const configFile = await readFile(configPath, 'utf8');
            const configuration = yaml.safeLoad(configFile);
            this.configuration = configuration;

            const { slack, dartApi, filterKeywords } = configuration;
            const { apiKey, searchDisclosure } = dartApi;
            const { botToken  } = slack;
            const apis: API[] = slack.apis;
            const channels: SlackChannel[] = slack.channels;

            const slackPostMessage: API | undefined = apis.find(api => api.name === 'postMessage');
            const slackStockAlarmChannel: SlackChannel | undefined = channels.find(channel => channel.name === 'stock-alarm');

            // 1. DART-DISCLOSURE
            if (slackPostMessage !== undefined && slackStockAlarmChannel !== undefined) {
                const dartDisclosureBundle: BeanBundle = {
                    key: "DART-DISCLOSURE",
                    dataSourceFrom: new DataSourceFromAPI(apiKey, searchDisclosure),
                    processor: new APIDataProcessor(filterKeywords),
                    senders: [
                        new DartDisclosureToSlack(botToken, slackPostMessage, slackStockAlarmChannel)
                    ]
                };
                this.beanBundles.push(dartDisclosureBundle);
            }


            console.log('StockAlarmFactory Init Finish.');
        } catch {

        }
    }
}
