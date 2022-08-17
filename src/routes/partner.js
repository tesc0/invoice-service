import express from 'express';
import Partner from '../models/partner.js';
import auth from '../util/auth.js';

const router = new express.Router();

router.post('/partners', auth, async (req, res) => {
    const partner = new Partner(req.body);

    try {
        await partner.save();
        res.status(201).send(partner);
    } catch (e) {
        res.status(400).send();
    }    
});


export { router as default };