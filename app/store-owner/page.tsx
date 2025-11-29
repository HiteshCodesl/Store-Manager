import React from 'react'
import UserTable from './components/user-table'
import { Button } from '@/components/ui/button'

export default function StoreOwner() {
  return (
    <div className='bg-[#0a0a0a] h-screen w-screen flex flex-col text-center'> 

      <div className='text-white  mt-10  flex flex-row justify-around'>
        <div>
        Hello, Welcome Back
        </div> 
        <div className='flex gap-4'>
            <Button variant={"saas"}>Update Password</Button>
            <Button variant={"saas"}>Logout</Button>
        </div>
      </div>

      <div className='w-[85vw] flex text-center mx-auto mt-6'>
        <UserTable />
      </div>
    </div>
  )
}
