import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
     fullName: string,
     email: string,
     phone: string,
     password: string,
     resetToken?: string,
     resetTokenExpire?: Date, 
     role: 'user' | 'doctor' | 'admin' 
}

const UserSchema: Schema<IUser> = new Schema ({
      fullName: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 30,
         trim: true
      },
      email: {
        type: String,
        required: true,
        lowercase: true
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        minLength: 9,
        maxLength: 11
      },
      password: {
         type: String,
         required: true,
         minLength: 6,
         trim: true
      },
       resetToken: {
       type: String,
       default: null,
      },

       resetTokenExpire: {
        type: Date,
        default: null,
       },
      role: {
      type: String,
      enum: ["user", 'doctor', "admin"],
      default: "user",
    },
}, { timestamps: true })
 
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User