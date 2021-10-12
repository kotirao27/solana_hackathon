/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import os from 'os';
import fs from 'mz/fs';
import path from 'path';
import yaml from 'yaml';
import {Keypair} from '@solana/web3.js';

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
  const secretKey = Uint8Array.from(JSON.parse("[120,42,43,248,240,79,158,101,254,247,240,147,154,247,187,24,29,74,242,11,236,136,68,89,123,68,163,11,41,166,0,93,255,126,69,84,196,105,46,189,111,62,108,151,60,223,251,6,40,56,141,215,213,55,110,2,25,146,78,159,140,121,95,106]"));
  return Keypair.fromSecretKey(secretKey);
}
