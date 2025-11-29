import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StoreTableUser from "./components/store-table-user";

export default function UserDashBoard() {
  return (
    <div className="bg-[#0a0a0a] h-screen w-screen py-10  px-10 flex flex-col items-center">

      <div className="flex gap-5 items-center">
           <div className="w-[70vw] ">
              <Input placeholder="Search" className="text-white"/>
           </div>
           <div className="">
              <Button variant={'saas'}>Logout</Button>
           </div>
            <div className="">
              <Button variant={'saas'}>Update Password</Button>
           </div>
      </div>

      <div className="flex mx-auto mt-10 w-full">
        <StoreTableUser />
      </div>
    </div>
  )
}

