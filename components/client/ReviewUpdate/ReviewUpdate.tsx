import { useForm } from 'react-hook-form'
import { Wizard } from 'react-use-wizard'
import FirstStepUpdate from './Steps/FirstStepUpdate'
import FinalStepUpdate from './Steps/FinalStepUpdate'
import YourDeliverable from './Steps/YourDeliverable'
import ReceiveQuote from './Steps/ReceiveQuote'
import FundEscrow from './Steps/FundEscrow'
import { useState, useEffect } from 'react'
import { supabase } from '../../../supabaseClient'
//import SecondStepUpdate from './Steps/SecondStepUpdate'
//import ThirdStepUpdate from './Steps/ThirdStepUpdate'

import { useAppContext } from '../../../context/state'
import { initXRPL, loadContract } from '../../../context/utils'


const ReviewUpdate = () => {
  const sessionState = useAppContext();
  const [message, setMessage] = useState('')
  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      legalAssignment: 1,
    },
  })
  const pageId = 0; //this.props.id passed in param


  //TODO: intercept params on: http://localhost:3000/client-update/:share_code
  //TODO: read job matching query.params.share_code from database
  const job = {
    id: 0,
    contractor: "gig.testnet",
    title: "Job title",
    description: "Description",
    lic_type: "C00",
    job_type: "NFT", 
    expiry: 0,
    created: 0,
    created_by_userId: 0,
    share_code: "abb-gta",

    locked_amount: 0,
    requirement: "Requirement Statements",

    license_code: "FULL",  // Store short code abbreviations eg: 'by-nc-sa'
    license_desc: "Licence description",  // Human readable
    license_url: "Statement or contract on IPFS", // link to contract (maybe HTTPS or IPFS address) 
  };

  //TODO: Reject show pop-up: contact the artist.

  const onSubmit = async (data) => {
    console.log("Submit and open wallet: "+ job.title);
    //TODO:SMC: Append ESCROWs table
    const { xrpl, wallet } = await initXRPL();
    sessionState.near = xrpl;
    sessionState.wallet = wallet;

    setMessage(`Creating Job ...`);
    const contract: any = loadContract(sessionState.xrpl, sessionState.wallet, "escrow")
    const escrowId = await contract.create_new_escrow(
      {
        contractor: job.contractor,
        title: job.title,
        escrow_type: job.job_type,
        description: job.description,
        timestamp: job.expiry,

        requirement: job.requirement,

        license_code: job.license_code,
        license_desc: job.license_desc,
        license_url: job.license_url,
      }, sessionState.MAX_GAS, job.locked_amount 
    );
    setMessage(`Escrow created! Id: ${escrowId}`);
  }


  const [jobs, setJobs] = useState([0]);

  useEffect(() => {
       
    (async () => {
        const { data, error } = await supabase
        .from('Job')
        .select()
        //.match({id: 1})
        .match({share_code: 'gendz8j3'})
        //match on share_code

        if (data) {
            setJobs([...data]);
        }
        else {
          console.log('error loading:'+ error);
        }
    })();

  }, [setJobs])


  console.log(jobs);
  let j = jobs.find(e => true);

  //j = job;
  console.log(j);

  return (
    <section className="px-5 mt-3 text-darky">
      <h2 className="text-2xl font-bold mb-5">{j['title']} job <small>/{j['share_code']}</small></h2>
      <div className="mt-3 flex justify-end">[expiry date]</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Wizard startIndex={pageId}>
          <ReceiveQuote job={j} register={register} trigger={trigger} />
          <FundEscrow job={j} register={register} trigger={trigger} />
          <FirstStepUpdate job={j} register={register} trigger={trigger} />
          <FinalStepUpdate job={j} register={register} trigger={trigger} />
          <YourDeliverable job={j} register={register} trigger={trigger} />
        </Wizard>
      </form>

      <div>{message}</div>
    </section>
  )
}

export default ReviewUpdate
