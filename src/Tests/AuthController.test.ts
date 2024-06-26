import AuthRepository from "../Repository/Auth_Repository";
import axios from "axios";

jest.mock("../Repository/Auth_Repository");

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should sign up a new user successfully", async () => {
      const res = await axios.post(
        "https://apolo-api.onrender.com/auth/signup",
        {
          name: "John",
          surname: "Wick",
          email: "test@example.com",
          phone: "1234567890",
          password: "password",
          confirmPassword: "password",
          nationality: "USA",
        }
      );

      await axios.delete(
        `https://apolo-api.onrender.com/auth/user/${res.data.items[0]._id}`
      );

      expect(res.status).toBe(201);
      expect(res.status).toEqual(201);
    }, 15000);

    it("should return error when user already exists", async () => {
      await axios
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
    }, 15000);
  });

  describe("signIn", () => {
    it("should sign in an existing user successfully", async () => {
      const res = await axios.post(
        "https://apolo-api.onrender.com/auth/signin",
        {
          email: "existing@example.com",
          password: "teste123",
        }
      );

      expect(res.status).toBe(200);
      expect(res.status).toEqual(200);
    });

    it("should return error when user not found", async () => {
      const mockResponse = {
        error: "User not found",
      };

      (AuthRepository.prototype.signIn as jest.Mock).mockRejectedValue(
        new Error(mockResponse.error)
      );

      await axios
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
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user successfully", async () => {
      (AuthRepository.prototype.deleteUser as jest.Mock).mockResolvedValue(
        true
      );

      const res = await axios.delete(
        "https://apolo-api.onrender.com/auth/user/validUserId"
      );

      expect(res.status).toBe(200);
      expect(res.data).toEqual({ msg: "User Deleted", success: {} });
    });
  });
});
