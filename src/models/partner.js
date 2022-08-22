import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
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
    bank: {
        type: String,
        required: true,
        trim: true
    },
    bank_account: {
        type: String,
        required: true,
        trim: true
    },
    iban: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

partnerSchema.pre('save', async function(next) {
    const partner = this;

    next();
});

partnerSchema.virtual('invoices', {
    ref: 'Invoice',
    localField: '_id',
    foreignField: 'partner_id'
});

const Partner = mongoose.model('Partner', partnerSchema);

export { Partner as default };