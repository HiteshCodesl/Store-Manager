"use client"
import { useEffect, useMemo, useState } from "react"
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
  createdAt: string,
  averageRating: number,
  totalRatings: number
}

export default function StoreTable({inputValue}: {inputValue: string}) {
  const [data, setData] = useState<Store[] | null>([]);

  const fetchStores = async() => {
    const response = await axios.get('/api/stores/rating');
    if(response){
      console.log("store data",response.data);
      setData(response.data);
    }
  }

  useEffect(() => {
    fetchStores();
  }, [])

  const filteredStores = useMemo(() => {
    const query = inputValue?.trim().toLowerCase();
    if (!query) return data;
    return data?.filter((s) =>
      (s.name ?? "").toLowerCase().includes(query) ||
      (s.email ?? "").toLowerCase().includes(query) ||
      (s.address ?? "").toLowerCase().includes(query) 
    );
  }, [data, inputValue]);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[600px] bg-purple-600 text-black">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>AVG Rating</TableHead>
            <TableHead>Total Rating</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStores?.map((store) => (
            <TableRow key={store.id}>
              <TableCell className="font-medium">{store.id}</TableCell>
              <TableCell className="font-medium">{store.name}</TableCell>
              <TableCell className="font-medium">{store.email}</TableCell>
              <TableCell className="font-medium">{store.averageRating}</TableCell>
              <TableCell className="font-medium">{store.totalRatings}</TableCell>
              <TableCell className="font-medium">{store.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
