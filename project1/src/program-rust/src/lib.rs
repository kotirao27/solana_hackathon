use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint,
	entrypoint::ProgramResult,
	log::{sol_log_compute_units, sol_log_params, sol_log_slice},
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};
use borsh::{BorshDeserialize, BorshSerialize};
use std::mem;
use serde::{Deserialize, Serialize};


#[derive(Debug, Deserialize, Serialize)] struct InoiceData {
	invoiceNo: String,
	supplierName: String,
}

//impl Serdes for Message {}

entrypoint!(entry);

fn entry(
	program_id: &Pubkey,
	accounts: &[AccountInfo],
	instruction_data: &[u8],
) -> ProgramResult {
    msg!("Received invoice request");
   
    let accounts_iter = &mut accounts.iter();
	let account = next_account_info(accounts_iter)?;

	let data = account.borrow()?;

	let mut memo = String::from_utf8(instruction_data.to_vec()).map_err(|err| {
			msg!("Invalid UTF-8, from byte {}");
			ProgramError::InvalidInstructionData
	})?;
	
	let mut iter = memo.chars();
	let mut slice = iter.as_str();
	let mut txtFinal = String::from(slice);
	txtFinal.truncate(996);
	let finalText = r#+"\""+txtFinal+"\"#";
    msg!("Received  request is {}",finalText);

    let invObject:  InoiceDataObject = serde_json::from_str(finalText).unwrap();
	//unpacked.invoiceNo = txtFinal;
	//unpacked.pack(&mut data);
	println!("value inside the json objetc is :: {:?}", invObject);

	Ok(())
}