"use client"
import React, { useEffect, useState } from 'react'
import UserTable from './components/user-table'
import { Button } from '../../components/ui/button'

export default function StoreOwner() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }
  })

  return (
    <div className='bg-[#0a0a0a] h-screen w-screen flex flex-col text-center'> 

      <div className='text-white  mt-10  flex flex-row justify-around'>
        <div>
        Hello, Welcome Back
        </div> 
        <div className='flex gap-4'>
            {isAuthenticated ?
            <Button variant={"saas"}>Logout</Button>
            : 
            <Button variant={'saas'}>Login</Button>
           }
        </div>
      </div>

      <div className='w-[85vw] flex text-center mx-auto mt-6'>
        <UserTable />
      </div>
    </div>
  )
}
