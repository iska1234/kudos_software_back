"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedDataSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.sharedDataSchema = zod_1.default.object({
    adminId: zod_1.default.number(),
    savedDataId: zod_1.default.number(),
    sharedWithUserId: zod_1.default.number(),
    deleted: zod_1.default.boolean().default(false).optional(),
    created_at: zod_1.default.string().optional(),
    updated_at: zod_1.default.string().optional(),
});
