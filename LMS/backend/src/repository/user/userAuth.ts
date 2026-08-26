import { User, IUser } from "../../models/user/userModel";
import {Role} from "../../models/user/userModel";
import CourseEnrollment from "../../repository/student/enrollmentRepository";

class userRepository {
  
    async findById(id: string): Promise<IUser | null> {
      return User.findById(id);
    }

    async deleteUser(userId: string) {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      // Delete the user
      await User.findByIdAndDelete(userId);

      // Only students have enrollments
      if (user.role === Role.student) {
        await CourseEnrollment.deleteMany(userId);
      }

      return true;
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

  async getPaginatedUsers(page: number, limit: number) {
      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
          User.find()
              .populate("tenant_id", "name")
              .sort({ _id: 1 })
              .skip(skip)
              .limit(limit),

          User.countDocuments()
      ]);

      return {
          users,
          total
      };
  }

}

export default new userRepository();