import { HiOutlineSelector } from 'react-icons/hi'
import NewQuoteButtonSteps from '../NewQuoteButtonSteps'
import { StepProps } from '../NewQuoteTypes'
import QuoteSteps from '../NewQuoteNumberSteps'
import { useAppContext } from '../../../../context/state'
import { useForm } from 'react-hook-form'
import { IoSettingsOutline } from 'react-icons/io5'

const FirstStepQuote = ({ register, trigger, watch, job }: StepProps) => {

  var job_share_code = job.share_code;
  console.log('Share code:' + job_share_code);

  const sessionState = useAppContext();

  const setTitle = val => sessionState.job.title = val;
  const setType = val => sessionState.job.job_type = val;
  const setDescription = val => sessionState.job.description = val;
  const setExpiry = val => {
    sessionState.job.expiry = Date.parse(val); // timestamp
  }
  return (
    <div>
      <QuoteSteps />

      <h3 className="text-xl font-medium mb-5">What are you making?</h3>

      <input type="hidden" {...register('share_code' )} value = {job_share_code}/> 

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Project Title</span>
        <input
          {...register('title', { required: true })}
          type="text"
          onChange={e => setTitle(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Type</span>
        <div className="relative w-full">
          <select
            {...register('job_type', { required: true })}
            onChange={e => setType(e.target.value)}
            className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full"
          >
            <option value="1">Custom Artwork</option>
            <option value="2">Artwork 1</option>
            <option value="3">Free Artwork</option>
            <option value="4">Artwork Custom</option>
          </select>
          <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl" />
        </div>
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Description</span>
        <textarea
          {...register('description', { required: true })}
          rows={3}
          onChange={e => setDescription(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        ></textarea>
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Expiry Date</span>
        <input
          {...register('expiry_date', { required: true })}
          type="date"
          onChange={e => setExpiry(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>

      <NewQuoteButtonSteps trigger={trigger} />
    </div>
  )
}

export default FirstStepQuote
