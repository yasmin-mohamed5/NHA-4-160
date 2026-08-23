import { User, IUser } from "../../models/user/userModel";
import mongoose from "mongoose";
import {Role} from "../../models/user/userModel";

class StudentAuthRepository {

  async create(data: any): Promise<IUser> {
    const user = await User.create({
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: data.role
    });

    return user;
  }
}

export default new StudentAuthRepository();