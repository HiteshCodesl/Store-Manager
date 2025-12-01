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

import { useEffect, useMemo, useState } from "react"

interface UserProp{
  id: number,
  name: string,
  email: string,
  createdAt: string
  role: string
}

export default function UserTable({inputValue}: {inputValue: string}) {
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

   const filteredStores = useMemo(() => {
        const query = inputValue?.trim().toLowerCase();
        if (!query) return data;
        return data?.filter((s) =>
          (s.name ?? "").toLowerCase().includes(query) ||
          (s.email ?? "").toLowerCase().includes(query)
        );
      }, [data, inputValue]);

  return (   
    <div className="mx-10 w-full bg-purple-600 text-black">
         <Table>
      <TableCaption>A list of your Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Id</TableHead>
          <TableHead className="font-medium">Name</TableHead>
          <TableHead className="font-medium">Email</TableHead>
          <TableHead className="font-medium">Role</TableHead>
          <TableHead className="font-medium">CreatedAt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStores.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell className="font-medium">{user.role}</TableCell>
            <TableCell className="font-medium">{user.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
      
  )
}
