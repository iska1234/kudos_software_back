"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
    age: zod_1.z.number().min(1).optional(),
    role: zod_1.z.enum(["user", "admin"]).default("user"),
    created_at: zod_1.z.string().optional(),
    updated_at: zod_1.z.string().optional(),
});
