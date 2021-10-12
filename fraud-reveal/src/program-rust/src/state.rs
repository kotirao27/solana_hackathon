use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use solana_program::borsh::try_from_slice_unchecked;
use serde::{Deserialize, Serialize};
use borsh::{BorshDeserialize,BorshSerialize};
/// Define the type of state stored for invoice and supplier

