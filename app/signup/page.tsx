import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function CardDemo() {
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
                id="email"
                type="email"
                placeholder="john@doe.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="address"
                placeholder="sector 1 hsr layout"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input id="password" type="password" required />
            </div>
             <div>
               <Select>
                 <SelectTrigger className="w-[180px] flex">
                 <SelectValue placeholder="Select Role"/>
                 </SelectTrigger>
                 <SelectContent>
                  <SelectItem value="STORE_OWNER">Store Owner</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                 </SelectContent>
               </Select>
             </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant={"saas"} type="submit" className="w-full">
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
