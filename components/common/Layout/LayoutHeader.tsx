import { relative } from 'path/posix';
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { IoChatbubblesSharp } from 'react-icons/io5'




const LayoutHeader = ( props, 
  { children} : { children: React.ReactNode } 
   ) => {
  // TODO: Implement dropdown menu and sideslider menu
  // TODO: Wallet signout transition to -> main screen for wallet connect
  
  //const isClient = 0;
  console.log(props);
    const dropBar = props.dropBar;
    const dashboard = props.dashboard;

    console.log(dropBar);

  return (
    <main className="bg-gray-100 min-h-screen md:min-h-90vh container md:border md:border-gray-200 md:shadow-lg md:max-w-sm md:max-h-150 overflow-y-auto mx-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      <header className="border-b-2 border-gray-300 bg-white text-darky sticky top-0 z-50">
        <div className="flex justify-between px-5 py-2 ">
          <button>
            <HiOutlineMenuAlt1 className="text-xl" />
          </button>
          <button className="bg-gray-200 p-2 rounded-full">
              <IoChatbubblesSharp className=" text-xl text-primary/80" />
          </button>
          <div className="flex gap-3 items-center">
            { dropBar }
          </div>
        </div>
      </header>
      <div className='relative'>
        {dashboard} 
      </div>
      {children}

    </main>
  )
}

export default LayoutHeader
