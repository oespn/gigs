import { HiOutlineSelector } from 'react-icons/hi'
import NewMintButtonSteps from '../NewMintButtonSteps'
import { StepProps } from '../NewQuoteTypes'
import MintSteps from '../NewMintNumberSteps'
import { useAppContext } from '../../../../context/state'
import { useForm } from 'react-hook-form'
import { IoSettingsOutline } from 'react-icons/io5'

const FirstStepQuote = ({ register, trigger }: StepProps) => {

  const sessionState = useAppContext();

  const setTokenId = val => sessionState.newNFT.tokenId = val;
  const setImageURL = val => sessionState.newNFT.imageURL = val;

  return (
    <div>
      <MintSteps />

      <h3 className="text-xl font-medium mb-5">What are you making?</h3>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">NFT Name</span>
        <input
          {...register('tokenId', { required: true })}
          type="text"
          onChange={e => setTokenId(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Image URL</span>
        <input
          {...register('imageURL', { required: true })}
          type="text"
          onChange={e => setImageURL(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>
      
      <NewMintButtonSteps trigger={trigger} />
    </div>
  )
}

export default FirstStepQuote
