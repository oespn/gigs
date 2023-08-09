import { useAppContext } from '.././context/state'

  
const ProjectRequirements = ({job}) => {

  const sessionState = useAppContext();


  console.log('ProjectRequirements job:'+job['title']);


    return (
      <div>  
        <div className="mb-5 px-2">

            <div className="mb-1">
            <p className="font-medium">Project</p>

            <p>I <span className="text-bold">{sessionState.job.contractor}</span> (Contractor) will make {sessionState.job.title} for the owner of the accepting wallet address.</p>

              {/*<p>I <span className="text-bold">[ArtistName]</span> (Contractor) will make {job['title']||'unknown'} for the owner of the accepting wallet address.</p>
              */}
            </div>

            <div className="mb-1">
            <p className="font-medium">Description</p>
            <p>{job['description']||'unknown'}.</p>
            </div>


            <div className="mb-1">
            <p className="font-medium">Legal assignment</p>
            <p>The Contractor will assign rights according to {job['lic_type']||'unknown'}.</p>
            </div>


            <div className="flex justify-between mb-1">
            <p className="font-medium">Gas fees</p>
            <p>[2.50]</p>
            </div>
            <div className="flex justify-between mb-1">
            <p className="font-medium">Our fee</p>
            <p>[50.00]</p>
            </div>
            <div className="flex justify-between">
            <p className="font-medium">Royalties</p>
            <p>[50.00]</p>
            </div>
            <div className="flex justify-end">
            <div className="w-6/12 h-px bg-darky my-1" />
            </div>
            <p className="text-right">[-177.50]</p>
        </div>

      </div>
     )

}

export default ProjectRequirements