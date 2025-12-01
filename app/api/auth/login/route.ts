import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../config/prisma";
import { signinSchema } from "../../../config/zod";
import { compare } from "../../../config/hash";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error}, { status: 400 });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const ok = await compare(password, user.password);

    if (!ok) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = await jwt.sign({
      id: user.id,
      role: user.role
    }, process.env.JWT_SECRET!);

    return NextResponse.json({  id: user.id, name: user.name, email: user.email, role: user.role, token: token });

  } catch (e: any) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
