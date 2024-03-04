import mongoose from "mongoose";

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
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    data: { type: Data, default: {}, required: true },
    musicId: { type: Schema.Types.ObjectId, ref: "Music", required: true },
    artistId: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  },
  { _id: false }
);

export default mongoose.model("Post", Post);
