import MessageSender from "../MessageSender";
import {AlarmMessage} from "../../model/AlarmMessage";

export default class TestMessageSender implements MessageSender{

    constructor() {

    }

    send(message: AlarmMessage): void {
        console.log(message);
    }
}