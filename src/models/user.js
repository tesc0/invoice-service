import mongoose from 'mongoose';

const User = mongoose.model('User', {
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
});

export { User as default };