import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get("email")

  await prisma.users.delete({
    where: {
      email: email,
    },
  });



	return NextResponse.json({ status: 200, response: "Usuario Excluido com Sucesso!"});
}