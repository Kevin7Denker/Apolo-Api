import express from "express";
import PostRepository from "../Repository/Post_Repository";
import PostController from "../Controllers/Post_Controllers";
import PostValidation from "../Utils/Validation/Post_Validation";
import AuthMiddleWare from "../MiddleWare/Auth_MiddleWare";

const route = express.Router();

const postRepository = new PostRepository();
const postValidation = new PostValidation();

const postController = new PostController(postRepository, postValidation);

route.post("/send", AuthMiddleWare.checkToken, (req, res) =>
  postController.sendPost(req, res)
);

export default route;
