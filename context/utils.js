//import { connect, Contract, keyStores, WalletConnection, utils  } from 'xrpl'



export async function initXRPL() {
    const config = {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.xrpl.org",
        walletUrl: "https://wallet.testnet.xrpl.org",
        helperUrl: "https://helper.testnet.xrpl.org",
        explorerUrl: "https://testnet.xrpl.org",
    };
    
    const xrpl = await connect(config);
    const wallet = new WalletConnection(near);

    if(!wallet.isSignedIn()) {
        await wallet.requestSignIn(abi.escrow.contractAddr, "gig");
    }

    return { xrpl: xrpl, wallet: wallet }
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
