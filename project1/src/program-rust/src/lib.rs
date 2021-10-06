use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    log::{sol_log_compute_units, sol_log_params, sol_log_slice},
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::mem;
use borsh::{BorshDeserialize,BorshSerialize}
use serde::{Deserialize, Serialize};


#[derive(Debug, Deserialize, Serialize, BorshDeserialize, BorshSerialize)] struct InvoiceData {
    invoiceno: String,
    suppliername: String,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)] struct InvoiceDataList {
    data: Vec<InvoiceData>
}


entrypoint!(entry);

fn entry(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Received invoice request");

    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    let data = account.try_borrow_mut_data()?;

    let mut memo = String::from_utf8(instruction_data.to_vec()).map_err(|err| {
            msg!("Invalid UTF-8, from byte {}");
            ProgramError::InvalidInstructionData
    })?;

    let mut iter = memo.chars();
    let mut slice = iter.as_str();
    let mut txtFinal = String::from(slice);
	
    msg!("Received  request is {}",&txtFinal);

    let invObject:  InvoiceData = serde_json::from_str(&txtFinal).unwrap();
    let mut existingData = InvoiceDataList::try_from_slice(&data.borrow())?;
    
    msg!("Received  account data {}",&existingData);

    //unpacked.invoiceNo = txtFinal;
    //unpacked.pack(&mut data);
    msg!("value inside the json objetc is :: {:?}", invObject);

    Ok(())
}
  