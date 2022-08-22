import chalk from 'chalk';
import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import './db/db.js';

// import routes
import invoiceRouter from './routes/invoice.js';
import partnerRouter from './routes/partner.js';
import userRouter from './routes/user.js';

const port = process.env.PORT || 3001;
const app = express();

const templatePath = path.join(__dirname, '/templates');
app.use(express.static(templatePath))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// use routes
app.use(invoiceRouter);
app.use(partnerRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(chalk.green('invoice-service is up on port ' + port));
});