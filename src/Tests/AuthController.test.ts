import request from "supertest";
import app from "../app";
import AuthRepository from "../Repository/Auth_Repository";

jest.mock("../Repository/Auth_Repository");

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signIn", () => {
    it("should sign in an existing user successfully", async () => {
      const mockResponse = {
        success: true,
        msg: "SignIn Successfully",
        items: [
          { token: "token", user: { profile: { email: "test@example.com" } } },
        ],
      };

      (AuthRepository.prototype.signIn as jest.Mock).mockResolvedValue(
        mockResponse.items[0]
      );

      const res = await request(app).post("/auth/signin").send({
        email: "test@example.com",
        password: "password",
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockResponse);
    });

    it("should return error when user not found", async () => {
      const mockResponse = {
        error: "User not found",
      };

      (AuthRepository.prototype.signIn as jest.Mock).mockRejectedValue(
        new Error(mockResponse.error)
      );

      const res = await request(app).post("/auth/signin").send({
        email: "nonexistent@example.com",
        password: "password",
      });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ success: false, error: mockResponse.error });
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user successfully", async () => {
      (AuthRepository.prototype.deleteUser as jest.Mock).mockResolvedValue(
        true
      );

      const res = await request(app).delete("/auth/user/validUserId");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ msg: "User Deleted", success: true });
    });
  });
});
