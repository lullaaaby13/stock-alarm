import {DataSourceFromAPI} from "../../../src/alarm/datasource/impl/DataSourceFromAPI";
import {API} from "../../../src/alarm/datasource/DataSourceFrom";
import { expect } from "chai";

describe('Datasource Test', () => {
    it('DataSource from API Test', async () => {
        const apiKey = "c3612ac797677127e1e6deacaf24a602599a9d5c";
        const api:API = {
            name: "DART-DISCLOSURE",
            method: "get",
            url: "https://opendart.fss.or.kr/api/list.json"
        }
        const dataSourceFromAPI = new DataSourceFromAPI(apiKey, api);
        const response: any = await dataSourceFromAPI.fetch();
        const { status } = response;

        expect(status).to.equal(200);
    });

    it('Test2', async () => {

    });
});