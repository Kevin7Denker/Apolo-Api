import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SimpleUser = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model("SimpleUser", SimpleUser);
