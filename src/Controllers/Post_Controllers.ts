import { SendPostRequest } from "../Interface/Requests/Post_Request";
import { Request, Response } from "express";

import PostRepository from "../Repository/Post_Repository";

class PostController {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  public async sendPost(req: Request, res: Response) {
    const { title, text, aval, userId, musicId, artistId }: SendPostRequest =
      req.body;

    try {
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
