"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "../../../components/ui/card";

interface Prop{
  totalUsers: number, 
  totalStores: number, 
  totalRatings: number
}

export function CardHoverEffectDemo() {
 const [data, setData] = useState<Prop | null>(null);

  const fetchAnalytics = async() => {
       const response = await axios.get('/api/admin/dashboard');

       if(response){
        console.log('data', response.data);
        setData(response.data);
       }
  }

  useEffect(() => {
   fetchAnalytics();
  }, []);
 
  return (
    <div className="max-w-4xl px-10 grid grid-cols-3 gap-4">
    {data && (
      <>
        <Card className="p-6 flex flex-col items-center bg-violet-500">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl text-black font-bold">{data.totalUsers}</p>
        </Card>

        <Card className="p-6 bg-violet-500">
          <h2 className="text-xl font-bold">Total Stores</h2>
          <p className="text-2xl text-black font-bold">{data.totalStores}</p>
        </Card>

        <Card className="p-6 bg-violet-500">
          <h2 className="text-xl font-bold">Total Ratings</h2>
          <p className="text-2xl text-black font-bold">{data.totalRatings}</p>
        </Card>
      </>
    )}
  </div>
  );
}
