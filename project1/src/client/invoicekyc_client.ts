/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import fs from 'mz/fs';
import path from 'path';
import * as borsh from 'borsh';

import {getPayer, getRpcUrl, createKeypairFromFile} from './utils';

/**
 * Connection to the network
 */
let connection: Connection;

/**
 * Keypair associated to the fees' payer
 */
let payer: Keypair;

/**
 * Hello world's program id
 */
let programId: PublicKey;

/**
 * The public key of the account we are saying hello to
 */
let greetedPubkey: PublicKey;

/**
 * Path to program files
 */
const PROGRAM_PATH = path.resolve(__dirname, '../../dist/program');

/**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'dockyc.so');

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/helloworld.so`
 */
const 
PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'dockyc-keypair.json');

/**
 * The state of a greeting account managed by the hello world program
 */
class InvoiceData {
  invoiceno = "";
  suppliername = "";
  constructor(fields=undefined) {
     this.invoiceno = "";
     this.suppliername = "";
     if(fields){
      this.invoiceno = fields.invoiceno;
      this.suppliername = fields.suppliername;
     }
  }	  
}

/**
 * Borsh schema definition for Invoice data
 */
const InvoiceDataSchema = new Map([
  [InvoiceData, {kind: 'struct', fields: [["invoiceno", "string"],["suppliername", "string"]]}],
]);

/**
 * The expected size of each invoice data.
 */

const invoiceData = new InvoiceData();
invoiceData.invoiceno = "123e4567-e89b-12d3-a456-556642440000";
invoiceData.suppliername = "123e4567-e89b-12d3-a456-556642440000";

const GREETING_SIZE = borsh.serialize(
  InvoiceDataSchema,
  invoiceData,
).length;

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<void> {
  const rpcUrl = await getRpcUrl();
  connection = new Connection(rpcUrl, 'confirmed');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', rpcUrl, version);
}

/**
 * Establish an account to pay for everything
 */
export async function establishPayer(): Promise<void> {
  let fees = 0;
  if (!payer) {
    const {feeCalculator} = await connection.getRecentBlockhash();

    // Calculate the cost to fund the greeter account
    fees += await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

    // Calculate the cost of sending transactions
    fees += feeCalculator.lamportsPerSignature * 100; // wag

    payer = await getPayer();
  }

  let lamports = await connection.getBalance(payer.publicKey);
  if (lamports < fees) {
    // If current balance is not enough to pay for fees, request an airdrop
    const sig = await connection.requestAirdrop(
      payer.publicKey,
      fees - lamports,
    );
    await connection.confirmTransaction(sig);
    lamports = await connection.getBalance(payer.publicKey);
  }

  console.log(
    'Using account',
    payer.publicKey.toBase58(),
    'containing',
    lamports / LAMPORTS_PER_SOL,
    'SOL to pay for fees',
  );
}

/**
 * Check if the hello world BPF program has been deployed
 */
export async function checkProgram(): Promise<void> {
  // Read program id from keypair file
  try {
    const programKeypair = await createKeypairFromFile(PROGRAM_KEYPAIR_PATH);
    programId = programKeypair.publicKey;
  } catch (err) {
    const errMsg = (err as Error).message;
    throw new Error(
      `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/dockyc.so\``,
    );
  }

  // Check if the program has been deployed
const programInfo = await connection.getAccountInfo(programId);
  if (programInfo === null) {
    if (fs.existsSync(PROGRAM_SO_PATH)) {
      throw new Error(
        'Program needs to be deployed with `solana program deploy dist/program/dockyc.so`',
      );
    } else {
      throw new Error('Program needs to be built and deployed');
    }
  } else if (!programInfo.executable) {
    throw new Error(`Program is not executable`);
  }
  console.log(`Using program ${programId.toBase58()}`);

  // Derive the address (public key) of a greeting account from the program so that it's easy to find later.
  const GREETING_SEED = 'dockyc';
  greetedPubkey = await PublicKey.createWithSeed(
    payer.publicKey,
    GREETING_SEED,
    programId,
  );

  // Check if the greeting account has already been created
  const greetedAccount = await connection.getAccountInfo(greetedPubkey);
  if (greetedAccount === null) {
    console.log(
      'Creating account',
      greetedPubkey.toBase58(),
    );
    const lamports = await connection.getMinimumBalanceForRentExemption(
      GREETING_SIZE,
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: payer.publicKey,
        basePubkey: payer.publicKey,
        seed: GREETING_SEED,
        newAccountPubkey: greetedPubkey,
        lamports,
        space: GREETING_SIZE,
        programId,
      }),
    );
    await sendAndConfirmTransaction(connection, transaction, [payer]);
  }
}

export async function sayHello(): Promise<void> {
	  console.log('Saying hello to', greetedPubkey.toBase58());
	    const instruction = new TransactionInstruction({
		        keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
			    programId,
			        data: Buffer.alloc(0), // All instructions are hellos
				  });
				    await sendAndConfirmTransaction(
					        connection,
						    new Transaction().add(instruction),
						        [payer],
							  );
}


/**
 * Say hello
 */
export async function sendRequestData(jsonMessage : string): Promise<void> {
  console.log('Sending request data'+jsonMessage);
  const paddedMsg = jsonMessage.padEnd(1000);
  const buffer = Buffer.from(paddedMsg, 'utf8');

  const instruction = new TransactionInstruction({
    keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
    programId,
    data: buffer,
  });
  console.log('connection {}',connection);
  console.log('program id {}',programId);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
    {   commitment: 'singleGossip',
	preflightCommitment: 'singleGossip',
    },
  );
}

/**
 * Report the number of times the greeted account has been said hello to
 */
export async function reportGreetings(): Promise<void> {
  const accountInfo = await connection.getAccountInfo(greetedPubkey);
  if (accountInfo === null) {
    throw 'Error: cannot find the greeted account';
  }
  const data = borsh.deserialize(
    InvoiceDataSchema,
    InvoiceData,
    accountInfo.data,
  );
}
