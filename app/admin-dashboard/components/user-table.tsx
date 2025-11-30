"use client"
import axios from "axios";
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

import { useEffect, useState } from "react"

interface UserProp{
  id: number,
  name: string,
  email: string,
  createdAt: string
}

export default function UserTable() {
  const [data, setData] = useState<UserProp[]>([]);

  const fetchUsers = async() => {
    const response = await axios.get('/api/users');

    if(response){
      setData(response.data);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (   
    <div className="mx-10 w-full bg-white text-black">
         <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Id</TableHead>
          <TableHead className="font-medium">Name</TableHead>
          <TableHead className="font-medium">Email</TableHead>
          <TableHead className="font-medium">CreatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell className="font-medium">{user.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
      
  )
}
