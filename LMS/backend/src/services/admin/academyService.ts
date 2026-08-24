import  Academy  from "../../repository/teacher/academy";

class adminUsersService{
    async getPaginatedAcademies (page: number, limit: number) {
        return await Academy.getPaginatedAcademies(page, limit);
    }

    async deleteAcademy(id: string) {
        if(!id){
            const error ={
                message: "Academy id is required",
                code: 400
            }
            throw error
        }
        return await Academy.deleteacademy(id);
    }
}

export default new adminUsersService();