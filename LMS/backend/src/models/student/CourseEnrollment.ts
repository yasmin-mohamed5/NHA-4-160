import mongoose, { Document, Schema } from "mongoose";

export interface ICourseEnrollment extends Document {
    studentId: Schema.Types.ObjectId;
    course_id: Schema.Types.ObjectId;
    progress: number;
    created_at: Date;
}

const CourseEnrollmentSchema = new Schema<ICourseEnrollment>(
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

    course_id: {
      type: Schema.Types.ObjectId,
      ref: "course",
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

CourseEnrollmentSchema.index({ studentId: 1, course_id: 1 }, { unique: true });

export const CourseEnrollment = mongoose.model<ICourseEnrollment>("CourseEnrollment", CourseEnrollmentSchema);