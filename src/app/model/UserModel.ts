import mongoose, {Schema, Document} from "mongoose";

export interface MessageInterface extends Document{
    content: string;
    createdAt: Date;
}

export interface UserInterface extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiryDate: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: MessageInterface[];
}


const MessageSchema: Schema<MessageInterface> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserSchema: Schema<UserInterface> = new Schema({
    username:{
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/^[^@]+@[^@]+\.[^@]+$/, "please provide valid email"]
    },
    password:{
        type: String,
        required: [true, 'password is required'],
    },
    verifyCode:{
        type: String,
        required: [true, "verify code is required"]
    },
    verifyCodeExpiryDate:{
        type: Date,
        required: [true, "verify code expiry date is required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>("User", UserSchema);

export default UserModel;