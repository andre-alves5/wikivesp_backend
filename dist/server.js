"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
app_1.default.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});
//# sourceMappingURL=server.js.map