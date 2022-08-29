import { Schema, model, Document, SchemaTimestampsConfig, Model } from 'mongoose';
import bcrypt from 'bcrypt';


export interface IUser extends Document, SchemaTimestampsConfig{
    firstName: string;
    lastName?: string|null;
    email: string;
    emailVerifyAt?: Date|null|string;
    phone?: string|null;
    phoneVerifyAt?: Date|null|string;
    isSuperAdmin?:boolean;
    password:string;
    
  }

interface IUserMethods {
    checkPassword: (password: string) => boolean;
}
  
  // 2. Create a Schema corresponding to the document interface.
  const userSchema = new Schema<IUser, Model<IUser, {}, IUserMethods>>({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: {type:String, required: true, unique: true},
    emailVerifyAt: {type:Date, default:null},
    phone: {type:String, default:null, index: true},
    phoneVerifyAt: {type:Date, default:null},
    isSuperAdmin: {type: Boolean, default:false},
    password: {type: String, required:true}
  },{
    timestamps:true,
    toJSON : {
        transform(_ref, doc, her ) {
            delete doc.password
            delete doc.__v;
            doc.id = doc._id
            return doc;
        }
    },
    toObject: {
        transform(_ref, doc, her ) {
            doc.id = doc._id
            return doc;
        }
    }
  });
  
userSchema.pre('save', async function(next) {
    const user:IUser = this;
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  });

userSchema.methods.checkPassword = async function(password:string){
    return await bcrypt.compare(password, this.password)
}

export const User = model<IUser, Model<IUser, {}, IUserMethods>>('User', userSchema);