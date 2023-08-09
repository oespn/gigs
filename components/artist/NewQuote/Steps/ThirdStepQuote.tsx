import { HiOutlineSelector } from 'react-icons/hi'
import { useWizard } from 'react-use-wizard'
import { StepProps } from '../NewQuoteTypes'
import QuoteSteps from '../NewQuoteNumberSteps'
import { AiOutlineLock } from 'react-icons/ai'
import { useAppContext } from '../../../../context/state'


const ThirdStepQuote = ({ register }: StepProps) => {
  const { handleStep, previousStep, nextStep } = useWizard()
  const sessionState = useAppContext();

  const setContractor = val => sessionState.job.contractor = val;

  return (
    <div>
      <QuoteSteps />
      <h3 className="text-xl font-medium mb-5">Price & costs</h3>

      <div className="relative flex justify-end">
        <select className="w-7/12 shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white">
          <option value="RPL">XRP</option>
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
        </select>
        <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl" />
      </div>

      {/*<label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Contractor</span>
        <input
          {...register('contractor', { required: false })}
          type="text"
          onChange={e => setContractor(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>*/}
      

      <label className="flex items-center justify-between mb-5 gap-2 mt-3">
        <span className="font-medium mb-2 whitespace-pre">Customer price</span>
        <div className="relative w-5/12">
          <input
            className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full text-right"
            placeholder="2,500"
          />
        </div>
      </label>

      <div className="text-right text-sm gradientBlue absolute left-0 w-full py-2 px-4 ">
        <p className="flex justify-end items-center gap-2">
          <span className="text-black">Funds secured on NEAR</span>
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
          <p>2.50</p>
        </div>
        <div className="flex justify-between mb-1">
          <p className="font-medium">Our fee</p>
          <p>50.00</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Royalties</p>
          <p>50.00</p>
        </div>
        <div className="flex justify-end">
          <div className="w-6/12 h-px bg-darky my-1" />
        </div>
        <p className="text-right">-177.50</p>
      </div>

      <div className="flex justify-between mt-2 mb-5">
        <p className="text-black">You&apos;ll receive in your wallet:</p>
        <p className="font-bold">2,322.50</p>
      </div>

      <div className="bg-white shadow-sm py-2 px-3 mb-5">
        <p className="text-black">✨The delivered NFT will be minted on XRPL</p>
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
