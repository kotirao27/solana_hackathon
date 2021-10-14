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

  const secretKey = Uint8Array.from(JSON.parse("[99,210,245,238,130,130,56,116,93,153,68,184,249,39,120,9,187,168,134,78,231,120,47,76,75,140,218,170,179,179,120,92,39,82,173,108,189,43,52,248,59,164,221,69,43,72,66,217,183,210,136,46,55,208,168,1,53,191,56,195,136,200,95,114]"));
  return Keypair.fromSecretKey(secretKey);
}
