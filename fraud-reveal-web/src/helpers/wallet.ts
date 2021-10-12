// @ts-ignore
import Wallet from "@project-serum/sol-wallet-adapter";
import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import path from 'path';
import EventEmitter from "eventemitter3";
import * as borsh from 'borsh';
import {createKeypairFromFile} from './utils';


export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

let programId = new PublicKey("H4ntmW2rW7RhLrmbNavdFd45nvVfvEV9VQt4ziRxj3kt");

let connection: Connection;

/**
 * Keypair associated to the fees' payer
 */
let payer: Keypair;

/**
 * The public key of the account we are saying hello to
 */
let greetedPubkey: PublicKey;


class InvoiceData {
  
  invoiceno = "123e4567-e89b-12d3-a456-556642440000";
  suppliername = "123e4567-e89b-12d3-a456-556642440000";
  instruction ="CREATE";
  invoicedate= "09-OCT-2021";
  customername= "Test Cust";
  invoiceamt=0;
  isfinanced="N";
  
  constructor(fields: {invoiceno: string,suppliername:string, instruction:string,invoicedate:string,customername:string, invoiceamt:number,isfinanced:string} | undefined = undefined) {
    if (fields) {
  this.invoiceno = fields.invoiceno;
	this.suppliername = fields.suppliername;
	this.instruction = fields.instruction;
	this.invoicedate = fields.invoicedate;
	this.customername = fields.customername;
  this.invoiceamt = fields.invoiceamt;
  this.isfinanced=fields.isfinanced;
    }
  }
}

 class InvoiceDataList {
   
    data: InvoiceData[] = [];
     
 }

/**
 * Borsh schema definition for Invoice data
 */
const InvoiceDataSchema = new Map([
  [InvoiceData, {kind: 'struct', fields: [['instruction', 'string'],['invoicedate','string'],['invoiceno', 'string'],['suppliername','string'],['customername','string'],['invoiceamt','u32'],['isfinanced','string']]}],
]);

const GREETING_SIZE = 10000;

export async function initSolanaWallet() {

  await establishConnection();

  // Determine who pays for the fees
  await establishPayer();

  // Check if the program has been deployed
  await checkProgram();

}

/**
 * Establish a connection to the cluster
 */
 export   async function establishConnection(): Promise<void> {
  const rpcUrl = "https://api.devnet.solana.com";
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

    payer = await createKeypairFromFile();
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
  // Check if the program has been deployed
const programInfo = await connection.getAccountInfo(programId);
  if (programInfo === null) {
      throw new Error('Program has issues');
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
 export async function sendRequestData(jsonMessage : string): Promise<void> {
   
  await publishMessage(jsonMessage);
 }

/**
 * Query invoice data
 */
export async function queryData(jsonMessage:string): Promise<void> {
 
  await publishMessage(jsonMessage);
}

/**
 * Update is financed
 */
 export async function updateData(jsonMessage:string): Promise<void> {

  await publishMessage(jsonMessage);
}

export async function publishMessage(jsonMessage:string): Promise<void> {

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
