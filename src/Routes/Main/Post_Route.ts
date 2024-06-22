import express from "express";
import PostRepository from "../../Repository/Post_Repository";
import PostController from "../../Controllers/Post_Controllers";
import AuthMiddleWare from "../../MiddleWare/Auth_MiddleWare";

const route = express.Router();

const postRepository = new PostRepository();

const postController = new PostController(postRepository);

route.post("/send", AuthMiddleWare.checkToken, (req, res) =>
  postController.sendPost(req, res)
);

export default route;
