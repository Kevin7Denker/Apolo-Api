import axios from "axios";
import User from "../Models/User";

jest.mock("../Repository/User_Repository.ts");

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("findUserById", () => {
    it("should find user by id successfully", async () => {
      const user = await User.findOne({
        "profile.email": "existing@example.com",
      });

      console.log(user?._id);

      const res = await axios.post(
        "https://apolo-api.onrender.com/user/find-user/",
        {
          id: user,
        }
      );

      expect(res.status).toBe(200);
      expect(res.status).toEqual(200);
    }, 15000);
  });

  describe("findUserIdentity", () => {
    it("should find user by identity successfully", async () => {
      const res = await axios.post(
        "https://apolo-api.onrender.com/user/find-identity/:?id=@teste"
      );

      expect(res.status).toBe(200);
      expect(res.status).toEqual(200);
    }, 15000);
  });
});
