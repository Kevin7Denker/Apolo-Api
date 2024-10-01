var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AuthRepository from "../Repository/Auth_Repository";
import axios from "axios";
jest.mock("../Repository/Auth_Repository");
describe("AuthController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("signUp", () => {
        it("should sign up a new user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield axios.post("https://apolo-api.onrender.com/auth/signup", {
                name: "John",
                surname: "Wick",
                email: "existing@example.com",
                phone: "1234567890",
                password: "password",
                confirmPassword: "password",
                nationality: "USA",
            });
            yield axios.delete(`https://apolo-api.onrender.com/auth/user/${res.data.items[0]._id}`);
            expect(res.status).toBe(201);
            expect(res.status).toEqual(201);
        }), 15000);
        it("should return error when user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            yield axios
                .post("https://apolo-api.onrender.com/auth/signup", {
                name: "John",
                surname: "Doe",
                email: "existing@example.com",
                phone: "1234567890",
                password: "password",
                confirmPassword: "password",
                nationality: "USA",
            })
                .catch((error) => {
                expect(error.response.status).toBe(404);
                expect(error.response.data).toEqual({
                    error: "User Already Exists",
                    success: false,
                });
            });
        }), 15000);
    });
    describe("signIn", () => {
        it("should sign in an existing user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield axios.post("https://apolo-api.onrender.com/auth/signin", {
                email: "existing@example.com",
                password: "teste123",
            });
            expect(res.status).toBe(200);
            expect(res.status).toEqual(200);
        }));
        it("should return error when user not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResponse = {
                error: "User not found",
            };
            AuthRepository.prototype.signIn.mockRejectedValue(new Error(mockResponse.error));
            yield axios
                .post("https://apolo-api.onrender.com/auth/signin", {
                email: "nonexistent@example.com",
                password: "password",
            })
                .catch((error) => {
                expect(error.response.status).toBe(404);
                expect(error.response.data).toEqual({
                    success: false,
                    error: "User not found",
                });
            });
        }));
    });
    describe("deleteUser", () => {
        it("should delete an existing user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            AuthRepository.prototype.deleteUser.mockResolvedValue(true);
            const res = yield axios.delete("https://apolo-api.onrender.com/auth/user/validUserId");
            expect(res.status).toBe(200);
            expect(res.data).toEqual({ msg: "User Deleted", success: true });
        }));
    });
});
//# sourceMappingURL=AuthController.test.js.map