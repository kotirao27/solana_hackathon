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
  const secretKey = Uint8Array.from(JSON.parse("[62,127,255,97,109,17,53,127,53,181,173,6,92,251,22,3,218,31,47,121,178,207,178,234,122,202,233,181,242,163,96,45,14,159,182,78,27,169,224,7,51,209,49,98,32,217,32,213,247,110,119,231,120,60,150,236,102,56,205,234,217,185,58,33]"));
  return Keypair.fromSecretKey(secretKey);
}
