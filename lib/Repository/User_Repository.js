var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../Models/User";
class UserRepository {
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ id_: id });
                if (user == null) {
                    throw new Error("User not exists");
                }
                return user;
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: `${error.message}` };
                }
                else {
                    return { error: "error" };
                }
            }
        });
    }
}
export default UserRepository;
//# sourceMappingURL=User_Repository.js.map