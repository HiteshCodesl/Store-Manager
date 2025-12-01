"use client"
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

export default function Signup() {

  const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const signupReq = async() => {
      console.log(name, password, email, address)
      const response = await axios.post(`/api/auth/signup`, {email, name, address, password});

      if(response){
        const token = response.data.token;
        console.log(response.data);
        localStorage.setItem('token', token);
       
        if(response.data.role === "USER"){
          router.push('/user-dashboard')
        }else{
          router.push('/store-owner')
        }
      }
    }

  return (
  <div className="flex justify-center h-screen align-center items-center">

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex text-center mx-auto text-xl font-semibold">Sign up </CardTitle>
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
                placeholder="john@doe.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="John doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="address"
                type="address"
                placeholder="Enter your address"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input id="password" type="password" required placeholder="Enter a password"  value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
           
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={signupReq} variant={"saas"} type="submit" className="w-full">
          Signup
        </Button>
         <div className="flex gap-2">
           Already a User
           <Link href={"/login"} className="underline text-md font-semibold">
               Login
           </Link> 
        </div>
      </CardFooter>
    </Card>
  </div>
  )
}
