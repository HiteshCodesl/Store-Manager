"use client"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginReq = async() => {
    setIsLoading(true);
      const response = await axios.post('/api/auth/login', {email, password});

      if(response){
        const token = response.data.token;
        localStorage.setItem("token", token);

        if(response.data.role == "USER"){
          router.push('/user-dashboard')
        }else if(response.data.role === "ADMIN"){
          router.push('/admin-dashboard')
        }
        else{
          router.push('/store-owner')
        }

      }
      setIsLoading(false);
  }

  return (
    <div className="flex justify-center h-screen align-center items-center">

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex text-center mx-auto text-xl font-semibold ">Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
               
              </div>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={isLoading} onClick={loginReq}  variant={'saas'} type="submit" className="w-full">
          Login
        </Button>
        <div className="flex gap-2">
           haven't signed yet
           <Link href={"/signup"} className="underline text-md font-semibold">
               Sign up
           </Link> 
        </div>
      </CardFooter>
    </Card>
    </div>
   
  )
}
