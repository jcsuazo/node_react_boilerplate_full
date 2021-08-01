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
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
let colors = require('colors/safe');
dotenv_1.default.config();
const userModel_1 = __importDefault(require("./app/models/userModel"));
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
const users = JSON.parse(fs_1.default.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.create(users);
        console.log(colors.green.inverse('Data Imported...'));
        process.exit();
    }
    catch (err) {
        console.error(err);
    }
});
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield userModel_1.default.deleteMany();
        console.log(colors.red.inverse('Data Destroyed...'));
        process.exit();
    }
    catch (err) {
        console.error(err);
    }
});
if (process.argv[2] === '-d') {
    deleteData();
}
else {
    importData();
}
//# sourceMappingURL=seeder.js.map