import {DataSourceFromAPI} from "./datasource/impl/DataSourceFromAPI";
import DataSourceFrom from "./datasource/DataSourceFrom";
import Processor from "./processor/Processor";
import MessageSender from "./sender/MessageSender";
import APIDataProcessor from "./processor/impl/APIDataProcessor";
import path from "path";
import yaml from "js-yaml";
import util from "util";
import fs from "fs";
import TestMessageSender from "./sender/impl/TestMessageSender";

const readFile = util.promisify(fs.readFile);

export interface BeanBundle {
    key: string,
    dataSourceFrom: DataSourceFrom,
    processor: Processor,
    senders: MessageSender[],
}

export class StockAlarmFactory {
    _self: StockAlarmFactory = new StockAlarmFactory();
    private static beanBundles: BeanBundle[] = []
    private static configuration: any;

    private constructor() {}

    static getInstance(appKey: string): any{
        const bundle = this.beanBundles.find(bundle => bundle.key === appKey);
        if (bundle) {
            return bundle
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

            const { slackApi, dartApi, filterKeywords } = configuration;
            const { apiKey, searchDisclosure } = dartApi;
            const { botToken, postMessage } = slackApi;

            const dartDisclosureBundle: BeanBundle = {
                key: "DART-DISCLOSURE",
                dataSourceFrom: new DataSourceFromAPI(apiKey, searchDisclosure),
                processor: new APIDataProcessor(filterKeywords),
                senders: [new TestMessageSender(botToken, postMessage, postMessage.channel)]
            };

            this.beanBundles.push(dartDisclosureBundle);
        } catch {

        }
    }
}
