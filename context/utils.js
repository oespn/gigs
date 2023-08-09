//import { connect, Contract, keyStores, WalletConnection, utils  } from 'xrpl'
//import * from xrpl



export async function initXRPL() {
    
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()

    const wallet = null; //new WalletConnection(near);

    // if(!wallet.isSignedIn()) {
    //     await wallet.requestSignIn(abi.escrow.contractAddr, "gig");
    // }

    return { xrpl: client, wallet: wallet }
}

export async function signout(wallet) {
    wallet.signOut();
}


export function loadContract(xrpl, wallet, contract) {
    return new Contract(
      wallet.account(),
      abi[contract].contractAddr,
      {
        viewMethods: abi[contract].viewMethods,
        changeMethods: abi[contract].changeMethods,
        sender: wallet.getAccountId(), 
      }
    )
}

export function yoctoToXRP(amount = "1000000000000000000000000") {
  return Number(utils.format.formatXPRAmount(amount)).toFixed(2);
}
