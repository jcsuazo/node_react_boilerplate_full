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
exports.seedUsers = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const fs_1 = __importDefault(require("fs"));
exports.getUsers = express_async_handler_1.default((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(res.advancedResults);
}));
exports.createUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.create(req.body);
    res.status(201).json({
        success: true,
        data: user,
    });
}));
exports.getUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    res.status(200).json({
        success: true,
        data: user,
    });
}));
exports.updateUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: user,
    });
}));
exports.deleteUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        data: {},
    });
}));
exports.seedUsers = express_async_handler_1.default((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = JSON.parse(fs_1.default.readFileSync(`/Users/applab/learning/node/node_react_boilerplate_full/backend/_data/users.json`, 'utf-8'));
    yield userModel_1.default.deleteMany();
    console.log(users);
    yield userModel_1.default.create(users);
    res.status(200).json({
        success: true,
        data: {},
    });
}));
//# sourceMappingURL=userController.js.map