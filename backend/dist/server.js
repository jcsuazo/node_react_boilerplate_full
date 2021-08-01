"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createServer_1 = __importDefault(require("./createServer"));
var colors = require('colors/safe');
const app = createServer_1.default();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(colors.yellow.underline(`service is running on http://localhost:${PORT}`));
});
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map