import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, slug: "title", slugPaddingSize: 4, unique: true },
    detail: { type: String, required: true },
    image: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "author id is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
