import { HiOutlineSelector } from 'react-icons/hi'
import { useForm } from 'react-hook-form'
import DropAsset from './DropAsset'
import { createContext, useEffect, useState } from 'react'
import { useAppContext } from '../../../context/state'

import { initXRPL, loadContract } from '../../../context/utils'


//TODO: Set Modal View (no Header) with X in top right to close view. 

const UpdateJob = ( option ) => {

  const sessionState = useAppContext();
  const [message, setMessage] = useState('');
  const [checkin, setCheckin] = useState([]);

  useEffect(() => {
    /* initalise xrpl api here and store in AppContext */ 
    const init = async () => {
      const { xrpl, wallet } = await initXRPL();
      sessionState.xrpl = xrpl;
      sessionState.wallet = wallet;

      console.log(sessionState.wallet);

      if (sessionState.wallet && sessionState.wallet.isSignedIn()) {
        const contract: any = loadContract(sessionState.near, sessionState.wallet, "escrow")
        // setCheckin(await contract.get_escrow_checkins_list({ 
        //   client: sessionState.updateJob.client, 
        //   contractor: sessionState.wallet.getAccountId(), 
        //   id: sessionState.updateJob.id 
        //   })
        // );
      }
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const client = params.client;
    const id = Number(params.id);

    let validURL = true;
    (!client) && (validURL = false);
    (!client) && (validURL = false);

    if (!validURL) { 
      console.error("Invalid URL!!");
    }
    sessionState.updateJob.client = client;
    sessionState.updateJob.id = id;

    init();
  }, []);
  let user_name = sessionState.user_name;
  let job_title = sessionState.job_title;

  var job = sessionState.job;

  //console.log('UserState.user_name:'+job.user_name);
  console.log('UserState.job_title:'+job.title);
  console.log('Option: '+option.option);

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      updateType: option.option,
      updateMessage: '',
      updateAssetUrl: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    sessionState.job_title = data.updateMessage;

    const { xrpl, wallet } = await initXRPL();
    sessionState.xrpl = xrpl;
    sessionState.wallet = wallet;

    //TODO:DB:POST to JOB_CHECKIN table
    setMessage(`Logging Checkin ...`);
    const contract: any = loadContract(sessionState.xrpl, sessionState.wallet, "escrow");
    const checkinId = await contract.create_escrow_checkin(
      {
        client: sessionState.updateJob.client,
        id: sessionState.updateJob.id,
        update_type: data.updateType, 
        message: data.updateMessage, 
        media_url: "IPFS URL", // data.updateAssetURL,
        timestamp: Date.now(), 
      }
    );
    setMessage(`Checked in. See id ${checkinId}`);


    //sessionState.job_title = data.updateMessage;
//TODO:DB:POST to JOB_CHECKIN table

  }

  //console.log(watch("updateMessage"));
        

  return (
    <section className="px-3 mt-3 text-darky">
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-xl font-medium mb-5">{job.title}</h3>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Project Requirements</span>
        <p>{job.description}</p>
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Update Type</span>
        <div className="relative w-full">
          <select
            {...register('updateType', { required: true })}
            className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm bg-white w-full"
          >
            <option value="draft">Draft</option>
            <option value="final">Final Candidate</option>
            <option value="general">General Update</option>
          </select>
          <HiOutlineSelector className="absolute right-2 bottom-2 text-2xl" />
        </div>
      </label>

      <label className="flex flex-col mb-5">
        <span className="font-medium mb-2">Message</span>
        <textarea
          {...register('updateMessage', { required: true })}
          rows={3}
          className="shadow-sm shadow-gray-300 border-gray-100 px-4 py-2 rounded-sm"
        ></textarea>
      </label>


      <label className="flex flex-col mb-5">
      <div className="flex justify-between px-5 py-2 deliveryBox" >
        <DropAsset />
      </div>
      </label>

      <div className="mt-3 flex justify-end">
          <button type="submit" className="px-3 rounded-sm py-1 bg-primary text-white font-medium">
            Submit update
          </button>
      </div>

      {
        // checkin.length === 0 
        // ?
        // <div>Retrieving Checkins for Job ...</div>
        // :
        // checkin.map((checkin, index) => {
        //   return(
        //     <div key={index}>
        //       <div>
        //       {checkin.media_url}
        //       </div>
        //       <div>
        //       {checkin.update_type}
        //       </div>
        //       <div>
        //       {checkin.timestamp}
        //       </div>
        //     </div>
        //   )
        // })
      }
      <div>{message}</div>

      
    </form>
    </div>
    </section>
  )
}

export default UpdateJob
