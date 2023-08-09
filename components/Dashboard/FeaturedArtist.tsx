import Image from 'next/image'

const FeaturedArtist = () => {
  return (
    <div className="tipWhite rounded-sm text-darky">
      <div className="px-3 p-3">
        <h3 className="font-bold">Monica Frank 3D Models</h3>

        <div className="flex align-top">
          <div className="gap-3 mt-3">
            <p className="tracking-tight ">
              Blender Expert 7 yrs. I can build you an NFT part for any
              Metaverse game in just 7 days!
            </p>
            <button className="mt-3 gap-1 text-primary hover:text-primary/80 font-medium">
              Contact
            </button>
          </div>
          <span className="mx-1">
            <img src="/images/monicafrank@2x.jpg" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default FeaturedArtist
