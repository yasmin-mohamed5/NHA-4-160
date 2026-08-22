import { User, IUser } from "../../models/user/userModel";
import mongoose from "mongoose";

class adminAuthRepository {
    async create(data: any): Promise<IUser> {
    const user = await User.create({
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    });

    return user;
  }

}

export default new adminAuthRepository();