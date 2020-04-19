import {AlarmMessage} from "../../model/AlarmMessage";
import {API} from "../../datasource/DataSourceFrom";
import AbstractMessageSender from "../AbstractMessageSender";

export interface SlackChannel {
    id: string,
    name: string,
}

export abstract class AbstractSlackMessageSender extends AbstractMessageSender {

    token: string;
    api: API;
    channel: SlackChannel;

    constructor(token: string, api: API, channel: SlackChannel) {
        super();
        this.token = token;
        this.api = api;
        this.channel = channel;
    }

    async send(message: AlarmMessage): Promise<void> {

        try {
            let response = null;
            const reqeustParams = this.getReqeustParams(message);

            if (this.api.method.toLowerCase() === 'get') {
                response = await this.getRequest(this.api.url, reqeustParams);
            } else {
                const reqeustBody = this.getReqeustBody(message);
                response = await this.postRequest(this.api.url, reqeustBody, reqeustParams);
            }

            const { data } = response;
            const { ok } = data;

            if (ok === false) {
                console.log(`Message send fails: ${data.error}`);
            } else {
                console.log(message);
            }
        } catch (e) {
            console.error(`Message send fails`, e);
        }
    }

    abstract getReqeustBody(message: AlarmMessage): any;
    abstract getReqeustParams(message: AlarmMessage): any;
}