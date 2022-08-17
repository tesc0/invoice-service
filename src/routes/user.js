import express from 'express';
import User from '../models/user.js';

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send();
    }    
});

router.post('/users/login', async (req, res) => {
    const invoice = new User(req.body);

    try {
        await invoice.save();
        res.status(201).send(invoice);
    } catch (e) {
        res.status(400).send();
    }    
});


export { router as default };