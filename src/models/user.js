import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
            trim: true
        }        
    }],
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

userSchema.virtual('partners', {
    ref: 'Partner',
    localField: '_id',
    foreignField: 'user_id'
});

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('Unable to login');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);    
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;    
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SALT);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

const User = mongoose.model('User', userSchema);

export { User as default };