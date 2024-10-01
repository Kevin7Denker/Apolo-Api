var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Post from "../Models/Post";
class PostRepository {
    sendPost(title, text, aval, userId, musicId, artistId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (error) {
                if (error instanceof Error) {
                    return { error: error.message };
                }
                else {
                    return { error: "Erro desconhecido" };
                }
            }
        });
    }
}
export default PostRepository;
//# sourceMappingURL=Post_Repository.js.map