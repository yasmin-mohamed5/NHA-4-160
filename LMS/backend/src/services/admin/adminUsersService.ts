import  User  from "../../repository/user/userAuth";

class adminUsersService{
    async getPaginatedUsers(page: number, limit: number) {
        return await User.getPaginatedUsers(page, limit);
    }

    async deleteUser(id: string) {
        if(!id){
            const error ={
                message: "user id is required",
                code: 400
            }
            throw error
        }
        return await User.deleteUser(id);
    }
}

export default new adminUsersService();