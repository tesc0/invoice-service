import mongoose from 'mongoose';

const Partner = mongoose.model('Partner', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    taxNumber: {
        type: String,
        required: true,
        trim: true
    },
    zip: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    currency: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

export { Partner as default };