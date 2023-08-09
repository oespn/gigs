import {
  BsCheck2,
  BsFillChatFill,
  BsFillJournalBookmarkFill,
  BsFillPencilFill,
} from 'react-icons/bs'
import { AiOutlineEllipsis } from 'react-icons/ai'
import MintOffer from './MintOffer'
import Image from 'next/image'
import FeaturedArtist from './FeaturedArtist'
import Link from 'next/link'

import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/state'
import { initXRPL, loadContract } from '../../context/utils'
import { useRouter } from 'next/router'

const baseEscrow = {
  title: "Loading",
  description: "...",
  contractor: "...",
  locked_amount: "...",
  escrow_state: "...",
}

const DashboardClient = () => {
  const sessionState = useAppContext();
  const router = useRouter()

  const [escrows, setEscrows] = useState([baseEscrow]);

  useEffect(() => {
    /* initalise xrpl api here and store in AppContext */ 
    const init = async () => {
      const { xrpl, wallet } = await initXRPL();
      sessionState.xrpl = xrpl;
      sessionState.wallet = wallet;

      if (sessionState.wallet && sessionState.wallet.isSignedIn()) {
        const contract: any = loadContract(sessionState.xrpl, sessionState.wallet, "escrow")
        setEscrows(await contract.get_escrows_as_client({ account_id: sessionState.wallet.getAccountId() }));
      }
    }

    init();
  }, []);

  const filterEscrow = (state) => {
    let ret = [];
    escrows.map(e => e.escrow_state === state && ret.push(e))
    return ret;
  }

  const redirect = (escrowId) => {
    sessionState.selectedEscrow = escrowId;
    router.push(`/update-job/draft?escrow=${escrowId}`); //query optional for now.
  }

  return (
    <section className=" mt-3 text-darky">
      <div className="px-3">
        <MintOffer />

        <div className="p-3 text-center text-slate-400">
          <p className="tracking-tight text-xs">
            Invite an artist. Earn credits.
          </p>
        </div>

        <div className="mb-2">
          <h2 className="flex items-center gap-2 font-medium text-xl mt-7">
            My Orders
            <span>
              <BsFillJournalBookmarkFill />
            </span>
          </h2>
        </div>

        {
        filterEscrow('AWAITING').map((escrow, index) => {
          return (
            <div key={index} className="shadow-md px-3 py-2 mb-2 bg-white">
              <div className="flex justify-between text-lg mb-2">
                <h3>{escrow.title}</h3>
                <h3>{escrow.contractor}</h3>

                <button>
                  <AiOutlineEllipsis className="text-xl" />
                </button>
              </div>
              <p className="tracking-tight">
                {escrow.description}
              </p>
              <p className="tracking-tight">
                PROGRESS: {escrow.escrow_state}
              </p>
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  {/* <span className="mx-1">
                    <Image
                      src="/images/julian.jpg"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </span> */}
                  <p>
                    <span className="text-xs">XRPL</span>
                    <b className="font-bold">{` $${escrow.locked_amount}`}</b>
                  </p>
                </div>
                <div className="flex gap-2 text-lg">
                  {/* <Link href="/update-job/draft"> */}
                    <button 
                    onClick={() => redirect(`${escrow.client}${escrow.contractor}${escrow.escrow_id}`)}
                    className="border border-gray-300 shadow-sm py-2 px-2 rounded-sm">
                        <BsFillPencilFill className="" />
                    </button>
                  {/* </Link> */}
                  <button className="border border-gray-300 shadow-sm py-2 px-2 rounded-sm">
                    <BsFillChatFill className="" />
                  </button>
                  <Link href="/update-job/final">
                    <button className="border border-gray-300 shadow-sm py-2 px-2 rounded-sm">
                      <BsCheck2 className="" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })
      }     

        <div className="mb-2">
          <h2 className="flex items-center gap-2 font-medium text-xl mt-7">
            Previous Orders
            <span>
              <BsCheck2 />
            </span>
          </h2>

          <p className="tracking-tight text-slate-400 text-sm">
            Finished job appear here
          </p>
        </div>

        {
        filterEscrow('COMPLETE').map((escrow, index) => {
          return (
            <div key={index} className="shadow-md px-3 py-2 mb-2 bg-white">
              <div className="flex justify-between text-lg mb-2">
                <h3>{escrow.title}</h3>
                <h3>{escrow.contractor}</h3>

                <button>
                  <AiOutlineEllipsis className="text-xl" />
                </button>
              </div>
              <p className="tracking-tight">
                {escrow.description}
              </p>
              <p className="tracking-tight">
                PROGRESS: {escrow.escrow_state}
              </p>
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  {/* <span className="mx-1">
                    <Image
                      src="/images/julian.jpg"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </span> */}
                  <p>
                    <span className="text-xs">XRP</span>
                    <b className="font-bold">{` $${escrow.locked_amount}`}</b>
                  </p>
                </div>
                <div className="flex gap-2 text-lg">
                  <button className="border border-gray-300 shadow-sm py-2 px-2 rounded-sm">
                    <BsFillChatFill className="" />
                  </button>
                </div>
              </div>
            </div>
          )
        })
      }  
        <div className="mb-2">
          <h2 className="flex items-center gap-2 font-medium text-xl mt-7">
            Quotes
            <span>
              <BsFillJournalBookmarkFill />
            </span>
          </h2>
          <p className="tracking-tight text-slate-400 text-sm">
            Jobs waiting for approval
          </p>
        </div>
      </div>

      <div className="mb-2">
        <h2 className="flex px-3 items-center gap-2 font-medium text-xl mt-7">
          Featured Artist
        </h2>
        <hr />
        <FeaturedArtist />
        <hr />
      </div>
    </section>
  )
}

export default DashboardClient
