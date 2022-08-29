import { AuthToken } from "./auth-token.model"

export const deleteAllTokenByUserId = async (userId:string) =>{
    await AuthToken.deleteMany({userId: userId})
}