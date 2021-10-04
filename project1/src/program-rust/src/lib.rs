use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint,
	entrypoint::ProgramResult,
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};
use borsh::{BorshDeserialize, BorshSerialize};
use std::mem;

pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
	fn pack(&self, dst: &mut [u8]) {
		let encoded = self.try_to_vec().unwrap();
        msg!("encoded {:?} ",encoded);
		dst[..encoded.len()].copy_from_slice(&encoded);
	}
	fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
		Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
	}
}

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub struct Message {
	pub txt: String,
}

//impl Serdes for Message {}

entrypoint!(entry);

fn entry(
	program_id: &Pubkey,
	accounts: &[AccountInfo],
	instruction_data: &[u8],
) -> ProgramResult {
    msg!("Received invoice request");
    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut unpacked = Message::try_from_slice(&account.data.borrow())?;
    
    let mut memo = String::from_utf8(instruction_data.to_vec()).map_err(|err| {
        msg!("Invalid UTF-8, from byte {}");
        ProgramError::InvalidInstructionData
     })?;

   let mut iter = memo.chars();
   let mut slice = iter.as_str();
   let mut txtFinal = String::from(slice);
   msg!("Received invoice request {}",txtFinal);
   unpacked.txt = txtFinal;

   unpacked.serialize(&mut &mut account.data.borrow_mut()[..])?;

    Ok(())

}