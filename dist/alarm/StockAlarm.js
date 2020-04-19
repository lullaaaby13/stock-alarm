"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockAlarm {
    constructor({ a, b }) {
        this.a = a;
        this.b = b;
    }
    test() {
        console.log(this.a + ' ' + this.b);
        console.log(process.env.test);
    }
}
exports.default = StockAlarm;
//# sourceMappingURL=StockAlarm.js.map