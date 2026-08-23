import { User, IUser } from "../../models/user/userModel";
import mongoose from "mongoose";
import {Role} from "../../models/user/userModel";

class userRepository {
  
    async findById(id: string): Promise<IUser | null> {
      return User.findById(id);
    }

    async findLoggedUser(id: string): Promise<IUser | null> {
      return User.findById(id).populate("tenant_id", "name");
    }


  async findByEmail({email}: {email: string}): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async getNumberOfAllTeachers (data: any): Promise<Number>{
    const numOfUsers = await User.countDocuments({role : Role.ADMIN}) || 0;
    return numOfUsers;
  }

  async getNumberOfAllStudents (data: any): Promise<Number>{
    const numOfUsers = await User.countDocuments({role : Role.student}) || 0;
    return numOfUsers;
  }

}

export default new userRepository();