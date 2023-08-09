import { HiOutlineSelector } from 'react-icons/hi'
import Image from 'next/image'
import { StepProps } from '../NewUpdateTypes'
import UpdateSteps from '../NewUpdateNumberSteps'
import { useState } from 'react'
import { StyledSwitch, StyledThumb } from './UpdateStyles'

// Exports
const Switch = StyledSwitch
const SwitchThumb = StyledThumb

const FinalStepUpdate = ({ register, trigger }: StepProps) => {
  const [isFinal, setIsFinal] = useState(false)

  const handleSwitch = (value) => {
    setIsFinal(value)
  }

  return (
    <div>
      <UpdateSteps />

      <h3 className="text-xl font-medium mb-5">Here&apos;s the final!</h3>

      <label className="flex flex-col mb-5">
        <span className="mb-2">Final candidate [#1] [date/time]</span>
        <span className="mb-2">[Message from artist text...]</span>
      </label>

      <label className="flex flex-col mb-5">
        <div className="flex justify-between px-5 py-2 deliveryBox">
          <img
            src="/images/logo.png"
            alt="Artwork update"
            className="imgFill"
          />
        </div>
      </label>
      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Reply message</span>
        <textarea
          {...register('replyMessage', { required: true })}
          rows={3}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        ></textarea>
      </label>

      <div className="mb-5 flex justify-between">
        <p>Accept and mint? </p>
        <div>
          <Switch
            defaultChecked
            id="sFinal"
            onCheckedChange={handleSwitch}
            checked={isFinal}
          >
            <SwitchThumb />
          </Switch>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
          Send
        </button>
      </div>
    </div>
  )
}

export default FinalStepUpdate
