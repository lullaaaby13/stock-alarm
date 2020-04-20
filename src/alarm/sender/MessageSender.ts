import {AlarmMessage} from "../model/AlarmMessage";

export default interface MessageSender {
    send(message: AlarmMessage): Promise<void>
}