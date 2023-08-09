import LayoutHeader from '../components/common/Layout/LayoutHeader'
import MetaHead from '../components/common/Layout/MetaHead'
import Dashboard from '../components/Dashboard'
import DropDownMenu from '../components/Dashboard/DropDownMenu'
import { useState, useEffect } from 'react'


export default function Home() {
  const [isClient, setIsClient] = useState(false);

  const handleStatusChange = (status) => {
    setIsClient(status);
    console.log('handleStatusChange: ', status);
    
  }
  //console.log('Listening dash-mode: ', isClient);
  
  const dropBarUpdate = (
    <DropDownMenu props= {{isClient, handleStatusChange}} />
  );

  const dashboardUpdate = (
    <Dashboard props = {{isClient, handleStatusChange}} />
  ); 

  const props = 
  {
    dropBar: dropBarUpdate,
    dashboard: dashboardUpdate
  };

  return (
    <LayoutHeader {...props} /> 
  )
}
