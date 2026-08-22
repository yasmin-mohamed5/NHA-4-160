import mongoose, { Document, Schema } from "mongoose";

export interface IPlan extends Document {
  name: string;
  price: number;
  duration_months: number;
  courses_limit: number;
  features: string[];
  created_at: Date;
}

const planSchema = new Schema<IPlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    duration_months: {
      type: Number,
      required: true
    },
    courses_limit: {
      type: Number,
      required: true
    },
    features: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

export const Plan = mongoose.model<IPlan>("Plan", planSchema);