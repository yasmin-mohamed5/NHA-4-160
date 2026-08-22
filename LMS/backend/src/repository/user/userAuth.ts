import { User, IUser } from "../../models/user/userModel";
import mongoose from "mongoose";

class userRepository {
  
    async findById(id: string): Promise<IUser | null> {
      return User.findById(id);
    }


  async findByEmail({email}: {email: string}): Promise<IUser | null> {
    return User.findOne({ email });
  }
}

export default new userRepository();