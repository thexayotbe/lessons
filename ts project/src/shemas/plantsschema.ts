import { Schema, model, Model } from "mongoose";

// Define an interface for the plant document
export interface IPlant {
  image: string;
  title: string;
  description: string;
  type: "gardening" | "domestic" | "homepot";
}

const plantsModuleSchema: Schema = new Schema<IPlant>({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["gardening", "domestic", "homepot"],
  },
});
export const GardeningModel: Model<IPlant> = model<IPlant>(
  "Gardening",
  plantsModuleSchema
);
export const DomesticModel: Model<IPlant> = model<IPlant>(
  "Domestic",
  plantsModuleSchema
);
export const HomepotModel: Model<IPlant> = model<IPlant>(
  "Homepot",
  plantsModuleSchema
);
