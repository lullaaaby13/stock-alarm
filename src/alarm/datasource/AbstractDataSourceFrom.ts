import DataSourceFrom from "./DataSourceFrom";

export default abstract class AbstractDataSourceFrom implements DataSourceFrom {
    constructor() { }
    abstract fetch(): Promise<any>;
}