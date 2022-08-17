import express from 'express';
import Invoice from '../models/invoice.js';

const router = new express.Router();

router.post('/invoices', async (req, res) => {
    const invoice = new Invoice(req.body);

    try {
        await invoice.save();
        res.status(201).send(invoice);
    } catch (e) {
        res.status(400).send();
    }    
});


export { router as default };