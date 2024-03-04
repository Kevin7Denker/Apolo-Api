import { SendPostRequest } from "../Interface/Requests/Post_Request";
import { Request, Response } from "express";

import PostRepository from "../Repository/Post_Repository";
import PostValidation from "../Utils/Validation/Post_Validation";

class PostController {
  private postRepository: PostRepository;
  private postValidation: PostValidation;

  constructor(postRepository: PostRepository, postValidation: PostValidation) {
    this.postRepository = postRepository;
    this.postValidation = postValidation;
  }

  public async sendPost(req: Request, res: Response) {
    const { title, text, aval, userId, musicId, artistId }: SendPostRequest =
      req.body;

    try {
      this.postValidation.vefTitle(title, res);
      this.postValidation.vefText(text, res);
      this.postValidation.vefAval(aval, res);
      this.postValidation.vefUserId(userId, res);
      this.postValidation.vefArtistId(artistId, res);
      this.postValidation.vefMusicId(musicId, res);

      await this.postRepository.sendPost(
        title,
        text,
        aval,
        userId,
        musicId,
        artistId
      );

      res.status(201).json({ success: true, message: "Post Created" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      } else {
        return { error: "Unknown Error" };
      }
    }
  }
}

export default PostController;
