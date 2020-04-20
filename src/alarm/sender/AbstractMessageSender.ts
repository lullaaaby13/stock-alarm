import MessageSender from "./MessageSender";
import {AlarmMessage} from "../model/AlarmMessage";
import axios from 'axios';

export default abstract class AbstractMessageSender implements MessageSender{

    abstract send(message: AlarmMessage): Promise<void>;

    getRequest (url: string, params: any) {
        return axios.get(url, { params });
    }

    postRequest (url: string, body: any, params: any) {
        return axios.post(url, body, { params });
    }
}