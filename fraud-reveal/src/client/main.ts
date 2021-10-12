/**
 * Hello world
 */

 import {
  establishConnection,
  establishPayer,
  checkProgram,
  updateData,
  queryData
} from './invoicekyc_client';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Check if the program has been deployed
  await checkProgram();

  //await sendRequestData('{"instruction":"CREATE","invoiceno":"test4","invoicedate":"09-OCT-2021","suppliername":"test4","customername":"Cust","invoiceamt":10,"isfinanced":"N"}');



  await updateData('{"instruction":"UPDATE","invoiceno":"INV003","invoicedate":"09-OCT-2021","suppliername":"TestSuppplier","customername":"Cust","invoiceamt":10,"isfinanced":"Y"}');
  
// await sendRequestData('{"instruction":"CREATE","invoiceno":"test3","suppliername":"test3","isfinanced":"N"}');
 

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
