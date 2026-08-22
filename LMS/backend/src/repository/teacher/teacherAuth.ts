import { User, IUser } from "../../models/user/userModel";
import mongoose from "mongoose";

class teacherAuthRepository {

  async create(data: any): Promise<IUser> {
    const user = await User.create({
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: data.role,
      tenant_id: new mongoose.Types.ObjectId(data.tenant_id)
    });

    return user;
  }


  async findAll(): Promise<IUser[]> {
    return User.find();
  }


  async update(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {

    return User.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true
      }
    );
  }


  async delete(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id);
  }
}

export default new teacherAuthRepository();