import Post from "../Models/Post";

class PostRepository {
  public async sendPost(
    title: string,
    text: string,
    aval: number,
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
