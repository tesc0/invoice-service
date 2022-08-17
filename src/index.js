import chalk from 'chalk';
import express from 'express';

import invoiceRouter from './routes/invoice.js';
import partnerRouter from './routes/partner.js';

const port = process.env.PORT || 3001;
const app = express();

app.use(invoiceRouter);
app.use(partnerRouter);

app.listen(port, () => {
    console.log(chalk.green('invoice-service is up on port ' + port));
});