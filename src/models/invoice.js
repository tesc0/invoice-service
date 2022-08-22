import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    partner_id: {
        type: String,
        required: true,
        ref: 'Partner'
    },
    filename: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

invoiceSchema.pre('save', async function(next) {
    const invoice = this;
    await invoice.populate('partner_id');
    next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export { Invoice as default };