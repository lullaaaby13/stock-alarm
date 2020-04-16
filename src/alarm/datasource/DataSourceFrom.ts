/**
 *  책임) 데이터 소스로부터 데이터를 가져와 반환
 */

export default interface DataSourceFrom {
    fetch(): any;
}

