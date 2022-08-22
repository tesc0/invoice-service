import express from 'express';
import Invoice from '../models/invoice.js';
import auth from '../util/auth.js';
import Partner from '../models/partner.js';
import InvoiceDocument from '../util/pdf.js';

const router = new express.Router();

router.post('/invoices', auth, async (req, res) => {    
    const params = req.body;

    try {

        const partnerData = await Partner.findById(params.partner_id);
        const invoiceCount = await Invoice.count({ partner_id: params.partner_id });
        
        let nextInvoiceId = 1;
        if (invoiceCount) {
            nextInvoiceId = invoiceCount + 1;
        }

        const { filename, invoiceNumber } = await InvoiceDocument(nextInvoiceId, partnerData, params);

        let invoiceData = {
            data: JSON.stringify(params),
            partner_id: partnerData._id,
            number: invoiceNumber,
            filename: filename
        }
        
        const invoice = new Invoice(invoiceData);
        console.log(invoice);
        await invoice.save();

        res.status(201).send();
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }    
});

router.get('/invoices', auth, async (req, res) => {
    try {
        const partners = await Partner.find({ user_id: req.user._id }).select('_id');
        const partnerIds = [];
        partners.forEach(partner => partnerIds.push(partner._id));

        const invoices = await Invoice.find({ $or: partnerIds.map(partnerId => { return { partner_id: partnerId } }) });
        res.status(200).send(invoices);
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});
/*
router.get('/invoices/template', (req, res) => {
    res.sendFile('invoice.html');
});
*/

export { router as default };