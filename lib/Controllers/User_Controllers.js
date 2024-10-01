var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id === undefined) {
                return res.status(400).json({ error: "Invalid ID" });
            }
            try {
                const response = yield this.userRepository.findUser(id);
                return res.status(200).json(response);
            }
            catch (error) {
                return error;
            }
        });
    }
}
export default UserController;
//# sourceMappingURL=User_Controllers.js.map