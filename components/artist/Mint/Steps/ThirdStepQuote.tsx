import { HiOutlineSelector } from 'react-icons/hi'
import { useWizard } from 'react-use-wizard'
import { StepProps } from '../NewQuoteTypes'
import MintSteps from '../NewMintNumberSteps'
import { AiOutlineLock } from 'react-icons/ai'
import { useAppContext } from '../../../../context/state'


const ThirdStepQuote = ({ register }: StepProps) => {
  const { handleStep, previousStep, nextStep } = useWizard()
  const sessionState = useAppContext();

  const setContractor = val => sessionState.job.contractor = val;

  return (
    <div>
      <MintSteps />
      <h3 className="text-xl font-medium mb-5">Price & costs</h3>
      
      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Contractor (Optional)</span>
        <input
          {...register('contractor', { required: true })}
          type="text"
          onChange={e => setContractor(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>

      <div className="text-right text-sm gradientBlue absolute left-0 w-full py-2 px-4 ">
        <p className="flex justify-end items-center gap-2">
          <span className="text-black">Funds secured onchain</span>
          <span className="text-lg">
            <AiOutlineLock className="text-primary" />
          </span>
        </p>
        <p>When the work is approved. You&apos;ll be instantly paid.</p>
      </div>
      <div className="h-20" />

      <div className="mb-5 px-8">
        <div className="flex justify-between mb-1">
          <p className="font-medium">Gas fees</p>
          <p>0.01</p>
        </div>
        <div className="flex justify-end">
          <div className="w-6/12 h-px bg-darky my-1" />
        </div>
        <p className="text-right">0.01</p>
      </div>

      <div className="bg-white shadow-sm py-2 px-3 mb-5">
        <p className="text-black">✨The delivered NFT will be minted on NEAR</p>
        <p className="tracking-tight">
          Your customer can transfer to another network. We&apos;ll charge the
          extra gas fees directly.
        </p>
      </div>

      <div className="flex justify-end gap-4 pb-16">
        <button
          type="button"
          className="px-3 border border-gray-400 rounded-sm py-1 font-medium"
          onClick={() => previousStep()}
        >
          Back
        </button>
        <button
          onClick={() => nextStep()}
          className="px-3 rounded-sm py-1 bg-primary text-white font-medium"
        >
          Next Step
        </button>
      </div>
    </div>
  )
}

export default ThirdStepQuote
