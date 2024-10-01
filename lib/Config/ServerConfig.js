var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
export const env = process.env;
export default function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbUser = env.DB_USER;
            const dbPass = env.DB_PASSWORD;
            const dbName = env.DB_NAME;
            yield mongoose
                .connect(`mongodb+srv://${dbUser}:${dbPass}@cluster.irye11p.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000,
            })
                .then(() => {
                console.log("\n Welcome to Apolo\n");
                console.log(" Connected to server\n");
            });
        }
        catch (error) {
            console.log("Erro: " + error);
        }
    });
}
//# sourceMappingURL=ServerConfig.js.map