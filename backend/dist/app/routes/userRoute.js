"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const advancedResults_1 = __importDefault(require("../middleware/advancedResults"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/seeder').get(userController_1.seedUsers);
router.use(auth_1.protect);
router.use(auth_1.authorize('admin'));
router.route('/').get(advancedResults_1.default(userModel_1.default), userController_1.getUsers).post(userController_1.createUser);
router.route('/:id').get(userController_1.getUser).put(userController_1.updateUser).delete(userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map