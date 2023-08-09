import { useForm } from 'react-hook-form'
import { Wizard } from 'react-use-wizard'
import FirstStepQuote from './Steps/FirstStepQuote'
import SecondStepQuote from './Steps/SecondStepQuote'
import ThirdStepQuote from './Steps/ThirdStepQuote'
import ShareStep from './Steps/ShareStep'
import { useAppContext } from '../../../context/state'
import { initXRPL, loadContract } from '../../../context/utils'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ShareLink from './ShareLink'

const MintNFT = () => {

  const explorer = 'https://testnet.xrpl.org/';
  const router = useRouter()

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      legalAssignment: 1,
    },
  })

  const [minted, setMint] = useState(null)
  useEffect(()=> {
    const urlParams = new URLSearchParams(window.location.search);
    setMint(urlParams.get('transactionHashes'));
  }, []);

  const sessionState = useAppContext();

  const onSubmit = async (data) => {
    const { xrpl, wallet } = await initXRPL();
    sessionState.xrpl = xrpl;
    sessionState.wallet = wallet;

    const contract: any = loadContract(sessionState.xrpl, sessionState.wallet, "nft")
    const response = await contract.nft_mint( 
      {
        receiver_id: sessionState.wallet.getAccountId(),
        token_id: sessionState.newNFT.tokenId,
        metadata: { 
          title: "GIG Deliverable", 
          description: "Wrapped in an NFT!", 
          media: "IPFS URL / URL", 
          copies: 1,
          copyright: sessionState.newNFT.copyright,
          right_assign: sessionState.newNFT.rightAssign,
        },
        // perpetual_royalties: attributeParties,
      },
      sessionState.MAX_GAS, sessionState.MINT_PRICE,
    );
  }


  return (
    <>
    {minted 
    ?
    <div>
      <div className="mb-5 px-2">
        <div className="mt-5 text-center font-medium">Wrapped deliverable minted!</div>
        <ShareLink url={`${explorer}/transactions/${minted}`}/>   
      </div>
    </div>
    :
    <section className="px-3 mt-3 text-darky">
      <h2 className="text-2xl font-bold mb-5">Mint</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Wizard>
          <FirstStepQuote register={register} trigger={trigger} />
          <SecondStepQuote
            register={register}
            trigger={trigger}
            watch={watch}
          />
          <ThirdStepQuote register={register} trigger={trigger} />
          <ShareStep register={register} trigger={trigger} />
        </Wizard>
      </form>
    </section>
    }
    </>
  )
}

export default MintNFT
