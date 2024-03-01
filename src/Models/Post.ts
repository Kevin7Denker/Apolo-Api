import mongoose from "mongoose";
import Artist from "./Artist";
import Music from "./Music";
import simpleUser from "./User_Models/SimpleUser";

const Schema = mongoose.Schema;

const Data = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    aval: { type: Number, required: true },
    date: { type: Date, default: Date.now(), required: true },
  },
  { _id: false }
);

const Post = new Schema(
  {
    user: { type: simpleUser, default: {}, required: true },
    data: { type: Data, default: {}, required: true },
    music: { type: Music, default: {}, required: true },
    artist: { type: Artist, default: {}, required: true },
  },
  { _id: false }
);

export default mongoose.model("Post", Post);
