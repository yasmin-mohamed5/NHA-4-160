import mongoose, { Document, Schema } from "mongoose";

export interface IAcademy extends Document {
  name: string;
  planId: string;
  logo_url: string;
  status: string;
  created_at: Date;
}

const academySchema = new Schema<IAcademy>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    planId:{
      type: String,
      required: true,
      trim: true
    },
    logo_url:{
      type: String,
      required: false,
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

export const Academy = mongoose.model<IAcademy>("academy", academySchema);