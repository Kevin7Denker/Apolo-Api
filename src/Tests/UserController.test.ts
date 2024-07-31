import axios from "axios";

jest.mock("../Repository/User_Repository.ts");

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
