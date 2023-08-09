import { HiOutlineSelector } from 'react-icons/hi'
import { useWizard } from 'react-use-wizard'
import { StepProps } from '../NewQuoteTypes'
import QuoteSteps from '../NewQuoteNumberSteps'

const FourStepQuote = ({ register }: StepProps) => {
  const { handleStep, previousStep, nextStep } = useWizard()
  return (
    <div>
      <QuoteSteps />
      <h3 className="text-xl font-medium mb-5">Review Requirements</h3>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Project Title</span>
        <input
          type="text"
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Type</span>
        <div className="relative w-full">
          <select className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full">
            <option value="">Custom Artwork</option>
            <option value="">Another option</option>
            <option value="">Yeah, another option</option>
          </select>
          <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl" />
        </div>
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Description</span>
        <textarea
          rows={3}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        ></textarea>
      </label>

      <div className="flex justify-end gap-4">
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

export default FourStepQuote
