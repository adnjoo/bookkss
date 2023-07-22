"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
exports.reviewRouter = express_1.default.Router();
// Define the routes and their corresponding controller functions
exports.reviewRouter.get('/get-user-reviews', reviewController_1.getUserReviews);
exports.reviewRouter.post('/add-review', reviewController_1.addReview);
