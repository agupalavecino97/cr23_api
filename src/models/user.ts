import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface Iuser extends Document{ 
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowecase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<Iuser>('save', async function (next) {
    const user = this;
    
    if (!user.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}

export default model<Iuser>('user', userSchema);