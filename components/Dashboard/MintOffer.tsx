import { BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/router'

const MintOffer = () => {
  const router = useRouter()

  return (
    <div className="bg-lightBlue p-3 rounded-sm text-darky">
      <h3 className="font-bold">Mint your first NFT for free! 👋 </h3>
      <p>Experience how our NFTs protect your work. </p>
      <div className="mt-3 flex justify-end">
        <button 
          onClick={() => router.push('/mint')}
          className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium">
          Show me
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
    </div>
  )
}

export default MintOffer
