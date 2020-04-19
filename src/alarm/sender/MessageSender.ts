import {AlarmMessage} from "../model/AlarmMessage";

export default interface MessageSender {
    send(message: AlarmMessage): void
}