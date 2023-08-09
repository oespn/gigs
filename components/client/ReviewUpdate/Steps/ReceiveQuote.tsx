import { HiOutlineSelector } from 'react-icons/hi'
import { StepProps } from '../NewUpdateTypes'
import UpdateSteps from '../NewUpdateNumberSteps'
import { useState } from 'react'
import { StyledSwitch, StyledThumb } from './UpdateStyles'
import ProjectRequirements from '../../../ProjectRequirements'



// Exports
const Switch = StyledSwitch
const SwitchThumb = StyledThumb

const ReceiveQuote = ({ register, trigger, job }: StepProps) => {
  const [isProceed, setIsProceed] = useState(false)


  const handleSwitch = (value) => {
    setIsProceed(value)
  }

  return (
    <div>
      <UpdateSteps />

      <h3 className="text-xl font-medium mb-5">Review the requirements</h3>

      <label className="flex flex-col mb-5">
        <div className="tipYellow p-3 rounded-sm text-darky">
          <h3 className="font-bold">Funds will be secured on XRPL escrow 🔐</h3>
          <p>
            You can transfer to the Eth network later.
            <br />
            Your contractor will only be paid when work is accepted.{' '}
          </p>
        </div>
      </label>

      <label className="flex flex-col mb-5">
        <div className="flex justify-between px-0 py-2 deliveryBox">
        <ProjectRequirements job={job}/>

        </div>
      </label>

      <label className="flex flex-col mb-5">
        <div className="tipBlue p-3 rounded-sm text-darky">
          <h3 className="font-bold">
            ✨ The delivered NFT will be minted on XRPL
          </h3>
          <p>
            You can transfer to the Eth network later.
            <br />
            We&apos;ll charge you the extra gas fees directly.{' '}
          </p>
        </div>
      </label>

      <div className="mb-5 flex justify-between">
        <p>Proceed to fund the work? </p>
        <div>
          <Switch
            defaultChecked
            id="sProceed"
            onCheckedChange={handleSwitch}
            checked={isProceed}
          >
            <SwitchThumb />
          </Switch>
        </div>
      </div>

      <div className="tipNormal rounded-sm text-darky">
        <p>
          Discuss any changes with your contractor first.
          <br />
          By continuing you agree with the requirements.
        </p>
      </div>
 
      <div className="mt-3 flex justify-end ">
        <button
          type="button"
          className="px-3 border border-gray-400 rounded-sm py-1 font-medium"
        >
          Reject
        </button>

        <button type="submit" className={`px-3 rounded-sm py-1 bg-primary text-white font-medium ml-1`} disabled={!isProceed}>
          Continue
        </button>
      </div>    
    </div>

  )
}

export default ReceiveQuote
