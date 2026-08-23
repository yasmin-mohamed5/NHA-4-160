import mongoose, { Document, Schema } from "mongoose";

export interface IAcademy extends Document {
  name: string;
  planId: Schema.Types.ObjectId;
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
      type: Schema.Types.ObjectId,
      ref: "Plan",
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