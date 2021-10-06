/**
 * Hello world
 */

import {
  establishConnection,
  establishPayer,
  checkProgram,
  sendRequestData,
  reportGreetings,
} from './invoicekyc_client';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Check if the program has been deployed
  await checkProgram();

  //await sayHello();
  // Say hello to an account
  await sendRequestData('{"invoiceno":"test","suppliername":"test"}');

  // Find out how many times that account has been greeted
  //await reportGreetings();

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  },
);
