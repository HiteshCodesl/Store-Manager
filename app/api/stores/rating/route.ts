import { NextResponse } from "next/server"; 
import prisma from "../../../config/prisma";

export async function POST(req: Request) {
  try {
    const { storeId, rating } = await req.json();

    if (!storeId || !rating) { 
      return NextResponse.json({ message: "storeId and rating are required" }, { status: 400 }); 
    } 

    const storeExists = await prisma.store.findUnique({ 
      where: { id: Number(storeId) }, 
    }); 

    if (!storeExists) { 
      return NextResponse.json({ message: "Store not found" }, 
        { status: 404 }); 
    }

    const created = await prisma.rating.create({ data: { score: Number(rating), storeId: Number(storeId), }, }); 

    return NextResponse.json({ message: "Rating submitted successfully", created }, { status: 200 });

  } catch (error) { 
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
   }
}


export async function GET() {
  try {
    const groups = await prisma.rating.groupBy({
      by: ["storeId"],
      _avg: { score: true },
      _count: { score: true },
      _sum: { score: true },
    });

    const map = new Map<number, {
      _avg: { score: number | null },
      _count: { score: number },
      _sum: { score: number | null }
    }>();

    groups.forEach(g => map.set(g.storeId, {
      _avg: g._avg,
      _count: g._count,
      _sum: g._sum,
    }));

    const stores = await prisma.store.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        createdAt: true,
      },
    });

    const result = stores.map(s => {
      const agg = map.get(s.id);
      const totalRatings = agg?._count.score ?? 0;
      const averageRating = agg?._avg.score ? Number((agg._avg.score).toFixed(2)) : 0;

      return {
        ...s,
        averageRating,
        totalRatings
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching store aggregates:", err);
    return NextResponse.json({ message: "Failed to fetch aggregates", error: err?.message ?? String(err) }, { status: 500 });
  }
}