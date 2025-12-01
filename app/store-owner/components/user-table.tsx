"use client"
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import axios from "axios";

interface User{
  id: number,
  name: string,
  email: string,
  role: string
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async() => {
    const response =  await axios.get('/api/users');

    if(response){
      console.log("users", response.data);
      setUsers(response.data)
    }
  }

  useEffect(() => {
     fetchUsers();
  }, []);

  return (
     <div className="w-full bg-violet-500">
        <Table className="">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium w-[100px]">{user.id}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell className="font-medium">{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
     </div>
  )
}
