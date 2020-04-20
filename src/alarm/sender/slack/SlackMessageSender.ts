import AbstractMessageSender from "../AbstractMessageSender";
import {AlarmMessage} from "../../model/AlarmMessage";
import SlackMessage from "../../../infrastructure/database/models/SlackMessage.model";
import sequelize from "../../../infrastructure/database/sequelize";

export interface SlackChannel {
    id: string,
    name: string,
}

export default class SlackMessageSender extends AbstractMessageSender{

    channel: SlackChannel;

    constructor(channel: SlackChannel) {
        super();
        this.channel = channel;
    }

    async send(message: AlarmMessage): Promise<void> {
        try {
            sequelize.transaction().then(transaction => {
                SlackMessage.create({
                    channelName: this.channel.name,
                    channelId: this.channel.id,
                    text: `[공시 업데이트]: 회사=${message.corpName}, 보고서명=${message.title}`,
                }, { transaction })
                    .then(message => {
                        transaction.commit();
                    })
                    .catch(error => {
                        console.error(error);
                        transaction.rollback();
                    });
            });
        } catch (e) {
            console.error(`SQL Fails: ${e.message}`);
        }
    }
}