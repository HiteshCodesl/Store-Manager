"use client"
import { Button } from "@/components/ui/button"
import { BoxIcon, Plus, User } from "lucide-react"
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Sidebar() {
  const [dialogType, setDialogType] = useState<"addUser" | "newStore" | "addAdmin" | null>(null);

  return (
    <div className="h-[150vh]">
       <div>
          <h1 className="text-xl text-violet-600 mb-10">Store Mangement</h1>
          <div className="flex flex-col gap-5">
          <Button onClick={() => setDialogType('addUser')} variant={'saas'} className="py-5 text-md"><Plus />Add User</Button>
          <Button onClick={() => setDialogType('addAdmin')} variant={'saas'} className="py-5 text-md"><User />Add Admin</Button>
          <Button onClick={() => setDialogType('newStore')} variant={'saas'} className="py-5 text-md"><BoxIcon />Add Store</Button>
          </div>
       </div>  
       
       {dialogType === "addUser" && (
        <Dialog open={dialogType==="addUser"} onOpenChange={() => setDialogType(null)}>
         <DialogTrigger>Open</DialogTrigger>
         <DialogContent>
         <DialogHeader>
         <DialogTitle className="text-violet-800 font-semibold text-center">Add New User</DialogTitle>
         <Label className="text-md font-sans">Enter Name</Label>
          <Input placeholder="Enter a Name"/>
           <Label className="text-md font-sans">Enter Email</Label>
          <Input placeholder="Enter a Email"/>
           <Label className="text-md font-sans">Enter Password</Label>
          <Input placeholder="Enter a Password"/>
           <Label className="text-md font-sans">Enter Address</Label>
          <Input placeholder="Enter a Address"/>

          <Button className="border bg-linear-270 from-violet-500 to-purple-500 text-black hover:opacity-85 mt-3">Add User</Button>
         </DialogHeader>
         </DialogContent>
        </Dialog>
        )
       } 

       {dialogType === "addAdmin" && (
        <Dialog open={dialogType==="addAdmin"} onOpenChange={() => setDialogType(null)}>
         <DialogTrigger>Open</DialogTrigger>
         <DialogContent>
         <DialogHeader>
         <DialogTitle className="text-violet-800 font-semibold text-center">Add New Admin</DialogTitle>
         <Label className="text-md font-sans">Enter Name</Label>
          <Input placeholder="Enter a Name"/>
           <Label className="text-md font-sans">Enter Email</Label>
          <Input placeholder="Enter a Email"/>
           <Label className="text-md font-sans">Enter Password</Label>
          <Input placeholder="Enter a Password"/>
           <Label className="text-md font-sans">Enter Address</Label>
          <Input placeholder="Enter a Address"/>

          <Button className="border bg-linear-270 from-violet-500 to-purple-500 text-black hover:opacity-85 mt-3">Add Admin</Button>
         </DialogHeader>
         </DialogContent>
        </Dialog>
        )
       }

       {dialogType === "newStore" && (
        <Dialog open={dialogType==="newStore"} onOpenChange={() => setDialogType(null)}>
         <DialogTrigger>Open</DialogTrigger>
         <DialogContent>
         <DialogHeader>
         <DialogTitle className="text-violet-800 font-semibold text-center">Add New Store</DialogTitle>
         <Label className="text-md font-sans">Enter Store Name</Label>
          <Input placeholder="Enter a Name"/>
           <Label className="text-md font-sans">Enter Email</Label>
          <Input placeholder="Enter a Email"/>
           <Label className="text-md font-sans">Enter Address</Label>
          <Input placeholder="Enter a Address"/>

          <Button className="border bg-linear-270 from-violet-500 to-purple-500 text-black hover:opacity-85 mt-3">Add Store</Button>
         </DialogHeader>
         </DialogContent>
        </Dialog>
        )
       }

    </div>
    
  )
}

