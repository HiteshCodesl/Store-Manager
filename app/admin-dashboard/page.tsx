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
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
    }
  }, [])

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="p-4 border-b md:border-b-0 md:border-r w-full md:w-1/5">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6 p-4">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search"
            className="text-white w-full sm:w-3/4"
          />
          {isAuthenticated ? (
            <Button
              onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                router.push('/');
              }}
              variant={'saas'}
              className="w-full sm:w-auto"
            >
              Logout
            </Button>
          ) : (
            <Button
              variant={'saas'}
              onClick={() => router.push('/login')}
              className="w-full sm:w-auto"
            >
              Login
            </Button>
          )}
        </div>

        {/* Analytics Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          <CardHoverEffectDemo />
        </div>

        {/* Tables */}
        <div className="flex flex-col gap-6 w-full">
          <Label className="text-xl font-semibold text-fuchsia-500 text-center">
            List of Store
          </Label>
          <StoreTable inputValue={inputValue} />

          <Label className="text-xl font-semibold text-fuchsia-500 text-center">
            List of Users
          </Label>
          <UserTable inputValue={inputValue}/>
        </div>
      </div>
    </div>
  )
}
