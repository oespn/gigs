import { HiOutlineSelector } from 'react-icons/hi'
import { useWizard } from 'react-use-wizard'
import { StepProps } from '../NewQuoteTypes'
import QuoteSteps from '../NewMintNumberSteps'
import { useAppContext } from '../../../../context/state'

const ShareStep = ({ register, trigger }: StepProps) => {

  const sessionState = useAppContext();
  
  return (
    <div>
      <QuoteSteps />

      <h3 className="text-xl font-medium mb-5">Review Requirements</h3>

      <label className="flex flex-col mb-5">
        <div className="tipYellow p-3 rounded-sm text-darky">
          <h3 className="font-bold">
            NFT can be used as deliverable 🔐
          </h3>
          <p>
            <br />
            Your client will pay upfront into escrow on NEAR{' '}
          </p>
        </div>
      </label>

      <label className="flex flex-col mb-5">
        <div className="flex justify-between px-5 py-2 deliveryBox">

        <div>  
        <div className="mb-5 px-2">

            <div className="mb-1">
            <p className="font-medium">NFT</p>
            <p><span className="text-bold">{sessionState.newNFT.tokenId}</span></p>
            </div>

            <div className="mb-1">
            <p className="font-medium">Description</p>
            <p>{sessionState.newNFT.imageURL}</p>
            </div>


            <div className="mb-1">
            <p className="font-medium">Legal assignment</p>
            <p>The NFT will assign rights according to <b>{sessionState.newNFT.rightAssign}</b></p>
            <p>with the statement <i>{sessionState.newNFT.copyright}</i></p>

            </div>


            <div className="flex justify-between mb-1">
            <p className="font-medium">Gas fees</p>
            <p>0.01</p>
            </div>
            <div className="flex justify-end">
            <div className="w-6/12 h-px bg-darky my-1" />
            </div>
            <p className="text-right">0.01</p>
        </div>

      </div>

        </div>
      </label>


      <div className="mt-3 flex justify-end ">
        <button
          type="button"
          className="px-3 border border-gray-400 rounded-sm py-1 font-medium"
        >
          Back
        </button>

        <button type="submit" className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
          Mint!
        </button>
      </div>
    </div>
  )
}

export default ShareStep
