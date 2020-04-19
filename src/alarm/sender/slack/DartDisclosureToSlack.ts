import {AbstractSlackMessageSender, SlackChannel} from "./AbstractSlackMessageSender";
import {API} from "../../datasource/DataSourceFrom";
import {AlarmMessage} from "../../model/AlarmMessage";

export default class DartDisclosureToSlack extends AbstractSlackMessageSender {

    constructor(token: string, api: API, channel: SlackChannel) {
        super(token, api, channel);
    }

    getReqeustBody(message: AlarmMessage): any {

    }

    getReqeustParams(message: AlarmMessage): any {
        const params: any = {
            token: this.token,
            channel: this.channel,
            text: `[공시 업데이트]: 회사=${message.corpName}, 보고서명=${message.title}`,
        };
        return params;
    }
}