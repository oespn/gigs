import { yoctoToXRP } from '../../context/utils'
import { useAppContext } from '../../context/state'




// Somehow can't pass value in balance so for now load via near here.
const WalletBalance = ({ balance }) =>
{
    const sessionState = useAppContext();
  
    var walletUrl = 'http://wallet.xrpl.org/';
    var walletName = sessionState.wallet && sessionState.wallet.getAccountId();
    if (walletName && walletName.indexOf(".testnet") !== -1)
    {
        walletUrl = 'http://wallet.testnet.xrpl.org/';
    }

    return (
        <div>
            <div className="flex justify-between mt-2 mr-2">
                <p className="text-black">XRP</p>
                <p className="font-bold">{yoctoToXRP(balance.toString())}</p>
            </div>
            <div className="text-slate-400 tracking-tight text-xs text-left">
                <a href={walletUrl} target='_blank' rel="noreferrer">
                View on XRP Wallet
                </a>
            </div>
        </div>
    )
} 

export default WalletBalance