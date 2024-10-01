var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class PostController {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    sendPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, text, aval, userId, musicId, artistId } = req.body;
            try {
                yield this.postRepository.sendPost(title, text, aval, userId, musicId, artistId);
                return res.status(201).json({ success: true, message: "Post Created" });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(404).json({
                        success: false,
                        error: error.message,
                    });
                }
                else {
                    return { error: "Unknown Error" };
                }
            }
        });
    }
}
export default PostController;
//# sourceMappingURL=Post_Controllers.js.map