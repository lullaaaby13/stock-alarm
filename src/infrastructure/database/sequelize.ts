// @ts-ignore
import {Sequelize} from 'sequelize-typescript/dist';
import path from 'path';
import yaml from "js-yaml";
import fs from 'fs';
import {getAppRootPath} from "../../utils/CommonUtils";

const appRootPath = getAppRootPath();
const environment = process.env.NODE_ENV || 'development';
const configPath = path.resolve(appRootPath, 'resources', 'application-database.yaml');
const configFile = fs.readFileSync(configPath, 'utf8');
const configuration = yaml.safeLoad(configFile);
const options = configuration[environment];

const sequelize = new Sequelize({
    ...options,
    timezone: 'Etc/GMT-9',
    models: [ __dirname + '/models/**/*.model.ts' ]
});

export default sequelize;