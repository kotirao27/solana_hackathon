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

  //const secretKeyString = await fs.readFile('/home/kotirao227/.config/solana/id.json', {encoding: 'utf8'});
  const secretKey = Uint8Array.from(JSON.parse("[36,211,126,107,194,118,130,25,72,228,74,19,110,217,133,42,220,206,119,77,109,211,11,89,32,64,200,90,50,243,165,223,58,196,136,132,20,232,54,181,126,11,104,129,49,177,179,64,50,174,93,163,107,128,226,124,171,197,159,21,5,88,133,142]"));
  return Keypair.fromSecretKey(secretKey);
}
