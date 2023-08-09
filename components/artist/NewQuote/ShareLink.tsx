import { MdOutlineCopyAll } from 'react-icons/md'

const ShareLink = ({job}) => {
  return (
    <div className="flex justify-center gap-3 mt-3">
      <a href="#" className="text-primary/80 font-medium">
        https://link.app/{job['share_code']}
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
