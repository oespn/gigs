import { useForm, useFormContext } from 'react-hook-form'
import { Wizard } from 'react-use-wizard'
import FirstStepQuote from './Steps/FirstStepQuote'
import FourStepQuote from './Steps/FourStep'
import SecondStepQuote from './Steps/SecondStepQuote'
import ThirdStepQuote from './Steps/ThirdStepQuote'
import ShareStep from './Steps/ShareStep'
import { useAppContext } from '../../../context/state'
import { useState, useEffect } from 'react'
import { supabase } from '../../../supabaseClient'

const NewQuote = () => {
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      legalAssignment: 1,
      Job_party: [{ attrParty: '', royalty: '', attPartyAddress: '' }]
    },
  })

  const sessionState = useAppContext();
  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
       
    (async () => {
        const { data, error } = await supabase
        .from('Job')
        .select()

        if (data) {
            setJobs([...data]);
        }
    })();

  }, [setJobs])


  const onSubmit = (values, sessState) => {
    (async () => {
      const { data, error } = await supabase
      .from('Job')
      .insert(
        {
          title: values.title,
          share_code: values.share_code,
          lic_type: values.lic_type,
          job_type: values.job_type,
          description: values.description
        }
        //  values
      )
  
      if (data) {
        setJobs([...data]);
      }
      else
      {
        console.log('error updating:'+ error);
      }

      console.log(values)
    })(); 
// sharedState.job.share_code
    //sessState.sharedState.job = values;
    //console.log(">> Code:"+ sessState.sharedState.job.share_code); 
    console.log(">> Data.title title should have a value:"+ values.title); // IT WORKED!
    console.log('Data now:'+ values);
    console.log(sessionState.job);
    
    //console.log(">> Data.title title should have a value:"+ data.title); // IT WORKED!


  }

  let j = sessionState.job;


  return (
    <section className="px-3 mt-3 text-darky">
      <h2 className="text-2xl font-bold mb-5">New Quote</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Wizard>
          <FirstStepQuote job={j} register={register} trigger={trigger} watch={watch} />
          <SecondStepQuote
            job={j}
            register={register}
            trigger={trigger}
            watch={watch}
            control={control}
          />
          <ThirdStepQuote job={j} register={register} trigger={trigger} />
          <ShareStep job={j} register={register} trigger={trigger} />
        </Wizard>
      </form>
    </section>
  )
}

export default NewQuote
