"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield loadConfiguration();
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(process.env.BANANA);
}))();
function loadConfiguration() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configPath = path_1.default.resolve(__dirname, '..', 'resources', 'application.yaml');
            const configFile = fs_1.default.readFileSync(configPath, 'utf8');
            const configuration = js_yaml_1.default.safeLoad(configFile);
            process.env = Object.assign(Object.assign({}, process.env), { configuration });
        }
        catch (e) {
            // @ts-ignore
            System.exit(1);
        }
    });
}
//# sourceMappingURL=app.js.map