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
exports.authorize = exports.protect = void 0;
const jwt = require('jsonwebtoken');
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const HttpException_1 = require("../../helper/classes/HttpException");
const userModel_1 = __importDefault(require("../models/userModel"));
exports.protect = express_async_handler_1.default((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new HttpException_1.ErrorResponse('Not authorized to access this route', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = yield userModel_1.default.findById(decoded.id);
        next();
    }
    catch (err) {
        return next(new HttpException_1.ErrorResponse('Not authorized to access this route', 401));
    }
}));
const authorize = (...roles) => {
    return (req, _, next) => {
        var _a, _b;
        if (!roles.includes(((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || '')) {
            return next(new HttpException_1.ErrorResponse(`User role ${((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) || ''} is not authorized to access this route`, 403));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map