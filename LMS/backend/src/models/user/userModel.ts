import mongoose, { Document, Schema } from "mongoose";

export enum Role {
  student = "student",
  ADMIN = "admin",
  SUPERADMIN = "super-admin"
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: Role.ADMIN | Role.student | Role.SUPERADMIN;
  tenant_id: Schema.Types.ObjectId;
  created_at: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: [Role.student, Role.ADMIN, Role.SUPERADMIN],
      default: Role.ADMIN
    },

    tenant_id: {
      type: Schema.Types.ObjectId,
      ref: "academy",
      required: true,
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

export const User = mongoose.model<IUser>("User", userSchema);