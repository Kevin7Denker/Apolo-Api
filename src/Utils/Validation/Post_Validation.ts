import { Response } from "express";

class PostValidation {
  public vefTitle(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [title] field is required" });
    }
  }

  public vefText(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [text] field is required" });
    }
  }

  public vefAval(value: number, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [aval] field is required" });
    }
  }

  public vefUserId(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [UserId] field is required" });
    }
  }

  public vefMusicId(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [MusicId] field is required" });
    }
  }

  public vefArtistId(value: string, res: Response) {
    if (!value) {
      return res.status(422).json({ msg: "The [ArtistId] field is required" });
    }
  }
}

export default PostValidation;
