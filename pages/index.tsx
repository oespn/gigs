import React, { useState, useEffect } from 'react';

import Image from 'next/image'
import { useRouter } from 'next/router'
import MetaHead from '../components/common/Layout/MetaHead'
import Logo from '../components/ui/Logo'

import { useAppContext } from '../context/state'
import { initXRPL } from '../context/utils'

//import { connect, Contract, Near, WalletConnection } from 'xrpl'

export default function Home() {
  const sessionState = useAppContext();
  const router = useRouter()

  useEffect(() => {
    /* initalise near api here and store in AppContext */ 
    const init = async () => {
      const { xrpl, wallet } = await initXRPL();
      sessionState.xrpl = xrpl;
      sessionState.wallet = wallet;

      if (sessionState.wallet && sessionState.wallet.isSignedIn()) {
        router.push('/dashboard')
      }
    }

    init();
  }, []);

  const login = async () => {
    console.log("Login");
    sessionState.wallet.requestSignIn(sessionState.abi.nft.contractAddr, "Gig");

    console.log("Done");
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <MetaHead title="AMADAO Login" />
      <section className="flex flex-col items-center pt-30 text-center px-10 text-gray-700">
        <div className="mb-4">
          <Logo size="w-40 h-40" />
        </div>

        <div className="text-4xl font-semibold mb-7 text-gray-800">
          <h2>AMADAO</h2>
          <h2>NFT</h2>
        </div>

        <div className="mb-4">
          <p>I&apos;ve got a code</p>
          <input
            type="number"
            maxLength={4}
            max={'999'}
            className="shadow-md border border-gray-200 rounded-sm mt-4 mb-3 w-full py-2 px-2
            text-center outline-primary tracking-widest text-lg"
          />
        </div>

        <div className="flex flex-col items-center mt-5 gap-4">
          <button
            // onClick={() => router.push('/dashboard')}
            onClick={() => login()}
            className="flex bg-primary hover:bg-primary/90  px-5 py-2 text-white gap-3 items-center rounded-md font-medium"
          >
            <Image
              src="/images/logo-xrpl.svg"
              alt="Logo Ripple"
              width={16}
              height={16}
            />
            Connect
          </button>
          <p>
            Your wallet will open or you&apos;ll be prompted to create one.
          </p>
        </div>
      </section>
    </main>
  )
}
