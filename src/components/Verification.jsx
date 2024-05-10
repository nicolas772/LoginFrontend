import * as React from 'react'
import VerificationForm from './VerificationForm'
import RightSideMain from './RightSideMain'

function Verification() {
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
          <VerificationForm></VerificationForm>
        </div>
        <RightSideMain></RightSideMain>
      </div>
    </>
  )
}

export default Verification