import {IUser,User} from './user.model';

export const createUser: Function = async (iUser: IUser): Promise<IUser> =>{
    return await User.create(iUser);
}

export const userList: Function = async () : Promise<IUser[]> => {
    return await User.find();
}

export const findByEmail: Function = async (email:string) :Promise<IUser|null> =>{
    return await User.findOne({email:email});
}

export const findById: Function = async (id:string) :Promise<IUser|null> =>{
    return await User.findById(id);
}