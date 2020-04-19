import {AlarmMessage} from "../../model/AlarmMessage";
import {API} from "../../datasource/DataSourceFrom";
import AbstractMessageSender from "../AbstractMessageSender";

export default class SlackMessageSender extends AbstractMessageSender {

    token: string;
    method: string;
    url: string;
    channel: string;

    constructor(token: string, api: API, channel: string) {
        super();
        this.token = token;
        this.method = api.method;
        this.url = api.url;
        this.channel = channel;
    }

    async send(message: AlarmMessage): Promise<void> {
        const params: any = {
            token: this.token,
            channel: this.channel,
            text: `[공시 업데이트]: 회사=${message.corpName}, 보고서명=${message.title}`,
        };


        const { data } = await this.postRequest(this.url, null, params);
        console.log(data);
    }
}