"use client"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import axios from "axios";
import { Store } from "../../admin-dashboard/components/store-table";
import { Button } from "../../../components/ui/button";
 
export default function StoreTableUser() {
  const [stores, setStores] = useState<Store[]>([]);

  const fetchStores = async() => {
    const response = await axios.get('/api/stores');

    if(response){
      setStores(response.data);
    }
  }

  useEffect(() => {
    fetchStores();
  }, []);

  return (
     <div className="mx-10 w-full bg-violet-500">
        <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Id</TableHead>
          <TableHead className="font-medium">Name</TableHead>
          <TableHead className="font-medium">Email</TableHead>
          <TableHead className="font-medium">Address</TableHead>
          <TableHead className="font-medium">Rating</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map((store) => (
          <TableRow key={store.id}>
            <TableCell className="font-medium">{store.id}</TableCell>
            <TableCell className="font-medium">{store.name}</TableCell>
            <TableCell className="font-medium">{store.email}</TableCell>
            <TableCell className="font-medium">{store.address}</TableCell>
            <button className="p-1 mt-1 mb-1  border">give us Rating</button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
     </div>
  )
}
