import mongoose from "mongoose";
import User from "./User";
import Artist from "./Artist";
import Music from "./Music";

const Schema = mongoose.Schema;

const Data = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  aval: { type: Number, required: true },
  date: { type: Date, default: Date.now(), required: true },
});

const Post = new Schema({
  user: { type: User, default: {} },
  data: { type: Data, default: {} },
  music: { type: Music, default: {} },
  artist: { type: Artist, default: {} },
});

export default mongoose.model("Post", Post);
