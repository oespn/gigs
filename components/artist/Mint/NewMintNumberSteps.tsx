import { useWizard } from 'react-use-wizard'

const NewMintNumberSteps = () => {
  const { activeStep } = useWizard()

  return (
    <div className="flex justify-between mb-7 relative">
      <div className="absolute w-full h-px bg-gray-400 top-5" />
      {[...Array(4)].map((_v, index) => {
        return (
          <button
            key={index}
            className={
              (activeStep == index ? 'bg-primary' : 'bg-gray-300') +
              ' rounded-full bg-primary text-white text-sm w-9 h-9 font-medium relative'
            }
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )
}

export default NewMintNumberSteps
