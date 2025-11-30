"use client"
import { useEffect, useState } from "react"
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


export interface Store{
  id: number,
  name: string,
  email: string,
  address: string,
}

export default function StoreTable() {
  const [data, setData] = useState<Store[] | null>([]);

  const fetchStores = async() => {
    const response = await axios.get('/api/stores');

    if(response){
      console.log(response.data);
      setData(response.data);
    }
  }

  useEffect(() => {
    fetchStores();
  }, [])


  return (
     <div className="mx-10 w-full bg-white text-black">
        <Table className="">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((store) => (
          <TableRow key={store.id}>
             <TableCell className="font-medium">{store.id}</TableCell>
            <TableCell className="font-medium">{store.name}</TableCell>
            <TableCell className="font-medium">{store.email}</TableCell>
            <TableCell className="font-medium">{store.address}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
     </div>
  )
}
