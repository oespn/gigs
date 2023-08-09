import { HiOutlineSelector } from 'react-icons/hi'
import { StepProps } from '../NewUpdateTypes'
import UpdateSteps from '../NewUpdateNumberSteps'
import { useAppContext } from '../../../../context/state'

const FundEscrow = ({ register, trigger }: StepProps) => {
  const sessionState = useAppContext();

  const setLockedAmount = val => sessionState.job.locked_amount = val;
  
  return (
    <div>
      <UpdateSteps />

      <h3 className="text-xl font-medium mb-5">Fund the Escrow</h3>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Project Title</span>
        <input
          {...register('title', { required: true })}
          type="text"
          onChange={e => setLockedAmount(e.target.value)}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        />
      </label>

      <h3 className="text-xl font-medium mb-5">What happens next?</h3>
      <label className="flex flex-col mb-5">
        <div className="rounded-sm text-darky">
          <p>
            The contractor will update you every 3 days until the job is done or
            up until [expiry date]{' '}
          </p>
        </div>
      </label>

      <h3 className="text-xl font-medium mb-5">What if they don’t?</h3>
      <label className="flex flex-col mb-5">
        <div className="rounded-sm text-darky">
          <p>The funds will be returned to you.</p>
        </div>
      </label>

      <div className="mt-3 flex justify-end ">
        <button
          type="button"
          className="px-3 border border-gray-400 rounded-sm py-1 font-medium"
        >
          Back
        </button>

        <button className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
          Done
        </button>
      </div>
    </div>
  )
}

export default FundEscrow
