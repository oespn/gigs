import {
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'

export type StepProps = {
  register: UseFormRegister<any>
  trigger: UseFormTrigger<any>
  watch?: UseFormWatch<any>
  job
}
