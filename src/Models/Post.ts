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

const Post = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  data: { type: Data, default: {}, required: true },
  musicId: { type: Schema.Types.ObjectId, required: true },
  artistId: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model("Post", Post);
