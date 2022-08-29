import { Schema, model, Document, SchemaTimestampsConfig, Types } from 'mongoose';



export interface IAuthToken extends Document, SchemaTimestampsConfig{
   userId:Types.ObjectId;
   userAgent:string;
   authToken:string;
   refreshToken:string;
   issueAt: number;
   expireAt: number;
  }
  
  // 2. Create a Schema corresponding to the document interface.
  const authSchema = new Schema<IAuthToken>({
   userId: {type: Schema.Types.ObjectId, ref: 'User', index:true},
   userAgent:{type:String},
   authToken: {type:String, required: true, index: true},
   refreshToken: {type:String, required: true, index: true},
   issueAt: {type:Number},
   expireAt: {type:Number}
  },{
    timestamps:true,
    toJSON : {
        transform(_ref, doc, her ) {
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
  

export const AuthToken = model<IAuthToken>('AuthToken', authSchema);