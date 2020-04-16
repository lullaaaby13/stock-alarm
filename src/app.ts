import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';
import StockAlarm from './alarm/StockAlarm';
import {System} from "typescript";

(async () => {
	await loadConfiguration();



})();



async function loadConfiguration() {
	try {
		const configPath = path.resolve(__dirname, '..', 'resources', 'application.yaml');
		const configFile = fs.readFileSync(configPath, 'utf8');
		process.env = yaml.safeLoad(configFile);
	} catch (e) {
		// @ts-ignore
		System.exit(1);
	}
}