/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import yaml from 'yaml';
import {Keypair} from '@solana/web3.js';


let user:string;

export async function setUser(username:string){
  user = username;
}

export async function getUser():Promise<String> {
  console.log(user);
 return user; 
}
/**
 * @private
 */
async function getConfig(): Promise<any> {
  // Path to Solana CLI config file
  const CONFIG_FILE_PATH = path.resolve(
    os.homedir(),
    '.config',
    'solana',
    'cli',
    'config.yml',
  );
  const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
  return yaml.parse(configYml);
}

/**
 * Create a Keypair from a secret key stored in file as bytes' array
 */
export async function createKeypairFromFile(
): Promise<Keypair> {
//  const config = await getConfig();

  const secretKey = Uint8Array.from(JSON.parse("[177,77,42,168,84,109,92,15,90,28,2,205,139,104,234,239,153,72,249,100,108,171,202,255,5,249,7,235,211,28,26,92,115,75,10,115,29,187,59,12,93,13,191,98,49,60,174,177,89,99,79,250,144,207,59,9,120,165,171,197,113,230,237,17]"));
  return Keypair.fromSecretKey(secretKey);
}
