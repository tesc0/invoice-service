import express from 'express';
import User from '../models/user.js';
import auth from '../util/auth.js';

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {     
        const token = await user.generateAuthToken();   
        await user.save();

        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }    
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send();
    }    
});

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});


export { router as default };