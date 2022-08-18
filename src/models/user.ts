import mongoose from 'mongoose';
import PasswordHashAndCompare from '../helpers/password';
// Interface to describe properties for creating a user
interface IUserAttrs {
    email: string;
    password: string;
    name: string;
    mfa: boolean;
    phone: string;
}

// Interface that describes that a User doc has.
export interface IUserDoc extends mongoose.Document {
    id: string;
    email: string;
    password: string;
    name: string;
    mfa: boolean;
    phone: string;
}

// Interface that describe that a User model has.
interface IUserModel extends mongoose.Model <IUserDoc> {
    build(attrs: IUserAttrs): IUserDoc;
};

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    mfa: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false,
    },
    collection: 'users'
});

userSchema.set('timestamps', true); // createdAt & updatedAt

//Middleware function for mongoose + normal function so 'this' refers to doc, not whole file.
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await PasswordHashAndCompare.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// Adding the build static function to replace new User (mongoose official docs)
userSchema.statics.build = (attrs: IUserAttrs) => {
    return new User(attrs);
};

// <UserDoc, UserModel> first generic returns the Doc, second generic returns UserModel. Order is important!
const User = mongoose.model<IUserDoc, IUserModel>('users', userSchema);

export default User;