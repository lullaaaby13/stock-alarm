import {DataSourceFromAPI} from "./datasource/impl/DataSourceFromAPI";
import DataSourceFrom from "./datasource/DataSourceFrom";
import Processor from "./processor/Processor";
import MessageSender from "./sender/MessageSender";
import APIDataProcessor from "./processor/impl/APIDataProcessor";
import path from "path";
import yaml from "js-yaml";
import util from "util";
import fs from "fs";
import {getAppRootPath} from "../utils/CommonUtils";
import SlackMessageSender, {SlackChannel} from "./sender/slack/SlackMessageSender";

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
            const appRootPath = getAppRootPath();
            const configPath = path.resolve(appRootPath, __dirname, '..', '..', 'resources', 'application.yaml');
            const configFile = await readFile(configPath, 'utf8');
            const configuration = yaml.safeLoad(configFile);
            this.configuration = configuration;

            const { slack, dartApi, filterKeywords } = configuration;
            const { apiKey, searchDisclosure } = dartApi;
            const channels: SlackChannel[] = slack.channels;


            const slackStockAlarmChannel: SlackChannel | undefined = channels.find(channel => channel.name === 'stock-alarm');

            // 1. DART-DISCLOSURE
            if (slackStockAlarmChannel !== undefined) {
                const dartDisclosureBundle: BeanBundle = {
                    key: "DART-DISCLOSURE",
                    dataSourceFrom: new DataSourceFromAPI(apiKey, searchDisclosure),
                    processor: new APIDataProcessor(filterKeywords),
                    senders: [
                        new SlackMessageSender(slackStockAlarmChannel)
                    ]
                };
                this.beanBundles.push(dartDisclosureBundle);
            }


            console.log('StockAlarmFactory Init Finish.');
        } catch {

        }
    }
}
