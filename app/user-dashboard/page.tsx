"use client"
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import StoreTableUser from "./components/store-table-user";
import { useRouter } from "next/navigation";

export default function UserDashBoard() {
  const [searchItems, setSearchItems] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
   const token = localStorage.getItem('token');
   if(token){
    setIsAuthenticated(true);
   }
  }, [])

  return (
    <div className="bg-[#0a0a0a] h-screen w-screen py-10  px-10 flex flex-col items-center">

      <div className="flex gap-5 items-center">
           <div className="w-[70vw] ">
              <Input 
              value={searchItems} 
              onChange={(e) => setSearchItems(e.target.value)} placeholder="Search" className="text-white"/>
           </div>
           <div className="">
             {isAuthenticated ?
              <Button onClick={ () => {
                localStorage.removeItem('token')
                setIsAuthenticated(false)
              }} variant={'saas'}>Logout</Button>
             : <Button variant={'saas'} onClick={() => router.push('/login')}>
                Login
               </Button>
            }
           </div>
          
      </div>

      <div className="flex flex-col mt-10 w-[90vw]">
         <div className="mt-7 mx-10"> 
        <StoreTableUser search={searchItems} />
         </div>
      </div>
    </div>
  )
}

