import { stringify } from 'querystring';
import { createContext, useContext } from 'react';


const AppContext = createContext();

export function AppWrapper({ children }) {

  let sharedState = {
    // user_id: 0,
    // user_name: "",
    // job_title: "unset",
    MAX_GAS: "300000000000000",
    MINT_PRICE: "10000000000000000000000",
    xrpl: null,
    wallet: null,
    user: {
      // id: 0,
      name: "user_name",
      wallet_id:"near.testnet",
      // created: 0,
      mode_client: true,
    },
    updateJob: {
      client: "",
      id: 0,
    },
    newNFT: {
      tokenId: "",
      imageURL: "",
      copyright: "",
      rightAssign: "CC0",
      attributeParties: []
    },
    escrows: [],
    job: {
      id: 0,
      title: "Job title",
      description: "Description",
      lic_type: "C00",
      job_type: "0",
      expiry: 0,
      created: 0,
      contractor: "",
      // created_by_userId: 0,
      // share_code: "abb-gta"
    },
    abi: {
      nft: {
        contractAddr: "nft.gig.testnet",
        viewMethods: ["nft_metadata", "nft_token"],
        changeMethods: ["nft_mint", "allowance", "nft_transfer"],
      },
      escrow: {
        contractAddr: "escrow.gig.testnet",
        viewMethods: ["get_escrow"],
        changeMethods: ["release_escrow", "contractor_approval", "client_approval", "create_new_escrow", "take_my_money", "set_deliverable", "set_nft_deliverable"],
      }
    }
    
  };

  let base36id = Math.round((Math.floor (new Date()) / Math.random(100)) * Math.random(100));
  sharedState.job.share_code = base36id.toString(36);

  console.log('jobId: '+base36id+','+base36id.toString(36));

/* DB Requirements 
//TODO Determine / minimise what IDs & Strings need to be kept in Context.

//JOB Table

id: Guid
title: String
description: String;
lic_type: String
job_type: String
expiry: DateTime
created: DateTime
created_by_userId: Guid
share_code: String // Shortcode
client_user_id: Guid = null // null until accepted
contractor_user_id: Guid // required
completed: Guid = null // only set when completed
update_due: DateTime // default to 3 days in advance, set again after each checkin (until completed!=null)


//USER Table
id: Guid
name: String
wallet_id: String
created: DateTime
mode_client: Boolean //Default true.
client_jobs[] // relation jobs this user matching client_user_id
contractor_jobs[] // realation returning jobs where user matches contractor_user_id

//JOB_CHECKIN table
id: Guid
created: DateTime
job_id: Guid // mapping to Job Table
user_id: Guid // who wrote the update -> mapping to User Table
to_user_id: Guid // sending to user -> mapping to User Table
type: String   //draft, final, general
message: String
media_url: String

//JOB_COMPLETE
id: Guid // Extension relationship: 1-1 the Job its completes
completed: DateTime
media_url: String
metadata: String

*/

  

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}