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
    <div className="bg-[#0a0a0a] min-h-screen w-full py-10 px-4 sm:px-6 lg:px-10 flex flex-col items-center">
      
      {/* Search & Login/Logout */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full max-w-4xl items-center">
        <Input 
          value={searchItems} 
          onChange={(e) => setSearchItems(e.target.value)} 
          placeholder="Search" 
          className="text-white flex-1"
        />

        <Button 
          onClick={() => {
            if(isAuthenticated){
              localStorage.removeItem('token');
              setIsAuthenticated(false);
            } else {
              router.push('/login');
            }
          }} 
          variant={'saas'}
          className="w-full sm:w-auto"
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </Button>
      </div>

      {/* Table Section */}
      <div className="flex flex-col mt-10 w-full max-w-6xl">
        <StoreTableUser search={searchItems} />
      </div>
    </div>
  )
}
