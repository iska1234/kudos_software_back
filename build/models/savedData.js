"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedDataSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.savedDataSchema = zod_1.default.object({
    description: zod_1.default.string().min(1),
    dataContent: zod_1.default.string().min(1),
    userId: zod_1.default.number(),
    created_at: zod_1.default.string().optional(),
    updated_at: zod_1.default.string().optional(),
});
