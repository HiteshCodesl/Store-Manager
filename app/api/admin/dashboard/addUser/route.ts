import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../../config/prisma";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3),
  role: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsed = createUserSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid inputs", errors: parsed.error },
        { status: 400 }
      );
    }

    const { name, email, password, role} = parsed.data;

    const exists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password, 
        role
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
