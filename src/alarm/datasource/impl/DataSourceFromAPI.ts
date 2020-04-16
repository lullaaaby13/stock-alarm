import axios from 'axios';
import AbstractDataSourceFrom from '../AbstractDataSourceFrom';

export default class DataSourceFromAPI extends AbstractDataSourceFrom {
	url: string;

	constructor(url: string) {
		super();
		this.url = url;


	}

	async fetch(): Promise<any> {
		return 1;
	}

	async testCall(): Promise<void> {
	    await axios.get(this.url);
    }
}
