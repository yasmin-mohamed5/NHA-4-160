import { User, IUser, Role } from "../../models/user/userModel";

class enrolledStudents{

    async getAllStudentsInAcademy(tenant_id: any): Promise<IUser[]> {
    const students = await User.find({
        tenant_id: tenant_id,
        role: Role.student // or Role.STUDENT if you have a STUDENT role
    });

    return students;
  }

  async getStudentsNumberInAcademy (tenant_id: any): Promise<Number>{
    const numOfUsers = await User.countDocuments({
      tenant_id: tenant_id,
      role: Role.student
    }) || 0;
    return numOfUsers;
  }

}

export default new enrolledStudents();