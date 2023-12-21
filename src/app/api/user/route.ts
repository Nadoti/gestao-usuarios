import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient()


export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email")
  let user = null

  if(email && typeof email === "string") {
    user = await prisma.users.findFirst({
      where: {
        email
      },
    });
  }

	return NextResponse.json({ status: 200, response: user });
}