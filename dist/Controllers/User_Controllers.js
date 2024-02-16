"use strict";
let __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
let __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Label_Validation_1 = require("../Utils/Label_Validation");
const User_1 = __importDefault(require("../Models/User"));
class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { name, surname, email, phone, password, confirmPassword } =
        req.body;
      let result;
      if ((result = (0, Label_Validation_1.validName)(name))) {
        return res.status(422).json(result);
      }
      if ((result = (0, Label_Validation_1.validName)(surname))) {
        return res.status(422).json(result);
      }
      if ((result = (0, Label_Validation_1.validEmail)(email))) {
        return res.status(422).json(result);
      }
      if (!phone) {
        return res.status(422).json({ msg: "The phone field is required" });
      }
      if (!password) {
        return res.status(422).json({ msg: "The password field is required" });
      }
      if (!confirmPassword) {
        return res
          .status(422)
          .json({ msg: "The confirm password field is required" });
      }
      if (password !== confirmPassword) {
        return res
          .status(422)
          .json({ msg: "The passwords need to be similar" });
      }
      const user = yield User_1.default.findOne({ "profile.email": email });
      if (user != null) {
        return res.status(400).json({ msg: "User already exists" });
      }
      try {
        const response = yield this.userRepository.signUp(
          name,
          surname,
          email,
          phone,
          password
        );
        res.status(201).json({
          success: true,
          msg: "SignUp Successfully",
          data: [response],
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          msg: { response: express_1.response },
          error,
        });
      }
    });
  }
  signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { email, password } = req.body;
      if (!email) {
        return res.status(422).json({ msg: "The email field is required" });
      }
      if (!password) {
        return res.status(422).json({ msg: "The password field is required" });
      }
      try {
        const response = yield this.userRepository.signIn(email, password);
        if (response.error) {
          throw new Error(response.error);
        }
        res.status(200).json({
          success: true,
          msg: "SignIn Successfully",
          data: [response],
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(404).json({
            success: false,
            error: error.message,
          });
        } else {
          return { error: "Unknown Error" };
        }
      }
    });
  }
  valEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const token = req.params.token;
      if (!token) {
        res.status(422).json({ error: "Token invalid" });
      }
      try {
        const response = yield this.userRepository.valEmail(token);
        if (response.error) {
          throw new Error(response.error);
        }
        return res.status(200).json({
          success: true,
          msg: response.msg,
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(404).json({
            success: false,
            error: error.message,
          });
        } else {
          return { error: "Unknown Error" };
        }
      }
    });
  }
}
exports.default = UserController;
