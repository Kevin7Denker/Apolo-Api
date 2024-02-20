import mongoose from "mongoose";
import User from "./User";
import Artist from "./Artist";

const Schema = mongoose.Schema;

const Data = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  aval: { type: Number, required: true },
  date: { type: Date, default: Date.now(), required: true },
});

const Music = new Schema({
  SpotifyId: { type: String, required: true },
  name: { type: String, required: true },
  image: {
    type: String,
    required: true,
    default: {},
  },
  releaseDate: { type: String, required: true },
});

const Post = new Schema({
  user: { type: User, default: {} },
  data: { type: Data, default: {} },
  music: { type: Music, default: {} },
  artist: { type: Artist, default: {} },
});

export default mongoose.model("Post", Post);
