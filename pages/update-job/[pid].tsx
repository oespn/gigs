
import { styled } from '@stitches/react'
import UpdateJob from '../../components/artist/UpdateJob/UpdateJob'
import Layout from '../../components/common/Layout'
import MetaHead from '../../components/common/Layout/MetaHead'
import {MdClose} from 'react-icons/md'
import {useRouter} from 'next/router'

const CloseButton = styled("button",
{
  position: 'fixed',
  right:5,
  height: '30px',
  width: '30px',
  top:5,
});

export default function UpdatePage() {

  const router = useRouter()
  const value = router.query

  console.log('UpdatePage p0:'+value.pid);

  return (
    <Layout>
      <MetaHead title="AMADAO Dashboard" />
      <div className="mb-10 m-5">
        <CloseButton 
          type="button"
          onClick={() => {
              window.history.back(); 
            }}>
          <p className="text-right text-black text-2xl">
            <MdClose/>
          </p>
        </CloseButton>
      </div>
      <UpdateJob option = {value.pid} />
    </Layout>
  )
}