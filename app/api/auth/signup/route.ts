import { NextRequest, NextResponse } from "next/server";
import prismaClient from "../../../config/prisma";
import { signupSchema } from "../../../config/zod";
import { hash } from "../../../config/hash";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    console.log(req.json());
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.format() }, { status: 400 });
    }

    const { name, email, password, address } = parsed.data;
    const existing = await prismaClient.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });
    }

    const hashed = await hash(password);
    const user = await prismaClient.user.create({
      data: { name, email, password: hashed, address, role: "USER" },
    });

    const token = await jwt.sign({
       id: user.id,
       role: user.role
    }, process.env.JWT_SECRET!)

    return NextResponse.json({ id: user.id, email: user.email, name: user.name, token: token}, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
