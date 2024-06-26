import * as React from 'react'
import RegisterForm from './RegisterForm'
import RightSideMain from './RightSideMain'

function Register() {
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
          <RegisterForm></RegisterForm>
        </div>
        <RightSideMain></RightSideMain>
      </div>
    </>
  )
}

export default Register