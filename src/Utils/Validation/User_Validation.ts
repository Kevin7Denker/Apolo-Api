import { Response } from "express";

class UserValidation {
  public vefName(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [name] field is required" });
    }
  }

  public vefSurname(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [surname] field is required" });
    }
  }

  public vefEmail(value: string, res: Response) {
    if (!value) {
      return res.json({ msg: "The [email] field is required" });
    }
  }

  public vefPhone(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [phone] field is required" });
    }
  }

  public vefPassword(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [password] field is required" });
    }
  }

  public vefConfirmPassword(value: string, res: Response) {
    if (!value) {
      return res
        .status(422)
        .json({ msg: "The [Confirm Password] field is required" });
    }
  }

  public vefEquals(First: string, Second: string, res: Response) {
    if (First !== Second) {
      return res.status(422).json({ msg: "The passwords need to be similar" });
    }
  }
  public vefUser(value: string, res: Response) {
    if (value != null) {
      return res.status(422).json({ msg: "User Already exists" });
    }
  }
}

export default UserValidation;
