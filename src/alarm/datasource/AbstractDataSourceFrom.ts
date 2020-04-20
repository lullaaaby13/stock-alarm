import DataSourceFrom from "./DataSourceFrom";

export default abstract class AbstractDataSourceFrom implements DataSourceFrom {
    abstract fetch(): Promise<any>;
}