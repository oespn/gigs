import { MdOutlineCopyAll } from 'react-icons/md'

const ShareLink = ({url}) => {
  return (
    <div className="flex justify-center gap-3 mt-3">
      <a href={url} className="text-primary/80 font-medium">
        View on Explorer
      </a>
      <div className="text-2xl">
        <button className="flex items-center gap-1 text-primary/80 font-medium">
          <span>
            <MdOutlineCopyAll />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ShareLink
