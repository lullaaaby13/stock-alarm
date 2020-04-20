import AbstractDataSourceFrom from '../AbstractDataSourceFrom';
import axios from 'axios';
import {API} from "../DataSourceFrom";


export class DataSourceFromAPI extends AbstractDataSourceFrom {
	apiKey: string;
	method: string;
	url: string;

	constructor(apiKey: string, api: API) {
		super();
		this.apiKey = apiKey;
		this.method = api.method;
		this.url = api.url;
	}

	async fetch(): Promise<any> {
		if (this.method.toLowerCase() === 'get') {
			return axios.get(this.url, {
				params: {
					crtfc_key: this.apiKey,
					page_count: 10,
				}
			});
		} else if (this.method.toLowerCase() === 'post') {
			return axios.post(this.url);
		}
	}
}