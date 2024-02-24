import mongoose, { Schema } from "mongoose";

export interface IImage {
  title: string;
  image_source: string;
  description: string;
}

const imageSchema = new Schema<IImage>({
  title: {
    type: "string",
    required: true,
  },
  image_source: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
});

export default mongoose.model("image", imageSchema);
