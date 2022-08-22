import express from 'express';
import Partner from '../models/partner.js';
import auth from '../util/auth.js';

const router = new express.Router();

router.post('/partners', auth, async (req, res) => {
    const partner = new Partner(req.body);

    try {
        partner.user_id = req.user._id;
        await partner.save();
        res.status(201).send(partner);
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }    
});

router.get('/partners', auth, async (req, res) => {
    try {
        const partners = await Partner.find({ user_id: req.user._id });
        res.status(200).send(partners);
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});


export { router as default };