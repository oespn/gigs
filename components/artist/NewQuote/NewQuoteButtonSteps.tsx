import { FieldValues, UseFormTrigger, useForm } from 'react-hook-form'
import { useWizard } from 'react-use-wizard'

const NewQuoteButtonSteps = ({
  trigger,
}: {
  trigger: UseFormTrigger<FieldValues>
}) => {
  const { activeStep, previousStep, nextStep } = useWizard()
  

  return (
    <div className="flex justify-end gap-4 pb-10">
      <button
        type="button"
        className="px-3 border border-gray-400 rounded-sm py-1 font-medium"
        onClick={() => {
          if (activeStep == 0) {
            window.history.back()
          } else {
            previousStep()
          }
        }}
      >
        Cancel
      </button>

      <button
        type="submit"
        onClick={async () => {
          const isValid = await trigger()

          if (isValid) {
            nextStep();
            return isValid;
          }
        }}
        className="px-3 rounded-sm py-1 bg-primary text-white font-medium"
      >
        Next Step
      </button>

    </div>
  )
}

export default NewQuoteButtonSteps
