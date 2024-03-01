import PostRepository from "../Repository/Post_Repository";

import { Request, Response } from "express";

class PostController {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  public async sendPost(req: Request, res: Response) {
    const { title, text, aval, user, music, artist } = req.body;

    try {
      await this.postRepository.sendPost(
        title,
        text,
        aval,
        user,
        music,
        artist
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
