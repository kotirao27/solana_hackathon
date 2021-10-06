use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use serde::{Deserialize, Serialize};
use borsh::{BorshDeserialize,BorshSerialize};


/// Define the type of state stored for invoice and supplier


#[derive(Debug, Deserialize, Serialize, BorshDeserialize, BorshSerialize)] struct InvoiceData {
            invoiceno: String,
            suppliername: String,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)] struct InvoiceDataList {
            data: Vec<InvoiceData>
}

pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
    fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
      Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
    }
}

impl Serdes for InvoiceDataList {}


// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, 
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Invoice Data storage called !!");

    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iter)?;
    

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Account is not correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }
    let memo = String::from_utf8(instruction_data.to_vec()).map_err(|_err| {
                    msg!("Invalid UTF-8, from byte {}");
                                ProgramError::InvalidInstructionData
    })?;

    let iter = memo.chars();
    let slice = iter.as_str();
    let txt_final = String::from(slice);

    msg!("Received  request is {}",txt_final);

    let inv_object: InvoiceData = serde_json::from_str(&txt_final).unwrap();
    let mut existing_data = InvoiceDataList::unpack(&account.data.borrow()).expect("Failed to read data");
    
    msg!("Received  account data {:?}", &existing_data);
    existing_data.data.push(inv_object);
    
    msg!("Updated account data {:?}", &existing_data);

    let updated_data = existing_data.try_to_vec().expect("Failed to encode data.");

    let data = &mut &mut account.data.borrow_mut();
    msg!("Attempting save data.");
    data[..updated_data.len()].copy_from_slice(&updated_data);    
    let saved_data = InvoiceDataList::try_from_slice(data)?;
    msg!("End program.");

    Ok(())
}
