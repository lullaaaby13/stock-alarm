import AbstractMessageSender from "../AbstractMessageSender";
import {AlarmMessage} from "../../model/AlarmMessage";
import SlackMessage from "../../../infrastructure/database/models/SlackMessage.model";
import sequelize from "../../../infrastructure/database/sequelize";
import {ValidationErrorItem} from "sequelize";

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
        sequelize.transaction().then(transaction => {
            SlackMessage.create({
                channelName: this.channel.name,
                channelId: this.channel.id,
                messageKey: message.origin.rcept_no,
                text: `[공시 업데이트]: 회사=${message.corpName}, 보고서명=${message.title}`,
            }, { transaction })
                .then(message => {
                    transaction.commit();
                })
                .catch(({ errors }) => {
                    const uniqueError = errors.find((error: ValidationErrorItem) => error.message.includes('unique'));
                    if (uniqueError) {
                        console.log('이미 추가한 메세지');
                    } else {
                        console.error(errors);
                    }
                    transaction.rollback();
                });
        });
    }
}