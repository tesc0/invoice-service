import { promises as fs } from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import wkhtmltopdf from 'wkhtmltopdf';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createDocument = async (nextId, partnerData, invoiceData) => {

    const date = new Date();
    const year = date.getFullYear();
    const invoiceNumber = year + '-SZLA' + nextId;

    const filename = await fs.readFile(__dirname + '\\..\\templates\\invoice.html', 'utf8').then(data => {

        let invoiceHtml = data;

        invoiceHtml = invoiceHtml.replace('[partner_name]', partnerData.name);
        invoiceHtml = invoiceHtml.replace('[partner_address]', partnerData.zip + ' ' + partnerData.city + ', ' + partnerData.address);
        invoiceHtml = invoiceHtml.replace('[partner_taxnumber]', partnerData.taxNumber);
        invoiceHtml = invoiceHtml.replace('[partner_iban]', partnerData.iban);
        invoiceHtml = invoiceHtml.replace('[partner_bankaccount]', partnerData.bank_account);

        invoiceHtml = invoiceHtml.replace('[buyer_name]', invoiceData.buyer.name);
        invoiceHtml = invoiceHtml.replace('[buyer_address]', invoiceData.buyer.address);
        
        invoiceHtml = invoiceHtml.replace('[payment_method]', invoiceData.payment_method);
        invoiceHtml = invoiceHtml.replace('[fulfillment_date]', invoiceData.fulfillment_date);
        invoiceHtml = invoiceHtml.replace('[invoice_date]', invoiceData.invoice_date);
        invoiceHtml = invoiceHtml.replace('[due_date]', invoiceData.due_date);
        invoiceHtml = invoiceHtml.replace('[invoice_number]', invoiceNumber);

        const { html: itemsHtml, sum: sumData } = processItems(invoiceData.items, partnerData.currency);

        invoiceHtml = invoiceHtml.replace('[net_sum]', sumData.net);
        invoiceHtml = invoiceHtml.replace('[vat_sum]', sumData.vat);
        invoiceHtml = invoiceHtml.replace('[gross_sum]', sumData.gross);

        invoiceHtml = invoiceHtml.replace('[items]', itemsHtml);

        invoiceHtml = invoiceHtml.replaceAll('[currency]', partnerData.currency);
        //console.log(invoiceHtml);

        const filename = invoiceNumber + '.pdf';

        wkhtmltopdf(invoiceHtml, { output: __dirname + '\\..\\..\\__invoices\\' + filename, spawnOptions:{shell: true} });

        return filename;

    }).catch(err => {
        throw new Error(err);
    });

    return { filename, invoiceNumber };

};

const processItems = (items, currency) => {

    const sum = {
        'net': 0,
        'vat': 0,
        'gross': 0
    };

    let html = '';

    items.forEach(item => {
        sum.net += item.quantity * item.net_price;
        sum.vat += item.quantity * item.net_price * (item.vatKey / 100);
        sum.gross += sum.net + sum.vat;

        html += '<tr>';
        html += '<td>' + item.name + '</td>';
        html += '<td>' + item.quantity + ' ' + item.unit + '</td>';
        html += '<td>' + item.net_price + currency + '</td>';
        html += '<td>' + (item.net_price * item.quantity) + ' ' + currency + '</td>';
        html += '<td>' + item.vatKey + '%</td>';
        html += '<td>' + (item.quantity * ((item.net_price * item.vatKey / 100))) + ' ' + currency + '</td>';
        html += '<td>' + (item.quantity * (item.net_price + (item.net_price * item.vatKey / 100))) + ' ' + currency + '</td>';
        html += '</tr>';
    });

    return { html, sum };
};

export { createDocument as default };



