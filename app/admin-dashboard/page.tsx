"use client"
import { Button } from "../../components/ui/button";
import Sidebar from "./components/app-sidebar";
import { Input } from "../../components/ui/input";
import { CardHoverEffectDemo } from "./components/analytic-cards";
import UserTable from "./components/user-table";
import StoreTable from "./components/store-table";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }
  }, [])

  return (
    <div className="bg-[#0a0a0a] w-screen  h-[210vh] flex">
      <div className="p-4  border-r w-[15vw] h-[210vh]">
       <Sidebar />
      </div>

      <div className="flex flex-col gap-8 ">
          <div className="flex  mt-5 mx-5 gap-5 items-center">
           <div className="w-[70vw] ">
              <Input placeholder="Search" className="text-white"/>
           </div>
           <div className="">

            {isAuthenticated ?
              <Button onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                router.push('/');
              }} variant={'saas'}>Logout</Button>
              :
              <Button 
              variant={'saas'} 
              onClick={() => router.push('/login')}>
                Login
              </Button>
            }

           </div>
          </div>

          <div className="flex text-center mx-auto">
          <CardHoverEffectDemo />
          </div>

          <div className="mt-5 flex flex-col gap-8 w-full">
            <Label className="text-xl font-semibold text-fuchsia-500 mx-auto ">List of Store</Label>
            <StoreTable />
            <Label className="text-xl font-semibold text-fuchsia-500 mx-auto ">List of Users</Label>
             <UserTable />
          </div>
      </div>
     
    </div>
  )
}

