import { HiOutlineSelector } from 'react-icons/hi'
import { useWizard } from 'react-use-wizard'
import { StepProps } from '../NewQuoteTypes'
import QuoteSteps from '../NewQuoteNumberSteps'
import ShareLink from '../ShareLink'
import ProjectRequirements from '../../../ProjectRequirements'

const ShareStep = ({ register, trigger, job }: StepProps) => {



  return (
    <div>
      <QuoteSteps />

      <h3 className="text-xl font-medium mb-5">Review Requirements</h3>

      <label className="flex flex-col mb-5">
        <div className="tipYellow p-3 rounded-sm text-darky">
          <h3 className="font-bold">
            Funds will be secured on quote acceptance 🔐
          </h3>
          <p>
            You can transfer to the Eth network later.
            <br />
            Your client will pay upfront into escrow onchain{' '}
          </p>
        </div>
      </label>

      <label className="flex flex-col mb-5">
        <div className="flex justify-between px-5 py-2 deliveryBox">

        <ProjectRequirements job={job}/>

        </div>
      </label>

      <div className="mb-5">
        <p>Share the quote with your client </p>
        <div>
          <ShareLink job={job} />
        </div>
      </div>

      <div className="mt-3 flex justify-end ">
        <button
          type="button"
          className="px-3 border border-gray-400 rounded-sm py-1 font-medium"
        >
          Back
        </button>

        <button type="submit" className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
          Done!
        </button>
      </div>
    </div>
  )
}

export default ShareStep
