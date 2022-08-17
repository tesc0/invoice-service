import mongoose from 'mongoose';

const Invoice = mongoose.model('Invoice', {
    number: {
        type: String,
        required: true,
        trim: true
    },
    partner_id: {
        type: String,
        required: true,
        trim: true
    },
    filename: {
        type: String,
        required: true,
        trim: true
    }
});

export { Invoice as default };