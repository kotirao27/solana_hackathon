/**
 * Hello world
 */

import {
  establishConnection,
  establishPayer,
  checkProgram,
  pushInvoiceData,
  pullInvoiceData,
} from './invoicekyc_client';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Check if the program has been deployed
  await checkProgram();

  // Save invoice data
  await pushInvoiceData('{"invoiceNo":"123","supplierName": "XYZ"}');

  // Find out how many times that account has been greeted
  await pullInvoiceData();

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
