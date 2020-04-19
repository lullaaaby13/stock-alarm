import {AlarmMessage} from "../model/AlarmMessage";

export default interface Processor {
    process(dataSource: any): AlarmMessage[];
}