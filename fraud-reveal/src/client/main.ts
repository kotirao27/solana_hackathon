
 import {
  establishConnection,
  establishPayer,
  checkProgram,
  updateData,
  queryData,
  sendRequestData
} from './invoicekyc_client';

async function main() {
  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Check if the program has been deployed
  await checkProgram();

  await sendRequestData('{"instruction":"CREATE","invoiceno":"test4","invoicedate":"09-OCT-2021","suppliername":"test4","customername":"Cust","invoiceamt":10,"isfinanced":"N"}');

  //await queryData('{"instruction":"UPDATE","invoiceno":"INV003","invoicedate":"09-OCT-2021","suppliername":"TestSuppplier","customername":"Cust","invoiceamt":10,"isfinanced":"Y"}');
  
  //await updateData('{"instruction":"CREATE","invoiceno":"test3","suppliername":"test3","isfinanced":"N"}');
 
  await queryData();

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
