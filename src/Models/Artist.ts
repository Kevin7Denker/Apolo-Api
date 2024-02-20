import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Artist = new Schema({
  spotifyId: { type: String, required: true },
  name: { type: String, required: true },
  SpotifyFollowers: { type: Number, default: {}, required: true },
  images: { type: String, default: {}, required: true },
  genres: { type: String, default: {}, required: true },
});

export default mongoose.model("Artist", Artist);
