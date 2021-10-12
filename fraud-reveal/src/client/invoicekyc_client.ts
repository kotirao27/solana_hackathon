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
const PROGRAM_SO_PATH = path.join(PROGRAM_PATH, 'kycdocument.so');

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/helloworld.so`
 */
const 
PROGRAM_KEYPAIR_PATH = path.join(PROGRAM_PATH, 'kycdocument-keypair.json');


class InvoiceData {
  
  invoiceno = "123e4567-e89b-12d3-a456-556642440000";
  suppliername = "123e4567-e89b-12d3-a456-556642440000";
  instruction ="CREATE";
  invoicedate= "09-OCT-2021";
  customername= "Test Cust";
  invoiceamt=0;
  isfinanced="N";  
  constructor(fields: {invoiceno: string,suppliername:string, instruction:string,isfinanced:string,invoiceamt:number,invoicedate:string,customername:string} | undefined = undefined) {
    if (fields) {
        this.invoiceno = fields.invoiceno;
	this.suppliername = fields.suppliername;
	this.customername = fields.customername;
	this.invoicedate = fields.invoicedate;
	this.invoiceamt = fields.invoiceamt;
	this.instruction = fields.instruction;
    	this.isfinanced = fields.isfinanced;
    }
  }
}

/**
 * The state of a greeting account managed by the hello world program
 */
 class InvoiceDataList {
   
    data: InvoiceData[] = [];
     
 }

/**
 * Borsh schema definition for Invoice data
 */
const InvoiceDataSchema = new Map([
  [InvoiceData, {kind: 'struct', fields: [['instruction', 'string'],['invoiceno', 'string'],['suppliername','string'],['isfinanced','string'],['invoicedate','string'],['invoiceamt','u32'],['customername','string']]}],
]);

/**
 * The expected size of each invoice data.
 */

const GREETING_SIZE=2000;

//const GREETING_SIZE = borsh.serialize(
  //InvoiceDataSchema,
  //new InvoiceData(),
//).length;

/**
 * Establish a connection to the cluster
 */
export   async function establishConnection(): Promise<void> {
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
  console.log('space {}',GREETING_SIZE);
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
  console.log('Account info {}',greetedAccount);
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

/**
 * Save invoice data
 */
export async function queryData(jsonMessage : string): Promise<void> {
  console.log('Sending request data'+jsonMessage);
  const paddedMsg = jsonMessage.padEnd(1000);
  const buffer = Buffer.from(paddedMsg, 'utf8');

  const instruction = new TransactionInstruction({
    keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
    programId,
    data: buffer,
  });
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
 * Query invoice data
 */
export async function updateData(jsonMessage:string): Promise<void> {
  console.log('Sending update request data'+jsonMessage);
  const paddedMsg = jsonMessage.padEnd(1000);
  const buffer = Buffer.from(paddedMsg, 'utf8');

  const instruction = new TransactionInstruction({
    keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
    programId,
    data: buffer,
  });
 const result =  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer],
    {   commitment: 'singleGossip',
	      preflightCommitment: 'singleGossip',
    },
  );
  console.log('result data {}',result);
}
