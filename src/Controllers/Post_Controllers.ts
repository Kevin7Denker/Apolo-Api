import { Request, Response } from "express";

import PostRepository from "../Repository/Post_Repository";

class PostController {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  public async sendPost(req: Request, res: Response) {
    const { title, text, aval, userId, musicId, artistId } = req.body;

    try {
      await this.postRepository.sendPost(
        title,
        text,
        aval,
        userId,
        musicId,
        artistId
      );

      return res.status(201).json({ success: true, message: "Post Created" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(404).json({
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
