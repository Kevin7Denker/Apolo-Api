"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Profile = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now(), required: true },
    lastUpdate: { type: Date, default: Date.now(), required: true },
    dateCriation: { type: Date, default: Date.now(), required: true },
}, { _id: false });
const Config = new Schema({
    theme: { type: String, default: "light", required: true },
    language: { type: String, default: "en", required: true },
}, { _id: false });
const Validation = new Schema({
    email: { type: Boolean, default: false, required: true },
    phone: { type: Boolean, default: false, required: true },
}, { _id: false });
const User = new Schema({
    validation: { type: Validation, default: {} },
    profile: { type: Profile, default: {} },
    config: { type: Config, default: {} },
});
exports.default = mongoose_1.default.model("User", User);
