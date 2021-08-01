"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = __importDefault(require("./database/db"));
const userRoute_1 = __importDefault(require("./app/routes/userRoute"));
function createServer() {
    dotenv_1.default.config();
    db_1.default();
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cookie_parser_1.default());
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan_1.default('dev'));
    }
    app.use(cors_1.default());
    app.use(express_mongo_sanitize_1.default());
    app.use(xss_clean_1.default());
    const limiter = express_rate_limit_1.default({
        windowMs: 10 * 60 * 1000,
        max: 100,
    });
    app.use(limiter);
    app.use(hpp_1.default());
    app.use(helmet_1.default());
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    let version = '/api/v1';
    app.use(`${version}/users`, userRoute_1.default);
    app.get('/', (_, response) => {
        response.send('Hello from express');
    });
    return app;
}
exports.default = createServer;
//# sourceMappingURL=createServer.js.map