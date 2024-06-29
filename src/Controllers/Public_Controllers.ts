import { Request, Response } from "express";
import path from "path";

class PublicController {
  public HelloApolo(_req: Request, res: Response) {
    const HelloApolo = path.join(
      __dirname,
      "..",
      "Templates",
      "Responses",
      "Response_Apolo.html"
    );

    return res.status(200).sendFile(HelloApolo);
  }
}

export default PublicController;
