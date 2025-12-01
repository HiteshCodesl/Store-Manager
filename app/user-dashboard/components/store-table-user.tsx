"use client"
import { useEffect, useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"

import axios from "axios";
import { Store } from "../../admin-dashboard/components/store-table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { toast } from "sonner";
 
export default function StoreTableUser({search}: {search: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [stores, setStores] = useState<Store[]>([]);
  const [storeId, setStoreId] = useState<number | ''>('');
  const [rating, setRating] = useState<string>('');

  const submitRating = async() => {
    const response = await axios.post("/api/stores/rating", {storeId, rating});

    if(response){
      toast.success('Thanks for Rating');
    }
    setIsOpen(false);
  }

  const fetchStores = async() => {
    const response = await axios.get('/api/stores/rating');

    if(response){
      setStores(response.data);
    }
  }

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    console.log(storeId);
  }, [storeId]);

    const filteredStores = useMemo(() => {
    const query = search?.trim().toLowerCase();
    if (!query) return stores;
    return stores.filter((s) =>
      (s.name ?? "").toLowerCase().includes(query) ||
      (s.email ?? "").toLowerCase().includes(query) ||
      (s.address ?? "").toLowerCase().includes(query)
    );
  }, [stores, search]);

  return (
     <div className="mx-10 w-full bg-violet-500">
        <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Id</TableHead>
          <TableHead className="font-medium">Name</TableHead>
          <TableHead className="font-medium">Email</TableHead>
          <TableHead className="font-medium">Address</TableHead>
          <TableHead className="font-medium">AVG Rating</TableHead>
          <TableHead className="font-medium">Total Rating</TableHead>
          <TableHead className="font-medium">Give Rating</TableHead>
        
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStores.map((store) => (
          <TableRow key={store.id}>
            <TableCell className="font-medium">{store.id}</TableCell>
            <TableCell className="font-medium">{store.name}</TableCell>
            <TableCell className="font-medium">{store.email}</TableCell>
            <TableCell className="font-medium">{store.address}</TableCell>
            <TableCell className="font-medium">{store.averageRating}</TableCell>
            <TableCell className="font-medium">{store.totalRatings}</TableCell>
            <TableCell className="font-medium">
               <Button onClick={() => {
                setIsOpen(true)
                setStoreId(store.id)
                }} variant={'saas'} className="border border-black">give us Rating</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    {isOpen && 
     <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-center font-bold text-purple-700">Give us a Rating</DialogTitle>
       <Label className="mt-3">Enter your Rating</Label>
       <Input value={rating} onChange={(e) => setRating(e.target.value)} type="number" max={5} />
       <Button onClick={submitRating} variant={'saas'} className="text-white">Submit Rating</Button>
    </DialogHeader>
  </DialogContent>
</Dialog>
    }
     </div>
  )
}
