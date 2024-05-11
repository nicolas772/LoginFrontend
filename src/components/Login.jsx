import * as React from 'react'
import LoginForm from './LoginForm'
import RighSideMain from './RightSideMain'

function Login() {
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2'>
          <LoginForm></LoginForm>
        </div>
        <RighSideMain></RighSideMain>
      </div>
    </>
  )
}

export default Login
