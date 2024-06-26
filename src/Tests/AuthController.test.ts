import request from "supertest";
import app from "../app";
import AuthRepository from "../Repository/Auth_Repository";

jest.mock("../Repository/Auth_Repository");

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should sign up a new user successfully", async () => {
      const mockResponse = {
        success: true,
        msg: "SignUp Successfully",
        items: [{ profile: { email: "test@example.com" } }],
      };

      (AuthRepository.prototype.signUp as jest.Mock).mockResolvedValue(
        mockResponse.items[0]
      );

      const res = await request(app).post("/auth/signup").send({
        name: "John",
        surname: "Doe",
        email: "test@example.com",
        phone: "1234567890",
        password: "password",
        confirmPassword: "password",
        nationality: "USA",
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual(mockResponse);
    }, 10000);

    it("should return error when user already exists", async () => {
      const mockResponse = {
        error: "User Already Exists",
      };

      (AuthRepository.prototype.signUp as jest.Mock).mockRejectedValue(
        new Error(mockResponse.error)
      );

      const res = await request(app).post("/auth/signup").send({
        name: "John",
        surname: "Doe",
        email: "existing@example.com",
        phone: "1234567890",
        password: "password",
        confirmPassword: "password",
        nationality: "USA",
      });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ success: false, error: mockResponse.error });
    }, 10000); // Increased timeout for this test
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
      expect(res.body).toEqual({ success: true, msg: "User Deleted" });
    });

    it("should return error when user not found", async () => {
      const mockResponse = { error: "User not found" };

      (AuthRepository.prototype.deleteUser as jest.Mock).mockRejectedValue(
        new Error(mockResponse.error)
      );

      const res = await request(app).delete("/auth/user/invalidUserId");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: mockResponse.error });
    });
  });
});
