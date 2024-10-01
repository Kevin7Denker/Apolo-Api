import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Music = new Schema({
    SpotifyId: { type: String, required: true },
    name: { type: String, required: true },
    image: {
        type: String,
        required: true,
        default: {},
    },
    releaseDate: { type: String, required: true },
}, { _id: false });
export default Music;
//# sourceMappingURL=Music.js.map