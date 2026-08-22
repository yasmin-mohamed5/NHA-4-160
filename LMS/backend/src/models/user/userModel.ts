import mongoose, { Document, Schema } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "super-admin"
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: Role.ADMIN | Role.USER | Role.SUPERADMIN;
  tenant_id: mongoose.Types.ObjectId;
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
      enum: [Role.USER, Role.ADMIN, Role.SUPERADMIN],
      default: Role.ADMIN
    },

    tenant_id: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: false
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