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

#[derive(Debug, Deserialize, Serialize, BorshDeserialize, BorshSerialize,Clone)]
pub struct InvoiceData {
    pub instruction: String,
    pub invoiceno: String,
    pub suppliername: String,
    pub customername: String,
    pub invoicedate:String,
    pub invoiceamt: u32,
    pub isfinanced: String
}


#[derive(Debug, Deserialize, Serialize, BorshDeserialize, BorshSerialize,Clone)]
pub struct InvoiceDataList {
   pub data: Vec<InvoiceData>
   
}
// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, 
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Invoice Data storage called !!");

    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Account is not correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // using serde to convert json string to object
    let memo = String::from_utf8(instruction_data.to_vec()).map_err(|_err| {
                    msg!("Invalid UTF-8, from byte {}");
                                ProgramError::InvalidInstructionData
    })?;

    let iter = memo.chars();
    let slice = iter.as_str();
    let txt_final = String::from(slice);

    msg!("Received  request is {}",txt_final);

    let inv_object: InvoiceData = serde_json::from_str(&txt_final).unwrap();
    
    match inv_object.instruction.as_ref() {
    
        "CREATE" => {

            msg!("Creation started");
           
             // using slice_unchecked, when buffer size is high
             let mut  existing_data = try_from_slice_unchecked(&account.data.borrow()[..])?;
        
             create_data(inv_object, &mut existing_data);  
             msg!("Updated data {:?}", &existing_data);
        
             msg!("End create."); 
             Ok(BorshSerialize::serialize(&existing_data , &mut &mut account.data.borrow_mut()[..])?)
        
           },
          
           
           "UPDATE" => {

            msg!("Update is financed started");      
            let mut existing_data = try_from_slice_unchecked(&account.data.borrow()[..])?;
        
             update_data(inv_object, &mut existing_data);  
             msg!("Updated data {:?}", &existing_data);
        
             msg!("End update."); 
            Ok(BorshSerialize::serialize(&existing_data , &mut &mut account.data.borrow_mut()[..])?)
        

           } 
           _ => Ok(())
     }
    
}

pub fn create_data(
    inv_object: InvoiceData,
    existing_data: &mut InvoiceDataList,
) {

    msg!("Received  account data {:?}", &existing_data);
    existing_data.data.push(inv_object);
    
    
}

pub fn update_data(
    inv_object: InvoiceData,
    existing_data: &mut InvoiceDataList,
) {

    if inv_object.invoiceno =="" || inv_object.suppliername=="" {
     //return existing_data;
    } else {

     let position = existing_data.data
    .iter()
    .position(|inv| inv.invoiceno == inv_object.invoiceno && inv.suppliername == inv_object.suppliername)
    .unwrap();

    msg!("Found index {}", position);
    existing_data[position].isfinanced = inv_object.isfinanced;
    }

    //existing_data[position].isfinanced = inv_object.isfinanced;

    //return existing_data;
    
}
