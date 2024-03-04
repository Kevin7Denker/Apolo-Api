import dotenv from "dotenv";

import Post from "../Models/Post";
import Artist from "../Models/Artist";
import Music from "../Models/Music";
dotenv.config();

class PostRepository {
  public async sendPost(
    title: string,
    text: string,
    aval: string,
    userId: string,
    music: typeof Music,
    artist: typeof Artist
  ) {
    try {
      const date = Date.now();
      const post = new Post({ title, text, aval, date, userId, music, artist });

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
