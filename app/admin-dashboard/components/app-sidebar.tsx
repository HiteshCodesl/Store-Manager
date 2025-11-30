"use client"
import { Button } from "../../../components/ui/button"
import { BoxIcon, Plus, User } from "lucide-react"
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import axios from "axios";
import { toast } from "sonner";

export default function Sidebar() {
  const [dialogType, setDialogType] = useState<"addUser" | "newStore" | "addAdmin" | null>(null);

   const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    
    const addUser = async() => {
      const role = "USER";
        const response = await axios.post('/api/admin/dashboard/addUser', {name, email, password, address, role});

        if(response){
          toast.success("User Added Successfully");
          
        }else{
          toast.error("User not added")
        }
        setDialogType(null);
        setName('');
        setAddress('');
        setEmail('');
        setPassword('');
    }


    const addAdmin = async() => {
       const role = "ADMIN";

       const response = await axios.post('/api/admin/dashboard/addUser', {name, email, password, address, role});

       if(response){
        toast.success('Admin Created SuccessFully');
       }else{
        toast.error("Admin not created")
       }
        setDialogType(null);
        setName('');
        setAddress('');
        setEmail('');
        setPassword('');
    }


    const [storeName, setStoreName] = useState('');
    const [storeEmail, setStoreEmail] = useState('');
    const [storeAddress, setStoreAddress] = useState('');


    const createStore = async() => {
       const response = await axios.post('/api/admin/dashboard/createStore', {storeName, storeEmail, storeAddress})

       if(response){
        toast.success("Store added Successfully")
       }else{
        toast.error("Store not added")
       }
      setDialogType(null);
       setStoreName('');
       setStoreEmail('');
       setStoreAddress('');
    }

 
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
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a Name"/>

           <Label className="text-md font-sans">Enter Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter a Email"/>

           <Label className="text-md font-sans">Enter Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a Password"/>

           <Label className="text-md font-sans">Enter Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter a Address"/>

          <Button onClick={addUser} className="border bg-linear-270 from-violet-500 to-purple-500 text-black hover:opacity-85 mt-3">Add User</Button>

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
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a Name"/>

           <Label className="text-md font-sans">Enter Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter a Email"/>

           <Label className="text-md font-sans">Enter Password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a Password"/>

           <Label className="text-md font-sans">Enter Address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter a Address"/>

          <Button onClick={addAdmin} className="border bg-linear-270 from-violet-500 to-purple-500 text-black hover:opacity-85 mt-3">Add Admin</Button>

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
          <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Enter a Name"/>

           <Label className="text-md font-sans">Enter Email</Label>
          <Input value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} placeholder="Enter a Email"/>

           <Label className="text-md font-sans">Enter Address</Label>
          <Input value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} placeholder="Enter a Address"/>

          <Button onClick={createStore} className="border bg-linear-270 from-violet-500 to-purple-500 text-black hover:opacity-85 mt-3">Add Store</Button>
         </DialogHeader>
         </DialogContent>
        </Dialog>
        )
       }

    </div>
    
  )
}

