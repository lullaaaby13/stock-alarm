import {AlarmMessage} from "../../model/AlarmMessage";
import {API} from "../../datasource/DataSourceFrom";
import AbstractMessageSender from "../AbstractMessageSender";

export default class TestMessageSender extends AbstractMessageSender {

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
        console.log(token, api, channel);
    }

    async send(message: AlarmMessage): Promise<void> {
        const params: any = {
            token: this.token,
            channel: this.channel,
            text: 'Test Message Send.'
        };

        const { data } = await this.postRequest(this.url, null, params);
        console.log(data);
    }
}