import mongoose, { Document, Schema } from "mongoose";

export enum Status {
  DRAFT = "draft",
  PUBLISHED = "published"
}

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  status: Status;
  tenant_id: Schema.Types.ObjectId;
  thumbnail_url: string;
  category: string;
  created_at: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    tenant_id:{
      type: Schema.Types.ObjectId,
      ref: "academy",
      required: true,
      trim: true
    },
    thumbnail_url:{
      type: String,
      required: false,
      trim: true
    },
    price:{
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [Status.DRAFT, Status.PUBLISHED],
      default: Status.DRAFT
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

export const Course = mongoose.model<ICourse>("course", courseSchema);