import { HiOutlineSelector } from 'react-icons/hi'
import Image from 'next/image'
import { StepProps } from '../NewUpdateTypes'
import UpdateSteps from '../NewUpdateNumberSteps'

const YourDeliverable = ({ register, trigger }: StepProps) => {
  return (
    <div>
      <UpdateSteps />

      <h3 className="text-xl font-medium mb-5">Your NFT!</h3>

      <label className="flex flex-col mb-5">
        <span className="mb-2">Delivered [date/time]</span>
        <span className="mb-2">
          Certified design by <b>[artist.name]</b>
        </span>
      </label>

      <label className="flex flex-col mb-5">
        <div className="flex justify-between px-5 py-2 deliveryBox">
          <img
            src="/images/llama_192x.png"
            alt="Artwork update"
            className="imgFill"
          />
        </div>
      </label>

      <div className="tipBlue p-3 rounded-sm text-darky">
        <h3 className="font-bold">Your NFT is now available on XRPL 🚀 </h3>
        <p>
          Check it out on these marketplaces
          <a href="" className="text-primary hover:text-primary/80 font-medium">
            here
          </a>
        </p>
      </div>

      <div className="p-3 rounded-sm text-darky">
        <h3 className="font-bold">Request minting on Ethereum </h3>
        <p>Estimated gas fee $220 </p>
      </div>

      <div className="mt-3 flex justify-end">
        <button className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
          Request
        </button>
      </div>
    </div>
  )
}

export default YourDeliverable
