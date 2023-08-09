import Image from 'next/image'
import { HiOutlineSelector } from 'react-icons/hi'
import { GoCheck } from 'react-icons/go'
import { legalData } from '../legal-data'
import NewQuoteButtonSteps from '../NewQuoteButtonSteps'
import { StepProps } from '../NewQuoteTypes'
import QuoteSteps from '../NewQuoteNumberSteps'
import { useState } from 'react'
import { StyledSwitch, StyledThumb } from './SecondStepQuoteStyles'
import { useFieldArray } from "react-hook-form";

import { useAppContext } from '../../../../context/state'
import Link from 'next/link'

// Exports
const Switch = StyledSwitch
const SwitchThumb = StyledThumb

const party = {
  attrParty: '',
  royalty: '',
  attPartyAddress: ''
}

type FormValues = {
  Job_party: {
    attrParty: string;
    royalty: string;
    attPartyAddress: string;
  }[];
};


const SecondStepQuote = ({ register, trigger, watch, control }: StepProps) => {
  const sessionState = useAppContext();

  const watchLegal = watch('legalAssignment')
  const [isDerivateWork, setIsDerivateWork] = useState(false)

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Job_party", // unique name for your Field Array
  });

  const handleSwitch = (value) => {
    setIsDerivateWork(value)
  }

  const handelAddParty = () => {
    append({ ...party })
  }

  const handelRemove = (index) => {
    remove(index)
  };

  const setLicenceType = val => sessionState.job.lic_type = val.key;
//            onChange={e => setLicenceType(e.target)}

  console.log('LA+lt:'+watch('legalAssignment')+watch('lic_type'));

  return (
    <div>
      <QuoteSteps />

      <h3 className="text-xl font-medium mb-5">Who owns the rights?</h3>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Legal assignment</span>
        <input type='hidden' value={watchLegal} {...register('lic_type')}></input>
        <div className="relative w-full">
          <select
            {...register('legalAssignment', { required: true })}
            defaultValue="CC0"
            className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full"
          >
            {legalData.map((item) => (
              <option key={item.name} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl" />
        </div>
      </label>

      {legalData.map((item) => (
        <div
          className={(item.code == watchLegal ? 'block' : 'hidden') + ' mb-10'}
          key={item.code}
        >
          <p className="font-bold">{item.attribution}</p>

          {item.image && (
            <div className="mt-2">
              <Image
                src={item.image}
                width={106}
                height={40}
                alt="License image"
                className="object-cover rounded-md border border-black"
              />
            </div>
          )}

          <div className="mt-2">
            {item.conditions.map((condition) => (
              <p
                key={condition.key}
                className="flex items-center gap-1 mb-3 leading-5"
              >
                <span>
                  <GoCheck className="text-green-600 text-xl" />
                </span>
                <span className="font-semibold mr-1">{condition.key}:</span>
                {condition.value}
              </p>
            ))}
          </div>

          <p className="mt-2 text-sm text-gray-500">{item.bottomCopy}</p>
        </div>
      ))}

      <div className="mb-5 flex justify-between">
        <p>Composite or derivative work? </p>
        <div>
          <Switch
            defaultChecked
            id="s1"
            onCheckedChange={handleSwitch}
            checked={isDerivateWork}
          >
            <SwitchThumb />
          </Switch>
        </div>
      </div>

      {isDerivateWork && (
        <div className="overflow-hidden mb-7">
          {fields.map((field: any, index: number) => (
            <div key={field.id} className="mb-2">
              <div className="flex gap-2">
                <input
                  defaultValue={`${field.attrParty}`}
                  {...register(`Job_party.${index}.attrParty` as const, { required: true })}
                  className="w-7/12 shadow-sm shadow-gray-300 border-gray-100 px-4 py-1 rounded-sm bg-white"
                  placeholder={`Attribute party #${index + 1}`
                  }
                />
                <label className="flex items-center w-5/12 gap-2" htmlFor="royalty">
                  <span className="whitespace-pre">% royalty</span>
                  <input
                    defaultValue={`${field.royalty}`}
                    {...register(`Job_party.${index}.royalty` as const, { required: true })}
                    className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-1 rounded-sm bg-white"
                    type="text"
                    placeholder="none"
                  />
                </label>
              </div>
              <div className="w-full mt-2">
                <input
                  defaultValue={`${field.attPartyAddress}`}
                  {...register(`Job_party.${index}.attPartyAddress` as const, { required: true })}
                  type="text"
                  className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-1 rounded-sm bg-white w-full"
                  placeholder={`Attribute party #${index + 1} wallet address`}
                />
              </div>
              {
                index > 0 && (
                  <div className="w-full text-right mt-2">
                    <button className="px-3 rounded-sm py-1 bg-red-600 text-white font-medium" type="button" onClick={() => {handelRemove(index)}}>
                      X
                    </button>
                  </div>
                )
              }

            </div>
          ))}

          <div className="gap-2 m-2"> 
            <button className="text-sm underline underline-offset-1" onClick={handelAddParty}>Add Party</button>
          </div>
        </div>
        
      )}

      <NewQuoteButtonSteps trigger={trigger} />
    </div>
  )
}

export default SecondStepQuote
