import mongoose, { Document, Schema } from "mongoose";
import { number } from "zod";

export interface IEnrollment extends Document {
    studentId: Schema.Types.ObjectId;
    tenant_id: Schema.Types.ObjectId;
    progress: number;
    created_at: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    progress:{
      type: Number,
      default: 0,
    },

    tenant_id: {
      type: Schema.Types.ObjectId,
      ref: "academy",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

export const Enrollment = mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);