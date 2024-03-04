import dotenv from "dotenv";

import Post from "../Models/Post";

dotenv.config();

class PostRepository {
  public async sendPost(
    title: string,
    text: string,
    aval: string,
    userId: string,
    musicId: string,
    artistId: string
  ) {
    try {
      const post = new Post({
        data: {
          title: title,
          text: text,
          aval: aval,
        },
        userId,
        musicId,
        artistId,
      });

      post.save();

      return post;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "Erro desconhecido" };
      }
    }
  }
}

export default PostRepository;
