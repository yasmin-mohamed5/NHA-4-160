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
      role: data.role,
      tenant_id: data.tenant_id
    });

    return user;
  }

  async getAllStudentsInAcademy (data: any): Promise<IUser[]> {
    const users = await User.find({tenant_id: data.tenant_id, role : Role.student}) ||[];
    return users;
  }

  async getStudentNumberInAcademy (data: any): Promise<Number>{
    const numOfUsers = await User.countDocuments({
      tenant_id: data.tenant_id, 
      role : Role.student
    }) || 0;
    return numOfUsers;
  }
}

export default new StudentAuthRepository();