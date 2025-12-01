"use client"
import { Button } from "../../../components/ui/button"
import { BoxIcon, Plus, User } from "lucide-react"
import { useState } from "react";

import {
  Dialog,
  DialogContent,
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
    console.log("data", storeName, storeEmail, storeAddress)
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
    <div className="w-full md:w-60 p-4 bg-[#0a0a0a] flex flex-col h-full md:h-screen">
      <h1 className="text-xl text-violet-600 mb-6 text-center md:text-left">Store Management</h1>

      <div className="flex flex-col gap-3">
        <Button onClick={() => setDialogType('addUser')} variant={'saas'} className="py-3 text-md flex items-center justify-center md:justify-start gap-2">
          <Plus /> Add User
        </Button>
        <Button onClick={() => setDialogType('addAdmin')} variant={'saas'} className="py-3 text-md flex items-center justify-center md:justify-start gap-2">
          <User /> Add Admin
        </Button>
        <Button onClick={() => setDialogType('newStore')} variant={'saas'} className="py-3 text-md flex items-center justify-center md:justify-start gap-2">
          <BoxIcon /> Add Store
        </Button>
      </div>

      {/* Dialogs */}
      {dialogType && (
        <Dialog open={!!dialogType} onOpenChange={() => setDialogType(null)}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-violet-800 font-semibold text-center">
                {dialogType === "addUser" ? "Add New User" : dialogType === "addAdmin" ? "Add New Admin" : "Add New Store"}
              </DialogTitle>

              {dialogType === "addUser" || dialogType === "addAdmin" ? (
                <>
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />

                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />

                  <Label>Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" />

                  <Button onClick={dialogType === "addUser" ? addUser : addAdmin} className="mt-3 w-full bg-gradient-to-r from-violet-500 to-purple-500 text-black hover:opacity-85">
                    {dialogType === "addUser" ? "Add User" : "Add Admin"}
                  </Button>
                </>
              ) : (
                <>
                  <Label>Store Name</Label>
                  <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Enter Store Name" />

                  <Label>Email</Label>
                  <Input value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} placeholder="Enter Store Email" />

                  <Label>Address</Label>
                  <Input value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)} placeholder="Enter Store Address" />

                  <Button onClick={createStore} className="mt-3 w-full bg-gradient-to-r from-violet-500 to-purple-500 text-black hover:opacity-85">
                    Add Store
                  </Button>
                </>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
