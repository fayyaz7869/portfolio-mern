import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    description: { type: String, required: true },
    stack: [String],
    live: String,
    github: String,
    githubSecondary: String,
    githubSecondaryLabel: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
